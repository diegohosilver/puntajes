<template>

	<ps-modal v-if="isOpen" @close="close" :size="'lg'" :isScrollable="!winner">

		<template v-slot:header>

			<h5 class="modal-title">{{title}}</h5>

		</template>

		<template v-slot:body>

			<template v-if="!winner">

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
			
			<template v-else>

				<div class="pyro">
					<div class="before"></div>
					<div class="after"></div>
				</div>

				<h1>{{winner.name}} es el sabalero de este año!</h1>

			</template>

		</template>

		<template v-slot:footer>

			<button type="button" class="btn btn-sm btn-primary" @click="getWinner">Obtener ganador</button>

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

			playerScores: [],

			winner: undefined,

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

			this.playerScores = [];

			this.winner = undefined;
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
		},

		getWinner() {

			this.players.forEach(player => {

				let totalKills = 0;

				player.games.forEach(game => {

					let size = game.results.kills.length; // Obtenemos la cantidad de rondas

					let killsPerGame = game.results.kills.reduce((a, b) => a + b, 0); // Sumamos la cantidad de asesinatos

					totalKills += killsPerGame / size;
				});

				let totalScore = totalKills / player.games.length;

				this.playerScores.push({ name: player.name, score: totalScore });

				totalKills = 0;
			});

			let result = Math.max.apply(Math, this.playerScores.map((o) => { return o.score; }))

			this.winner = this.playerScores.find((o) => { return o.score == result; })

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
<style lang="scss">

	$particles: 50;
	$width: 500;
	$height: 500;

	// Crear la explosión
	$box-shadow: ();
	$box-shadow2: ();

	@for $i from 0 through $particles {
		$box-shadow: $box-shadow,
					random($width)-$width / 2 + px
					random($height)-$height / 1.2 + px
					hsl(random(360), 100, 50);
		$box-shadow2: $box-shadow2, 0 0 #fff
	}

	@mixin keyframes ($animationName) {
		@-webkit-keyframes #{$animationName} {
			@content;
		}

		@-moz-keyframes #{$animationName} {
			@content;
		}

		@-o-keyframes #{$animationName} {
			@content;
		}

		@-ms-keyframes #{$animationName} {
			@content;
		}

		@keyframes #{$animationName} {
			@content;
		}
	}

	@mixin animation-delay ($settings) {
		-moz-animation-delay: $settings;
		-webkit-animation-delay: $settings;
		-o-animation-delay: $settings;
		-ms-animation-delay: $settings;
		animation-delay: $settings;
	}

	@mixin animation-duration ($settings) {
		-moz-animation-duration: $settings;
		-webkit-animation-duration: $settings;
		-o-animation-duration: $settings;
		-ms-animation-duration: $settings;
		animation-duration: $settings;
	}

	@mixin animation ($settings) {
		-moz-animation: $settings;
		-webkit-animation: $settings;
		-o-animation: $settings;
		-ms-animation: $settings;
		animation: $settings;
	}

	@mixin transform ($settings) {
		transform: $settings;
		-moz-transform: $settings;
		-webkit-transform: $settings;
		-o-transform: $settings;
		-ms-transform: $settings;
	}

	.pyro > .before, .pyro > .after {
		position: absolute;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		box-shadow: $box-shadow2;
		@include animation((1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards));
	}
		
	.pyro > .after {
		@include animation-delay((1.25s, 1.25s, 1.25s));
		@include animation-duration((1.25s, 1.25s, 6.25s));
	}
			
	@include keyframes(bang) {
		to {
			box-shadow:$box-shadow;
		}
	}
		
	@include keyframes(gravity)  {
		to {
			@include transform(translateY(200px));
			opacity: 0;
		}
	}
		
	@include keyframes(position) {
	0%, 19.9% {
		margin-top: 10%;
		margin-left: 40%;
	}
	20%, 39.9% {
		margin-top: 40%;
		margin-left: 30%;
	}
	40%, 59.9% {  
		margin-top: 20%;
		margin-left: 70%
	}
	60%, 79.9% {  
		margin-top: 30%;
		margin-left: 20%;
	}
	80%, 99.9% {  
		margin-top: 30%;
		margin-left: 80%;
	}
	}

</style>