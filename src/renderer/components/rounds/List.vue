<template>

    <ps-modal v-if="isOpen" @close="close" :isScrollable="true">

        <template v-slot:header>

            <h5 class="modal-title">{{title}}</h5>

        </template>

        <template v-slot:body>

            <div class="row mb-2" v-for="(round, index) in rounds">

                <div class="col">

                    <div class="card">

                        <div class="card-body">

							<div class="d-flex flex-row justify-content-between">

								<h5 class="card-title">Ronda {{index + 1}}</h5>

								<div class="btn-group" role="group">

									<button type="button" class="btn btn-sm btn-danger" @click="confirmDelete(index, round)"><i class="fas fa-times"></i></button>

									<button type="button" class="btn btn-sm btn-primary" @click="addResult(round)">Resultados</button>
									
								</div>

							</div>

							<dl>
								
								<dt>
									Partida
								</dt>
								
								<dd>
									{{round.match.name}} - {{formatDate(round.match.date)}}	
								</dd>

								<dt>
									Modalidad
								</dt>
								
								<dd>
									{{getModeDescription(round.mode)}}
								</dd>

								<dt>
									Tipo
								</dt>
								
								<dd>
									{{getTypeDescription(round.type)}}
								</dd>
							
							</dl>

							<b>Jugadores</b>

							<ul>

								<li v-for="player in round.players">
									
									<span>	
										<span class="text-success">{{player.name}}</span> - <span class="text-primary">{{player.tag}}</span>
									</span>

								</li>

							</ul>
                        </div>

                    </div>

                </div>

            </div>

			<div v-if="!hasRounds" class="alert alert-primary" role="alert">
                No hay rondas registradas!
            </div>

        </template>

        <template v-slot:footer>

            <button type="button" class="btn btn-sm btn-danger" :class="{'disabled': !hasRounds}" :disabled="!hasRounds" @click="confirmDeleteAll">Eliminar todas</button>

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

    data() {
        return {
			isOpen: false,
			
			game: undefined,

			rounds: [],

            indexToDelete: undefined,

            roundToDelete: undefined
        }
	},
	
	computed: {

		hasRounds() {

            return this.rounds.length > 0;
        },

		title() {

			return `Rondas de ${this.game.name}`;
		}
	},

    methods: {

        open(game){

			this.isOpen = true;

			this.game = game;

			this.rounds = this.$rounds.list().filter(x => x.game.id === game.id);
		},
		
		defaultState() {

			this.game = undefined;

			this.rounds = [];
		},

        close(){

			this.defaultState();

			this.isOpen = false;
		},
		
		formatDate(date) {

			return this.$utils.formatDate(date, "DD/MM/YYYY")
		},

		getTypeDescription(type) {

			return this.$round.getTypeDescription(type);
		},

		getModeDescription(mode) {

			return this.$round.getModeDescription(mode);
		},

		buildConfirmation() {

            return {
                title: 'Eliminar partida',
                message: `¿Está seguro que desea eliminar <b class="text-success">Ronda ${this.indexToDelete + 1}</b>?`,
                event: 'round-delete'
            };
        },

        buildConfirmationBulk() {

            return {
                title: 'Eliminar todas las rondas',
                message: `¿Está seguro que desea eliminar <b class="text-danger">todas</b> las rondas registradas?`,
                event: 'round-bulk-delete'
            }
        },

        confirmDelete(index, round) {

            this.indexToDelete = index;

            this.roundToDelete = round;

            this.isOpen = false;

            this.$events.emit('event:trigger', {name: 'confirmation-window:show', value: this.buildConfirmation()});
        },

        confirmDeleteAll() {

            this.isOpen = false;

            this.$events.emit('event:trigger', {name: 'confirmation-window:show', value: this.buildConfirmationBulk()});
        },

        deleteRound({value}) {

            this.isOpen = true;

            if (!value) return; // no eliminar la ronda

            this.$roundStore.deleteRound(this.roundToDelete);

            this.$delete(this.rounds, this.indexToDelete);

            this.$notifications.success(`Ronda <b>${this.indexToDelete + 1}</b> eliminada con éxito`);

            this.$events.emit('event:trigger', {name: 'round:deleted'});
        },

        deleteAllRounds({value}) {

            this.isOpen = true;

            if (!value) return; // no eliminar rondas

            this.$roundStore.deleteAllRounds();

            this.rounds.splice(0, this.rounds.length);

            this.$notifications.success(`Todos las rondas han sido eliminadas con éxito`);

            this.$events.emit('event:trigger', {name: 'round:deleted'});
		},
		
		addResult(round) {

			this.isOpen = false;

			this.$events.emit('event:trigger', {name: 'result-add-window:show', value: round});
		}
	},
	
	created() {

        this.$events.on('confirmation:round-delete', this.deleteRound);

		this.$events.on('confirmation:round-bulk-delete', this.deleteAllRounds);
		
		this.$events.on('result-window-add:close', () => { this.isOpen = true });
    }
}
</script>
<style>
</style>