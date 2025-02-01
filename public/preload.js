const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  runCommand: (commandKey) => ipcRenderer.invoke("run-command", commandKey),
});
