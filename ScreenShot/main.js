const {app, BrowserWindow, desktopCapturer, ipcMain}=require("electron");

const path=require("path");

let mainWindow = null;

function createWindow() {
    mainWindow=new BrowserWindow({
        title:"screenShot",
        width:900,
        height:600,
        webPreferences:{
            nodeIntegration:true,
            preload:path.join(__dirname, "index.js"),
        }
    })
    mainWindow.loadFile(path.join(__dirname, "index.html"));
    mainWindow.on("close", () => {mainWindow=null;});
}

app.on("ready", () => {
    createWindow();
})


ipcMain.on('screenshot:capture', (e, value) => {
    desktopCapturer.getSources({types:["screen"], thumbnailSize:{width:1920,height:1080}}).then(sources => {
        let image=sources[0].thumbnail.toDataURL();
        mainWindow.webContents.send("screenshot:captured", image)
    })
});

