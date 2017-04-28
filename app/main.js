const electron = require('electron');
const theApp = require('./app');
const appConfig = require('./config.json');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

var mainWindow;

require('electron-context-menu')({
  showInspectElement: false
});

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1400, height: 900, frame: false});

  mainWindow.setMenu(null);

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:' + appConfig.serverPort);


  mainWindow.on('closed', function () {
    mainWindow = null;
  })

}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
