const { app, BrowserWindow } = require('electron');

function createNewWindow () {
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 600,
    title: 'Image Shrink'
  });
}

app.on('ready', createNewWindow)