import { Utils } from './Utils';

export class Games {
    constructor(store) {

        this.gameStore = store;
    }

    add(name) {
        let id = Utils.generateId();

        this.gameStore.addGame({id, name});
    }

    list() {

        return this.gameStore.getGames().games;
    }
}