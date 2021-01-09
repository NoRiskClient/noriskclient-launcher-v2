import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import * as url from 'url'
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'
import { download } from 'electron-dl'

let mainWindow: Electron.BrowserWindow | null

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#FFFFFF',
    webPreferences: {
      nodeIntegration: true
    }
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

ipcMain.on('download', (ev, args) => {
  const focusedWindow = BrowserWindow.getFocusedWindow()
  if (focusedWindow) {
    args.properties.onProgress = (status: number) => focusedWindow.webContents.send('download progress', status)
    download(focusedWindow, args.url, args.properties)
      .then(dl => {
        console.log(dl.getSavePath())
        focusedWindow.webContents.send('download complete', dl.getSavePath())
      })
      .catch(console.error)
  }
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
