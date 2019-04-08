const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, globalShortcut, ipcMain } = electron;

const windows = {
  mainWindow: null
}

function hardReset() {
  app.relaunch();
  windows.mainWindow = null;
  app.quit();
}

app.on("ready", () => {
  Menu.setApplicationMenu(null);
  globalShortcut.register("CommandOrControl+Q", () => {
    windows.mainWindow = null;
    app.quit();
  });
  globalShortcut.register("CommandOrControl+Shift+R", () => {
    hardReset();
  });
  globalShortcut.register("CommandOrControl+R", () => {
    windows.mainWindow.reload();
  });
  windows.mainWindow = new BrowserWindow({
    title: "Tic Tac Toe",
    show: false,
    frame: false,
    height: 470,
    width: 450,
    resizable: false
  });
  windows.mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "Pages/mainWindow.html"),
    protocol: "file:",
    slashes: true
  }));
  windows.mainWindow.on("ready-to-show", () => {
    windows.mainWindow.show();
  })
  windows.mainWindow.on("closed", () => {
    windows.mainWindow = null;
    app.quit();
  });
  ipcMain.on("reload", (e, arg) => {
    windows.mainWindow.reload();
  });
  ipcMain.on("quit", (e, arg) => {
    windows.mainWindow = null;
    app.quit();
  });
});
