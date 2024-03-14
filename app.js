const { app, session ,BrowserWindow} = require('electron')
const path = require('path')

var App = app;
// enable debugging

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  })
  win.setMenu(null)
  win.webContents.openDevTools()
  win.loadFile('index.html')
}

App.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

App.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})