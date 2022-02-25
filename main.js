const { app, BrowserWindow } = require('electron');

let mainWindow

function createNewWindow () {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 600,
    // title: 'Image Shrink '
  });

  mainWindow.loadURL(`file://${__dirname}/app/index.html`)
}

app.on('ready', createNewWindow)