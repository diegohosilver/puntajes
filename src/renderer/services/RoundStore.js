import Store from 'electron-store';

export class RoundStore extends Store {
    constructor(settings) {
        super(settings);

		this.getRounds();
		this.getResults();
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

	getResults() {
        this.results = this.get('results') || [];

        return this;
    }
	
	getResult(round) {

		if (this.results.length > 0)
			return this.results.find(x => x.roundId == round.id) || {};

		return {};
	}

	saveResult(result) {

		let index = this.results.findIndex(x => x.roundId == result.roundId);

		if (index > -1) {

			this.results[index] = result;
		}
		else {

			this.results = [...this.results, result];
		}

        return this.saveResults();
	}

	saveResults() {
        this.set('results', this.results);

        return this;
    }
}