export class Games {
    constructor(store) {

        this.gameStore = store;
    }

    list() {

        return this.gameStore.getGames().games;
    }
}