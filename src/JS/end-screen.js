const electron = require("electron");
const { ipcRenderer } = electron;

const reset = document.getElementById("reset");
const quit = document.getElementById("quit");

reset.addEventListener("click", sendReload);
quit.addEventListener("click", sendQuit);


function sendReload() {
  ipcRenderer.send("reload", "reloadme");
}

function sendQuit() {
  ipcRenderer.send("quit", "quitme");
}
