const path = require("path");
const { app, ipcMain } = require("electron");

const Window = require("./Window");
const DataStore = require("./DataStore");

let mainWindow;

function createWindow() {
  mainWindow = new Window({
    file: "index.html"
  });

  mainWindow.removeMenu();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

function main() {
  createWindow();
 
}

app.on("ready", main);

app.on("window-all-closed", () => {
  // En macOS es común que las aplicaciones solamente cierren sus ventanas hasta que el usuario apriete CMD + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // En macOS es común que cuando el usuario haga click en el dock, se abra una nueva ventana si no hay ninguna abierta
  if (mainWindow === null) {
    createWindow();
  }
});
