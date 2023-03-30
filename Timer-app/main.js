const {app,BrowserWindow }=require("electron")
const path=require("electron")

function createWindow () {
    const win=new BrowserWindow({
        width:500,
        height:400,
        webPreferences: {
            nodeIntegration:true,
            resizable:false
        }
    })

    win.loadFile("index.html")

    // win.webContents.openDevTools()
    win.on('closed', () => {
        win=null;
    })
}

app.on('ready', createWindow)


app.on("window-all-closed", ()=> {
    if(process.platform !== 'darwin') {
        app.quit();
    }
})
