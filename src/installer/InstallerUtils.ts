import os from 'os'
import { ipcRenderer } from 'electron'
import React from 'react'

export const getOS = (): NodeJS.Platform => {
  return os.platform()
}

export const getMCDir = (): string => {
  if (getOS() === 'win32') {
    return process.env.APPDATA + '/.minecraft'
  } else if (getOS() === 'darwin') {
    return process.env.HOMEPATH + '/Library/Application Support/minecraft'
  } else {
    return process.env.HOMEPATH + '/.minecraft'
  }
}

export const downloadAndWriteFile = (url: string, path?: string, status?: React.Dispatch<React.SetStateAction<string>>): void => {
  ipcRenderer.send('download',
    {
      url: url,
      properties: { directory: path, filename: 'lol.jar' }
    })
  ipcRenderer.on('download complete', (event, file) => {
    console.log(file)
  })
  ipcRenderer.on('download progress', (event, progress) => {
    if (status) {
      status(progress.percent)
    }
    console.log(progress)
  })
}
