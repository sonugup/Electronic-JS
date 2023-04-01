const {app,BrowserWindow }=require("electron")
const path=require("electron")

function stopWatch () {
    const win=new BrowserWindow({
        width:700,
        height:500,
        backgroundColor:"yellow",
        webPreferences: {
            nodeIntegration:true,
            resizable:false
        }
    })

    // win.loadFile("index.html")
    win.loadFile("camera.html")

    win.webContents.openDevTools()
    win.on('closed', () => {
        win=null;
    })
}

app.on('ready', stopWatch)


app.on("window-all-closed", ()=> {
    if(process.platform !== 'darwin') {
        app.quit();
    }
})