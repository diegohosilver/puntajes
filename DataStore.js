const Store = require('electron-store');

class DataStore extends Store {
    constructor(settings) {
        super(settings);

        this.players = this.get('players');
        this.games = this.get('games');
    }

    savePlayers() {

        this.set('players', this.players);

        // Permitir encadenamiento de métodos
        return this;
    }

    getPlayers() {

        this.players = this.get('players') || [];

        return this;
    }

    addPlayer(player) {

        this.players = [...this.players, player];

        return this.savePlayers();
    }

    deletePlayer(player) {
        
        this.players = this.players.filter(p => p !== player);

        return this.savePlayers();
    }
}

module.exports = DataStore;