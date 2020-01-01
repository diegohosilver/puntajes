<template>

	<ps-modal v-if="isOpen" @close="close" :size="'lg'">

		<template v-slot:header>
			
			<h5 class="modal-title">{{title}}</h5> <p class="text-muted data-information">Los datos se guardarán automáticamente</p>

		</template>

		<template v-slot:body>

			<template v-for="player in round.players">

				<h5>{{player.name}} - {{player.tag}}</h5>

				<form class="form-inline mb-3">

					<div class="form-group mr-2">

						<label class="text-primary mr-2"> Asesinatos </label>

						<input type="number" :value="player.kills" class="form-control" @input="save(player, 'kills', $event.target.value)">

					</div>

					<div class="form-group">

						<label class="text-danger mr-2"> Muertes </label>

						<input type="number" :value="player.deaths" class="form-control" @input="save(player, 'deaths', $event.target.value)">

					</div>

				</form>

			</template>

		</template>

		<template v-slot:footer>

        	<button type="button" class="btn btn-sm btn-secondary" @click="close">Cerrar</button>

		</template>

	</ps-modal>

</template>
<script>

import PsModal from './../modal/Modal.vue';

export default {
	components: {
		PsModal
	},

	computed: {

		title() {

			return `${this.round.game.name}: Resultados de ronda`;
		},

		canSave() {

			let valid = true;

			this.round.players.forEach(player => {

				valid = valid && player.kills >= 0 && player.deaths >= 0;
			});

			return valid;
		}
	},

	data() {
		return {

			isOpen: false,

			round: undefined,

			typingTimer: undefined,

			doneTypingInterval: 2000
		}
	},

	methods: {

		open(round) {

			this.round = round;

			let result = this.$roundStore.getResult(round);

			round.players.forEach(player => {

				if (result.roundId) {
				
					let playerResult = result.players.find(x => x.id == player.id);

					this.setResult(player, playerResult);
				}
				else {

					this.setResult(player);
				}

			});

			this.isOpen = true;
		},

		setResult(player, result = {}) {

			this.$set(player, "kills", result.kills || 0);
			this.$set(player, "deaths", result.deaths || 0);
		},

		defaultState() {

			this.round = undefined;

			this.results = [];
		},

		close() {

			this.isOpen = false;

			this.defaultState();

			this.$events.emit('result-window-add:close');
		},

		save(player, name, value) {

			clearTimeout(this.typingTimer);

			if (value) {
				this.typingTimer = setTimeout(() => {

					if (!this.$utils.isNumber(value)) return;

					let numericValue = Number(value); // como no estamos usando v-model.number

					if (numericValue < 0) return;

					let currentPlayer = this.round.players.find(x => x.id == player.id);

					currentPlayer[name] = numericValue;

					// Guardar los datos de la ronda actualizados
					this.$roundStore.saveResult({roundId: this.round.id, players: this.round.players});

					this.$notifications.success("Resultados guardados automáticamente");

				}, this.doneTypingInterval);
			}
		}
	},

	created() {

		this.$events.on("result-add-window:show", ({ value }) => this.open(value))
	}
}

</script>
<style>

	.data-information {
		font-size: 12px;
		margin-top: 6px;
		margin-left: auto;
	}

</style>