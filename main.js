const {app, BrowserWindow, Menu} = require("electron");

function cWindow() {
    const win= new BrowserWindow({
        width:800,
        height:700,
        // frame:false,
        webPreferences:{
            nodeIntegration:true
        }
    })
    win.loadFile("index.html")
    // win.webContents.openDevTools()
}

app.whenReady().then(cWindow)