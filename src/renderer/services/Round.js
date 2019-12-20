import { Utils } from './Utils';

export class Round {
    constructor(store) {

        this.roundStore = store;
    }

    add(game, mode, type, players) {

        let id = Utils.generateId();

        this.roundStore.addRound({id, game, mode, type, players});
    }
}