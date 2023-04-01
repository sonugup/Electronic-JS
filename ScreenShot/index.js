const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
    console.log("loaded");

    document.getElementById("btn").addEventListener("Click", () => {
        ipcRenderer.send("screenshot:capture", {});

    });

    ipcRenderer.on('screenshot:captured', (e, imageData) => {
        document.getElementById("placeholder").src=imageData;
    })
})
