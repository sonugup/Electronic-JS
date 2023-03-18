const {app, BrowserWindow} = require("electron");

function cWindow() {
    const win= new BrowserWindow({
        width:500,
        height:500,
        webPreferences:{
            nodeIntegration:true
        }
    })
    win.loadFile("index.html")
    win.webContents.openDevTools()
}

app.whenReady().then(cWindow)