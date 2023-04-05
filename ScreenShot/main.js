const { app, BrowserWindow, desktopCapturer } = require('electron');
const path = require('path');
const screenshot = require('screenshot-desktop')
const fs = require('fs')

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  setInterval(() => {
    takeScreenshot();
  }, 6000);
}

async function takeScreenshot() {
  desktopCapturer.getSources({ types: ['screen'] }).then(async sources => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: sources[0].id,
          minWidth: 1280,
          maxWidth: 1280,
          minHeight: 720,
          maxHeight: 720
        }
      }
    });
    
    const track = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(track);
 
    const blob = await imageCapture.takePhoto();
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.src = url;
    
    // Save the screenshot to a folder
    const filePath = path.join(__dirname, 'screenshots', `${Date.now()}.png`);
    const buffer = await blob.arrayBuffer();
    // fs.writeFile(filePath, Buffer.from(buffer), err => {
    //   if (err) {
    //     console.error(err);
    //   }
    // });

  

screenshot().then((img) => {
  fs.writeFile('out.jpg', img, function (err) {
    if (err) {
      throw err
    }
    console.log('written to out.jpg')
  })
}).catch((err) => {
  throw err
})
    
    stream.getTracks().forEach(track => track.stop());

    // Display the latest screenshot in the app
    const latestScreenshot = getLatestScreenshot();
    if (latestScreenshot) {
      mainWindow.webContents.send('screenshot', latestScreenshot);
    }
  });
}

function getLatestScreenshot() {
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    return null;
  }

  const files = fs.readdirSync(screenshotsDir);
  if (!files || files.length === 0) {
    return null;
  }

  const latestFile = files.reduce((prev, curr) => {
    const prevTime = fs.statSync(path.join(screenshotsDir, prev)).mtime.getTime();
    const currTime = fs.statSync(path.join(screenshotsDir, curr)).mtime.getTime();
    return currTime > prevTime ? curr : prev;
  });

  return path.join(screenshotsDir, latestFile);
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
