const { app, BrowserWindow } = require("electron");
const path = require("path");
const waitOn = require("wait-on");
require("dotenv").config();

let mainWindow, loadingWindow;

function createLoadingWindow() {
  loadingWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  loadingWindow.loadFile(path.join(__dirname, "loading.html"));
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const isDev = !app.isPackaged; // Automatically detects if the app is in development mode

  if (isDev) {
    const opts = {
      resources: ["http://localhost:3000"],
    };

    waitOn(opts, (err) => {
      if (err) {
        console.error("React dev server not started in time.", err);
        app.quit();
        return;
      }

      mainWindow.loadURL("http://localhost:3000");
    });
  } else {
    mainWindow.loadFile(path.resolve(app.getAppPath(), "build", "index.html"));
  }

  mainWindow.webContents.on("did-finish-load", () => {
    if (loadingWindow) {
      loadingWindow.close();
      loadingWindow = null;
    }
    mainWindow.show();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createLoadingWindow();
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createLoadingWindow();
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
