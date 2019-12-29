<template>

    <ps-modal v-if="isOpen" @close="close" :isScrollable="true">

        <template v-slot:header>

            <h5 class="modal-title">{{title}}</h5>

        </template>

        <template v-slot:body>

            <ul class="list-group">
                <li v-for="(player, index) in players" class="list-group-item d-flex justify-content-between align-items-center">
                    <span>
                        <span class="text-success">{{player.name}}</span> - <span class="text-primary">{{player.tag}}</span>
                    </span>
                    <span class="badge badge-danger badge-pill" @click="confirmDelete(index, player)"><i class="fas fa-times"></i></span>
                </li>
            </ul>

            <div v-if="!hasPlayers" class="alert alert-primary" role="alert">
                No hay jugadores registrados!
            </div>

        </template>

        <template v-slot:footer>

            <button type="button" class="btn btn-sm btn-danger" :class="{'disabled': !hasPlayers}" :disabled="!hasPlayers" @click="confirmDeleteAll">Eliminar todos</button>

            <button type="button" class="btn btn-sm btn-secondary" @click="close">Cerrar</button>

        </template>

    </ps-modal>


</template>
<script>

import PsModal from './../modal/Modal.vue';

export default {

    components: {
        PsModal,
    },

    data() {
        return {

            isOpen: false,

            players: [],

            indexToDelete: undefined,

            playerToDelete: undefined
        }
    },

    computed: {

        hasPlayers() {

            return this.players.length > 0;
        },

        title() {

            return 'Listar jugadores';
        }
    },

    methods: {

        open() {

            this.isOpen = true;

            this.players = this.$players.list();
        },

        close() {

            this.players = [];

            this.isOpen = false;
        },

        buildConfirmation() {

            return {
                title: 'Eliminar jugador',
                message: `¿Está seguro que desea eliminar a <b class="text-success">${this.playerToDelete.name}</b> (tag <b class="text-primary">${this.playerToDelete.tag}</b>)?`,
                event: 'player-delete'
            };
        },

        buildConfirmationBulk() {

            return {
                title: 'Eliminar todos los jugadores',
                message: `¿Está seguro que desea eliminar <b class="text-danger">todos</b> los jugadores registrados?`,
                event: 'player-delete'
            }
        },

        confirmDelete(index, player) {

            this.indexToDelete = index;

            this.playerToDelete = player;

            this.isOpen = false;

            this.$events.emit('event:trigger', {name: 'confirmation-window:show', value: this.buildConfirmation()});
        },

        confirmDeleteAll() {

            this.isOpen = false;

            this.$events.emit('event:trigger', {name: 'confirmation-window:show', value: this.buildConfirmationBulk()});
        },

        deletePlayer({value}) {

            this.isOpen = true;

            if (!value) return; // no eliminar el jugador

            this.$playerStore.deletePlayer(this.playerToDelete);

            this.$delete(this.players, this.indexToDelete);

            this.$notifications.success(`Jugador <b>${this.playerToDelete.name}</b> (tag ${this.playerToDelete.tag}) eliminado con éxito`);

            this.$events.emit('event:trigger', {name: 'player:deleted'});
        },

        deleteAllPlayers({value}) {

            this.isOpen = true;

            if (!value) return; // no eliminar jugadores

            this.$playerStore.deleteAllPlayers();

            this.players.splice(0, this.players.length);

            this.$notifications.success(`Todos los jugadores han sido eliminados con éxito`);

            this.$events.emit('event:trigger', {name: 'player:deleted'});
        }
    },

    created() {

        this.$events.on('confirmation:player-delete', this.deletePlayer);

        this.$events.on('confirmation:player-bulk-delete', this.deleteAllPlayers);
    }
}

</script>
<style lang="scss">

</style>