import os from 'os'
import { ipcRenderer } from 'electron'
import electronDl from 'electron-dl'
import * as fs from 'fs'
import { LauncherJSON, Library } from '../interfaces/LauncherJSON'
import { MinecraftVersion, NRC_FABRIC_1_16_4 } from '../interfaces/MinecraftVersion'

export const getOS = (): string => {
  switch (os.platform()) {
    case 'win32': return 'windows'
    case 'darwin': return 'macosx'
    default: return os.platform()
  }
}

export const getMCDir = (): string => {
  if (getOS() === 'windows') {
    return process.env.APPDATA + '/.minecraft'
  } else if (getOS() === 'macosx') {
    return process.env.HOMEPATH + '/Library/Application Support/minecraft'
  } else {
    return process.env.HOMEPATH + '/.minecraft'
  }
}

interface FileOptions extends electronDl.Options {
    fileToCheck?: string
}

export const downloadAndWriteFile = (url: string, properties: FileOptions, forceDownload = false, cb?: CallableFunction): void => {
  if (!forceDownload) {
    if (properties.filename && properties.directory) {
      console.log('File exists: ' + fs.existsSync(properties.directory + '/' + properties.filename) + ' ' + properties.directory + '/' + properties.filename)
      if (properties.fileToCheck) {
        console.log('Extra File:' + properties.fileToCheck + ' ' + fs.existsSync(properties.fileToCheck))
        if (fs.existsSync(properties.fileToCheck)) {
          if (cb) {
            cb()
          }
          return
        }
      } else if (fs.existsSync(properties.directory + '/' + properties.filename)) {
        if (cb) {
          cb()
        }
        return
      }
    }
  }
  ipcRenderer.send('download',
    {
      url: url,
      properties: { ...properties }
    })
  ipcRenderer.once('download-completed', (event, file) => {
    if (cb) {
      cb()
    }
  })
  ipcRenderer.on('download-progress', (event, progress) => {
    /* if (status) {
              status(Math.floor(progress.percent * 100) + '%')
            } */
    // console.log(progress)
  })
}

export const installLibraries = (version: MinecraftVersion, cb: CallableFunction): void => {
  console.log('install libraries')
  const json: LauncherJSON = JSON.parse(fs.readFileSync(getMCDir() + version.jsonPath) as unknown as string)
  const library: Array<Library> = json.libraries.filter(value => {
    return value.downloads?.artifact?.url && value.downloads?.artifact?.path
  })
  library.forEach(value => {
    console.log(value.downloads.artifact.path)
  })
  downloadMinecraftDependenciesRecursivly(library, 0, cb)
}

const downloadMinecraftDependenciesRecursivly = (library: Array<Library>, index: number, cb: CallableFunction): void => {
  const value = library[index]
  if (value) {
    if (fs.existsSync(getMCDir() + '/libraries/' + value.downloads.artifact.path)) {
      downloadMinecraftDependenciesRecursivly(library, index + 1, cb)
    } else {
      downloadAndWriteFile(value.downloads.artifact.url, {
        directory: getMCDir() + '/libraries',
        filename: value.downloads.artifact.path
      }, false, () => {
        downloadMinecraftDependenciesRecursivly(library, index + 1, cb)
      })
    }
  } else {
    cb()
  }
}

export const getNatives = (version: string): string => {
  if (version === '1.8') {
    return getMCDir() + '/norisk/natives/lwjgl-2.9.3/native/' + getOS()
  } else if (version === '1.16') {
    return getMCDir() + '/norisk/natives/lwjgl-3.2.2/native/' + getOS()
  }
  return 'unknown-native'
}
