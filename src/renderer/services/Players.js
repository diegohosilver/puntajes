export class Players {
    constructor(store) {

        this.playerStore = store;
    }

    list() {

        return this.playerStore.getPlayers().players;
    }
}