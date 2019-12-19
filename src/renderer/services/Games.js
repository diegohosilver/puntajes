export class Games {
    constructor(store) {

        this.gameStore = store;
    }

    list() {

        return this.gameStore.getGames().games;
    }

    listPinned() {

        return this.gameStore.getGames().games.filter(x => x.isPinned);
    }
}