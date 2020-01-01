<template>

	<ps-modal v-if="isOpen" @close="close" :size="'lg'" :isScrollable="true">

		<template v-slot:header>

			<h5 class="modal-title">{{title}}</h5>

		</template>

		<template v-slot:body>

			<form>

				<div class="form-group">

					<label>Partida</label>

					<select class="custom-select" v-model="selectedMatch">

						<option disabled selected :value="undefined">Seleccione una partida</option>

						<option v-for="match in matches" :value="match">
							{{match.name}} - {{formatDate(match.date)}}
						</option>

					</select>

				</div>

			</form>

			<div v-for="player in players" class="row">

				<div class="col-12">

					<div class="card text-white bg-dark mb-3">

						<div class="card-body">

							<h5 class="card-title">{{player.name}} - {{player.tag}}</h5>

							<div class="card-text">

								<ul>

									<li v-for="game in player.games">

										{{game.name}}:

										{{listScores(game.results.kills)}}

									</li>

								</ul>

							</div>

						</div>
					</div>

				</div>

			</div>

		</template>

		<template v-slot:footer>

			<button type="button" class="btn btn-sm btn-secondary" @click="close">Cerrar</button>

		</template>

	</ps-modal>

</template>
<script>

import PsModal from '../modal/Modal.vue';

export default {

	components: {
		PsModal
	},

	computed: {

		title() {

			return "Resultados de partidas"
		}
	},

	data() {

		return {

			isOpen: false,

			selectedMatch: undefined,

			matches: [],

			rounds: [],

			players: [],

			results: [],

			format: "DD/MM/YYYY"
		}
	},

	methods: {

		open() {
			
			this.isOpen = true;

			this.getMatches();

			this.getResults();
		},

		getMatches() {

            this.matches = this.$matches.list();
		},
		
		getResults() {

			this.results = this.$rounds.listResults();
		},

		close() {

			this.isOpen = false;

			this.selectedMatch = undefined;

			this.matches = [];

			this.rounds = [];

			this.players = [];

			this.results = [];
		},

		formatDate(date) {

            return this.$utils.formatDate(date, this.format);
		},
		
		getRounds() {

			// Obtenemos rondas filtrando por partida
			this.rounds = this.$rounds.list().filter(x => x.match.id == this.selectedMatch.id);
		},

		playerExists(player) {

			return !!(this.players.find(x => x.id == player.id));
		},

		getPlayers() {

			this.rounds.forEach(round => {

				round.players.forEach(player => {

					if (!this.playerExists(player)) {

						this.players.push(player);
					}
				})
			});
		},

		setGames() {

			let uniqueSet = new Set(this.rounds.map(x => JSON.stringify(x.game)));

			let games = [...uniqueSet];

			this.players.forEach(x => {
				this.$set(x, 'games', this.$utils.stringArrayToObjectArray(games));
			});
		},

		setScores() {

			this.players.forEach(player => {

				player.games.forEach(game => {

					let roundIds = this.rounds.filter(x => x.game.id == game.id).map(x => x.id);

					// Filtrar resultados para el jugador para dicho juego
					let results = this.results.filter(x => roundIds.includes(x.roundId) && x.players.map(p => p.id).includes(player.id));

					let flatResults = this.$utils.flatArray(results.map(x => x.players));

					let playerStats = flatResults.filter(x => x.id == player.id);

					let kills = playerStats.map(x => x.kills);

					let deaths = playerStats.map(x => x.deaths);

					this.$set(game, 'results', {kills, deaths});
				});
			});
		},

		listScores(array) {

			let word = '';
			let sum = 0;

			array.forEach(item => {

				word += `${item} + `;
				sum += item;
			});

			let index = word.lastIndexOf('+');

			return `${word.substring(0, index)} = ${sum}`;
		}
	},

	watch: {
		selectedMatch: {
			handler: function(val) {
				
				this.getRounds();

				this.getPlayers();

				this.setGames();

				this.setScores();
			},
			deep: true
		}
	}
}

</script>
<style>

</style>