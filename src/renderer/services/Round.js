import { Utils } from './Utils';

export class Round {
    constructor(store) {

        this.roundStore = store;
    }

    add(match, game, mode, type, players) {

        let id = Utils.generateId();

        this.roundStore.addRound({match, id, game, mode, type, players});
    }
}