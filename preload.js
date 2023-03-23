// window.addEventListener('DOMContentLoad', () => {
//    const replaceText = (selector, text ) => {
//     const element = document.getElementById(selector)
//     if(element) element.innerText=text
//    }




const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})
