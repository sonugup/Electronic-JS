

const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})



// const { app, BrowserWindow, Menu } = require("electron");
// const path = require("path");

// const isDev=process.env.NODE_ENV !== "development";
// const isMac = process.platform === "darwin";
// const { electron } = require("process");
// function cWindow() {
//   const win = new BrowserWindow({
//     title:'electron.js',
//     width: isDev? 1000: 800,
//     height: 700,
//     webPreferences: {
//       nodeIntegration: true,
//       preload: path.join(__dirname, "preload.js"),
//     },
//   });
//   if(isDev){
//     win.webContents.openDevTools();
//   }
//   win.loadFile("index.html");
//   //   win.webContents.openDevTools();
// }

// const createAboutWindow= () => {
//   const aboutwin = new BrowserWindow({
//     title:'About electron.js',
//     width: 400,
//     height: 300,
//     webPreferences: {
//       nodeIntegration: true,
//       preload: path.join(__dirname, "render.js"),
//     },
//   });
//   // if(isDev){
//   //   win.webContents.openDevTools();
//   // }
//   aboutwin.loadFile("about.html");
//   //   win.webContents.openDevTools();
// }

// app.whenReady().then(() => {
//   cWindow();






