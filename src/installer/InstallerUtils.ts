import os from 'os'
import { ipcRenderer } from 'electron'
import React from 'react'
import electronDl from 'electron-dl'
import * as fs from 'fs'

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

export const downloadAndWriteFile = (url: string, properties: FileOptions, cb?: any) => {
  if (properties.filename && properties.directory) {
    console.log('File exists: ' + fs.existsSync(properties.directory + '/' + properties.filename) + ' ' + properties.directory + '/' + properties.filename)
    if (properties.fileToCheck) {
      console.log('Extra File:' + properties.fileToCheck + ' ' + fs.existsSync(properties.fileToCheck))
      if (fs.existsSync(properties.fileToCheck)) {
        if (cb instanceof Function) {
          cb()
        }
        return
      }
    } else if (fs.existsSync(properties.directory + '/' + properties.filename)) {
      if (cb instanceof Function) {
        cb()
      }
      return
    }
    ipcRenderer.send('download',
      {
        url: url,
        properties: { ...properties }
      })
    ipcRenderer.once('download-completed', (event, file) => {
      if (cb instanceof Function) {
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
}

export const getNatives = (version: string) => {
  if (version === '1.8') {
    return getMCDir() + '/norisk/natives/lwjgl-2.9.3/native/' + getOS()
  } else if (version === '1.16') {
    return getMCDir() + '/norisk/natives/lwjgl-3.2.2/native/' + getOS()
  }
}
