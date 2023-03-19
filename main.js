const { app, BrowserWindow, Menu } = require("electron");
const path= require('path')
function cWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
    //   nodeIntegration: true,
      preload:path.join(__dirname, 'preload.js')
    },
  });
  win.loadFile("index.html");
//   win.webContents.openDevTools();

}

app.whenReady().then(() => {
    cWindow();

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0 ) cWindow()
    })


});

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit()
})
