import { PlayerStore } from './PlayerStore';
import { Utils } from './Utils';

export class Player {
    constructor() {
        this.playerStore = new PlayerStore({ name: 'Player store' });
    }

    add(name, tag) {
        let id = Utils.generateId();

        this.playerStore.addPlayer({id, name, tag});
    }

    list() {

        return this.playerStore.getPlayers().players;
    }
};