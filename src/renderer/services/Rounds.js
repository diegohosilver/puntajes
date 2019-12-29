export class Rounds {
    constructor(store) {

        this.roundStore = store;
    }

    list() {

        return this.roundStore.getRounds().rounds;
    }
}