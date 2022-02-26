const { app, BrowserWindow, Menu, globalShortcut } = require('electron');

// set env
process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false

let mainWindow

const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: 'About',
              // click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  {
    role: 'fileMenu',
  },
  ...(!isMac
    ? [
        {
          label: 'Help',
          submenu: [
            {
              label: 'About',
              // click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  ...(isDev
    ? [
        {
          label: 'Developer',
          submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { type: 'separator' },
            { role: 'toggledevtools' },
          ],
        },
      ]
    : []),
]

function createMainWindow () {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 600,
    // title: 'Image Shrink'
    icon: './assets/icons/Icon_256x256.png',
    resizable: isDev ? true : false
  });

  // mainWindow.loadURL(`file://${__dirname}/app/index.html`)  // the same as:
  mainWindow.loadFile('./app/index.html')
}

app.on('ready', () => {
  createMainWindow()
  globalShortcut.register('Command+Alt+I', ()=>mainWindow.toggleDevTools())

  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)

  mainWindow.on('ready', ()=>{
    mainWindow = null
  })
})

app.on('window-all-closed', () => {
  if ( !isMac) app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
})