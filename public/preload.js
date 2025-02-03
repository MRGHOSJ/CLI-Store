const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  runCommand: (commandKey) => ipcRenderer.invoke("run-command", commandKey), // pre defined in commands.json
  runCmd: (command , args = "") => ipcRenderer.invoke("run-cmd", command, args), // dynamic running
  getNonInstalledApt: () => ipcRenderer.invoke("getNonInstalledApt"),
});
