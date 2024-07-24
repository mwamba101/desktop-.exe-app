const { app, BrowserWindow, shell } = require('electron');
const path = require("path");

let mainWindow;

// const __dirname = path.dirname(new URL(import.meta.url).pathname);

function createWindow() {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true, // Enable Node.js integration
        contextIsolation: false, // Disable context isolation for simpler integration
        preload: path.join(__dirname, "preload.js") // Optional: Use a preload script for additional control over the browser environment
      },
      autoHideMenuBar: true
    });

    // Load your Laravel project URL
    mainWindow.loadURL('https://github.com/mwamba101/');

    mainWindow.on('closed', () => {
      mainWindow = null;
    });
};

app.requestSingleInstanceLock()

app.on("ready", () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    // Open external links in default browser
    event.preventDefault();
    shell.openExternal(navigationUrl);
  });
});