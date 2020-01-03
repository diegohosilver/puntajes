export class Rounds {
    constructor(store) {

        this.roundStore = store;
    }

    list() {

        return this.roundStore.getRounds().rounds;
	}
	
	listResults() {

		return this.roundStore.getResults().results;
	}
}