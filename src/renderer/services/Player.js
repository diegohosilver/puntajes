import { Utils } from './Utils';

export class Player {
    constructor(store) {

        this.playerStore = store;
    }

    add(name, tag) {
        let id = Utils.generateId();

        this.playerStore.addPlayer({id, name, tag});
    }
};