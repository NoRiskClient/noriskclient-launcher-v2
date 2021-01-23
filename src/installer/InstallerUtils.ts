import os from 'os'
import { ipcRenderer, netLog } from 'electron'
import electronDl from 'electron-dl'
import * as fs from 'fs'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import sha256File from 'sha256-file'
import { LauncherJSON, Library } from '../interfaces/LauncherJSON'
import { MinecraftVersion } from '../interfaces/MinecraftVersion'
import React from 'react'

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
    setStatus?: React.Dispatch<React.SetStateAction<string>>,
    fileToCheck?: string,
}

export const downloadAndWriteFile = (url: string, properties: FileOptions, forceDownload = false): Promise<unknown> => {
  return new Promise((resolve) => {
    if (!forceDownload) {
      if (properties.filename && properties.directory) {
        if (properties.setStatus) {
          properties.setStatus(`Checking is file exists ${properties.filename}`)
        }
        if (properties.fileToCheck) {
          if (fs.existsSync(properties.fileToCheck)) {
            return resolve()
          }
        } else if (fs.existsSync(properties.directory + '/' + properties.filename)) {
          return resolve()
        }
      }
    }
    ipcRenderer.send('download', { url: url, properties: { ...properties } })
    ipcRenderer.once('download-completed', (event, args) => {
      resolve({ event: event, args: args })
    })
    ipcRenderer.on('download-progress', (event, progress) => {
      if (properties.setStatus) {
        properties.setStatus(`Downloading ${properties.filename} ${Math.floor(progress.percent * 100)}%`)
      }
    })
  })
}

export const installLibraries = (version: MinecraftVersion, cb: CallableFunction): void => {
  const json: LauncherJSON = JSON.parse(fs.readFileSync(getMCDir() + version.jsonPath) as unknown as string)
  const library: Array<Library> = json.libraries.filter(value => {
    return value.downloads?.artifact?.url && value.downloads?.artifact?.path
  })
  downloadMinecraftDependenciesRecursivly(library, 0, cb)
}

const downloadMinecraftDependenciesRecursivly = (library: Array<Library>, index: number, cb: CallableFunction): void => {
  const value = library[index]
  if (value) {
    console.log(value.downloads.artifact.path + fs.existsSync(getMCDir() + '/libraries/' + value.downloads.artifact.path))
    if (fs.existsSync(getMCDir() + '/libraries/' + value.downloads.artifact.path)) {
      downloadMinecraftDependenciesRecursivly(library, index + 1, cb)
    } else {
      downloadAndWriteFile(value.downloads.artifact.url, {
        directory: getMCDir() + '/libraries',
        filename: value.downloads.artifact.path
      }).then(() => {
        downloadMinecraftDependenciesRecursivly(library, index + 1, cb)
      })
    }
  } else {
    cb()
  }
}

export const checkMD5 = (jarPath: string, txtPath: string): boolean => {
  if (!fs.existsSync(jarPath)) {
    return false
  }
  const currentMD5 = sha256File(jarPath)
  const newestMD5 = fs.readFileSync(txtPath, 'utf8').substr(0, 64)
  return (newestMD5 === currentMD5)
}

export const getNatives = (version: string): string => {
  if (version === '1.8') {
    return getMCDir() + '/norisk/natives/lwjgl-2.9.3/native/' + getOS()
  } else if (version === '1.16') {
    return getMCDir() + '/norisk/natives/lwjgl-3.2.2/native/' + getOS()
  }
  return 'unknown-native'
}
