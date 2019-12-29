import { Utils } from './Utils';

export class Match {
    constructor(store) {

        this.matchStore = store;
    }

    add(name, date) {
        let id = Utils.generateId();

        this.matchStore.addMatch({id, name, date});
    }
};