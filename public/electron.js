const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
const waitOn = require("wait-on");
require("dotenv").config();

let mainWindow, loadingWindow;


// Load commands from JSON
const commandsPath = path.join(__dirname, "commands.json");
let commands = {};

if (fs.existsSync(commandsPath)) {
  commands = JSON.parse(fs.readFileSync(commandsPath, "utf-8"));
} else {
  console.error("commands.json not found!");
}

// Function to execute a shell command
ipcMain.handle("run-command", async (event, commandKey) => {
  if (commands[commandKey]) {
      return await new Promise((resolve) => {
          exec(commands[commandKey].command, (error, stdout, stderr) => {
              if (error || stderr) {
                  console.error(`Error executing ${commandKey}:`, error || stderr);
                  resolve("Error");
              } else {
                  resolve(stdout.trim());
              }
          });
      });
  }
  return "Command not found";
});

ipcMain.handle("run-cmd", async (event, command, args = "") =>
  new Promise((resolve, reject) => {
    exec(`${command} ${args}`, (error, stdout, stderr) => {
      if (error) {
        reject(stderr || error.message);
      } else {
        resolve(stdout);
      }
    });
  }),
);


function createLoadingWindow() {
  loadingWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    frame: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: __dirname + "/preload.js",
    },
  });

  loadingWindow.loadFile(path.join(__dirname, "loading.html"));
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    minwidth: 1400,
    minheight: 800,
    resizable: false,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: __dirname + "/preload.js",
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
