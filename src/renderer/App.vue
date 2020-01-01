<template>
  	<div class="container-fluid mt-3">

		<ps-confirmation ref="psConfirmation"></ps-confirmation>

		<ps-add-players ref="psAddPlayers"></ps-add-players>

		<ps-list-players ref="psListPlayers"></ps-list-players>

		<ps-add-games ref="psAddGames"></ps-add-games>

		<ps-list-games ref="psListGames"></ps-list-games>

		<ps-add-rounds ref="psAddRounds"></ps-add-rounds>

		<ps-list-rounds ref="psListRounds"></ps-list-rounds>

		<ps-add-matches ref="psAddMatches"></ps-add-matches>

		<ps-list-matches ref="psListMatches"></ps-list-matches>

		<ps-add-results ref="psAddResults"></ps-add-results>

		<div class="jumbotron">

			<h1 class="display-4">Bienvenido Sabalero!</h1>

			<p class="lead">
				Esta es una pequeña utilidad que te permitirá organizar el torneo
			</p>

			<hr class="my-4" />

			<p>Para comenzar haz click en alguna de las opciones:</p>

			<p class="lead">
				<a class="btn btn-primary btn-md" href="#" role="button" @click="trigger('player-add-window:show')">
					Agregar jugador
				</a>

				<a class="btn btn-secondary btn-md" href="#" role="button" @click="trigger('player-list-window:show')">
					Listar jugadores
					<span class="badge badge-light">{{ playerCount }}</span>
				</a>

				<a class="btn btn-primary btn-md" href="#" role="button" @click="trigger('game-add-window:show')">
					Agregar juego
				</a>

				<a class="btn btn-secondary btn-md" href="#" role="button" @click="trigger('game-list-window:show')">
					Listar juegos
					<span class="badge badge-light">{{ gameCount }}</span>
				</a>

				<a class="btn btn-primary btn-md" href="#" role="button" @click="trigger('match-add-window:show')">
					Agregar partida
				</a>

				<a class="btn btn-secondary btn-md" href="#" role="button" @click="trigger('match-list-window:show')">
					Listar partidas
					<span class="badge badge-light">{{ matchCount }}</span>
				</a>
			</p>

		</div>

		<div class="jumbotron">

			<div class="row">

				<div class="col-3" v-for="game in pinnedGames">

					<div class="card" style="min-width: 300px">

						<div class="card-body">

							<h5 class="card-title">{{ game.name }}</h5>

							<div class="d-flex flex-row justify-content-between">
								
								<button class="btn btn-sm btn-primary" @click="onEvent({ name: 'round-add-window:show', value: game })">
									Agregar Ronda
								</button>
								
								<button class="btn btn-sm btn-secondary" @click="onEvent({ name: 'round-list-window:show', value: game })">
									Listar Rondas
									<span class="badge badge-light">{{ game.totalRounds }}</span>
								</button>

							</div>

						</div>

					</div>

				</div>

			</div>

		</div>

	</div>

</template>

<script>
import PsConfirmation from "./components/confirmation/Confirmation.vue";
import PsAddPlayers from "./components/players/Add.vue";
import PsListPlayers from "./components/players/List.vue";
import PsAddGames from "./components/games/Add.vue";
import PsListGames from "./components/games/List.vue";
import PsAddRounds from "./components/rounds/Add.vue";
import PsListRounds from "./components/rounds/List.vue";
import PsAddMatches from "./components/match/Add.vue";
import PsListMatches from "./components/match/List.vue";
import PsAddResults from "./components/results/Add.vue";

export default {

  components: {
	PsConfirmation,
	PsAddPlayers,
	PsListPlayers,
	PsAddGames,
	PsListGames,
	PsAddRounds,
	PsListRounds,
	PsAddMatches,
	PsListMatches,
	PsAddResults
  },

  data() {
    return {
		playerCount: 0,

		gameCount: 0,

		matchCount: 0,

		pinnedGames: []
    };
  },

  methods: {

    getCounters() {

		this.playerCount = this.$players.list().length;

		this.gameCount = this.$games.list().length;

		this.matchCount = this.$matches.list().length;
    },

    getPinnedGames() {

		this.pinnedGames = this.$games.listPinned();
    },

    setEmptyRounds() {

		this.pinnedGames.forEach(game => {

			this.$set(game, "totalRounds", 0);
		});
	},
	
	setRound(round) {
		let game = this.pinnedGames.find(x => x.id == round.game.id);

		if (game) {
			let totalRounds = game.totalRounds || 0;

			game.totalRounds += 1;
		}
	},

    getRoundsPerGame() {

		let rounds = this.$rounds.list();

		this.setEmptyRounds();

		rounds.forEach(this.setRound);
    },

    trigger(name) {

		this.onEvent({ name });
    },

    onEvent({ name, value }) {

		switch (name) {
		case "player:add":
		case "player:deleted":
		case "game:add":
		case "game:deleted":
		case "match:add":
		case "math:deleted":
			this.getCounters();
			this.getPinnedGames();
			break;
			
		case "round:add":
		case "round:deleted":
			this.getRoundsPerGame();
			break;
			
		case "game:pinned":
			this.getPinnedGames();
			break;
			
		case "confirmation-window:show":
			this.$refs.psConfirmation.open(value);
			break;
			
		case "player-list-window:show":
			this.$refs.psListPlayers.open();
			break;
			
		case "player-add-window:show":
			this.$refs.psAddPlayers.open();
			break;
			
		case "game-add-window:show":
			this.$refs.psAddGames.open();
			break;
			
		case "game-list-window:show":
			this.$refs.psListGames.open();
			break;
			
		case "round-add-window:show":
			this.$refs.psAddRounds.open(value);
			break;

		case "round-list-window:show":
			this.$refs.psListRounds.open(value);
			break;
			
		case "match-add-window:show":
			this.$refs.psAddMatches.open();
			break;
			
		case "match-list-window:show":
			this.$refs.psListMatches.open(value);
			break;
		}
    }
  },

  created() {

	this.getCounters();

	this.getPinnedGames();

	this.getRoundsPerGame();

	this.$events.on("event:trigger", this.onEvent);
  }
};
</script>
