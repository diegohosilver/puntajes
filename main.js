const path = require("path");
const { app, ipcMain } = require("electron");

const Window = require("./Window");
const DataStore = require("./DataStore");

const appData = new DataStore({ name: 'Puntajes data' });

let main, addPlayer, removePlayer;

function createWindow() {
  main = new Window({
    file: path.join("renderer", "index.html"),
    width: 1280,
    height: 720,
  });

  main.removeMenu();

  main.webContents.openDevTools();

  main.on("closed", () => {
    main = null;
  });
}

function init() {
  createWindow();

  // Crear pantalla para agregar jugadores
  ipcMain.on("add-player-window", () => {
    if (!addPlayer) {
      addPlayer = new Window({
        file: path.join("renderer", "player-add.html"),
        parent: main
      });

      addPlayer.on("closed", () => {
        addPlayer = null;
      });
    }
  });

  // Suscribir evento al agregar jugadores
  ipcMain.on("add-player", (event, player) => {
      const updatedPlayers = appData.addPlayer(player).players;

      main.send('players', updatedPlayers);
  });

  ipcMain.on("delete-player", (event, player) => {
      const updatedPlayers = appData.deletePlayer(player).players;

      main.send('players', updatedPlayers);
  })
}

app.on("ready", init);

app.on("window-all-closed", () => {
  // En macOS es común que las aplicaciones solamente cierren sus ventanas hasta que el usuario apriete CMD + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // En macOS es común que cuando el usuario haga click en el dock, se abra una nueva ventana si no hay ninguna abierta
  if (main === null) {
    createWindow();
  }
});
