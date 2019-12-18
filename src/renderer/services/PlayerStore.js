import Store from 'electron-store';

export class PlayerStore extends Store {
    constructor(settings) {
        super(settings);
        
        this.getPlayers();
    }

    savePlayers() {
        this.set('players', this.players);

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
        this.players = this.players.filter(t => t !== player);

        return this.savePlayers();
    }
}