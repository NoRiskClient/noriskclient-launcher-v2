import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import * as url from 'url'
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'
import { download } from 'electron-dl'
import 'babel-polyfill'

import { EventEmitter } from 'events'

import https from 'https'
import { v1 as uuid } from 'uuid'

let mainWindow: Electron.BrowserWindow | null
EventEmitter.defaultMaxListeners = 30

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 760,
    height: 600,
    icon: './build/background.png',
    backgroundColor: '#FFFFFF',
    webPreferences: {
      nodeIntegration: true
    },
    resizable: true,
    autoHideMenuBar: true
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:4000')
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

ipcMain.on('download', async (ev, args) => {
  const focusedWindow = BrowserWindow.getFocusedWindow()
  if (focusedWindow) {
    args.properties.onProgress = (status: number) => focusedWindow.webContents.send('download-progress', status)
    const downloadItem = await download(focusedWindow, args.url, args.properties)
    focusedWindow.webContents.send('download-completed', downloadItem)
  }
})

ipcMain.on('auth', async (event, args) => {
  const data = JSON.stringify({
    agent: {
      name: 'Minecraft',
      version: 1
    },
    username: args.username,
    password: args.password,
    clientToken: uuid(),
    requestUser: true
  })

  const options = {
    hostname: 'authserver.mojang.com',
    method: 'POST',
    path: args.path,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Content-Length': data.length
    },
    data: data
  }

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
    res.on('data', data => {
      const focusedWindow = BrowserWindow.getFocusedWindow()
      if (focusedWindow) {
        console.log(JSON.parse(data))
        focusedWindow.webContents.send('auth-completed', JSON.parse(data))
      }
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.write(data)
  req.end()
})

app.on('ready', createWindow)
  .whenReady()
  .then(() => {
    if (process.env.NODE_ENV === 'development') {
      installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err))
      installExtension(REDUX_DEVTOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err))
    }
  })
app.allowRendererProcessReuse = true
