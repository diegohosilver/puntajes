export class Matches {
    constructor(store) {

        this.matchStore = store;
    }

    list() {

        return this.matchStore.getMatches().matches;
    }
}