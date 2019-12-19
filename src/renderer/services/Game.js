import { Utils } from './Utils';

export class Game {
    constructor(store) {
        this.gameStore = store;
    }

    add(name) {
        let id = Utils.generateId();

        this.gameStore.addGame({id, name});
    }
}