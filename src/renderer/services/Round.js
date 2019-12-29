import { Utils } from './Utils';

export class Round {
    constructor(store) {

        this.roundStore = store;
	}

    add(match, game, mode, type, players) {

        let id = Utils.generateId();

        this.roundStore.addRound({match, id, game, mode, type, players});
	}

	 getTypeDescription(type) {
		let types = [
			{
				name: 'kills',
				value: 'Muertes / Asesinatos'
			},
			{
				name: 'winner',
				value: 'Ganador / Perdedor'
			}
		];

		let pair = types.find(x => x.name == type);

		return pair ? pair.value : '';
	 }

	 getModeDescription(mode) {
		let modes = [
			{
				name: 'deathmatch',
				value: 'Deathmatch'
			},
			{
				name: 'team-deathmatch',
				value: 'Team Deatchmatch'
			}
		];

		let pair = modes.find(x => x.name == mode);

		return pair ? pair.value : '';
	 }
}