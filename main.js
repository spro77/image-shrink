const { app, BrowserWindow } = require('electron');

// set env
process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false

function createNewWindow () {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 600,
    // title: 'Image Shrink'
    icon: './assets/icons/Icon_256x256.png',
    resizable: isDev ? true : false
  });

  app.on('window-all-closed', () => {
    if (!isMac) app.quit()
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // mainWindow.loadURL(`file://${__dirname}/app/index.html`)  // the same as:
  mainWindow.loadFile('./app/index.html')
}

app.on('ready', createNewWindow)