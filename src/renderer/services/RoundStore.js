import Store from 'electron-store';

export class RoundStore extends Store {
    constructor(settings) {
        super(settings);

        this.getRounds();
    }

    saveRounds() {
        this.set('rounds', this.rounds);

        return this;
    }

    getRounds() {
        this.rounds = this.get('rounds') || [];

        return this;
    }

    addRound(round) {
        this.rounds = [...this.rounds, round];

        return this.saveRounds();
    }

    deleteRound(round) {
        this.rounds = this.rounds.filter(t => t.id !== round.id);

        return this.saveRounds();
    }

    deleteAllRounds() {
        this.rounds = [];

        return this.saveRounds();
    }
}