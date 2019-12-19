<template>

    <ps-modal v-if="isOpen" @close="close" :isScrollable="true">

        <template v-slot:header>

            <h5 class="modal-title">{{title}}</h5>

        </template>

        <template v-slot:body>

            <ul class="list-group">
                <li v-for="(game, index) in games" class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="text-success">{{game.name}}</span>
                    <span class="badge badge-danger badge-pill" @click="confirmDelete(index, game)"><i class="fas fa-times"></i></span>
                </li>
            </ul>

            <div v-if="!hasGames" class="alert alert-primary" role="alert">
                No hay juegos registrados!
            </div>

        </template>

        <template v-slot:footer>

            <button type="button" class="btn btn-sm btn-danger" :class="{'disabled': !hasGames}" :disabled="!hasGames" @click="confirmDeleteAll">Eliminar todos</button>

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

            games: [],

            indexToDelete: undefined,

            gameToDelete: undefined
        }
    },

    computed: {

        hasGames() {

            return this.games.length > 0;
        },

        title() {

            return 'Listar juegos';
        }
    },

    methods: {

        open() {

            this.isOpen = true;

            this.games = this.$games.list();
        },

        close() {

            this.games = [];

            this.isOpen = false;
        },

        buildConfirmation() {

            return {
                title: 'Eliminar juego',
                message: `¿Está seguro que desea eliminar <b class="text-success">${this.gameToDelete.name}</b>?`,
                event: 'game-delete'
            };
        },

        buildConfirmationBulk() {

            return {
                title: 'Eliminar todos los juegos',
                message: `¿Está seguro que desea eliminar <b class="text-danger">todos</b> los juegos registrados?`,
                event: 'game-bulk-delete'
            }
        },

        confirmDelete(index, game) {

            this.indexToDelete = index;

            this.gameToDelete = game;

            this.isOpen = false;

            this.$events.emit('event:trigger', {name: 'confirmation-window:show', value: this.buildConfirmation()});
        },

        confirmDeleteAll() {

            this.isOpen = false;

            this.$events.emit('event:trigger', {name: 'confirmation-window:show', value: this.buildConfirmationBulk()});
        },

        deleteGame({value}) {

            this.isOpen = true;

            if (!value) return; // no eliminar el juego

            this.$gameStore.deleteGame(this.gameToDelete);

            this.$delete(this.games, this.indexToDelete);

            this.$notifications.success(`Juego <b>${this.gameToDelete.name}</b> eliminado con éxito`);

            this.$events.emit('event:trigger', {name: 'game:deleted'});
        },

        deleteAllGames({value}) {

            this.isOpen = true;

            if (!value) return; // no eliminar juegos

            this.$gameStore.deleteAllGames();

            this.games.splice(0, this.games.length);

            this.$notifications.success(`Todos los juegos han sido eliminados con éxito`);

            this.$events.emit('event:trigger', {name: 'game:deleted'});
        }
    },

    created() {

        this.$events.on('confirmation:game-delete', this.deleteGame);

        this.$events.on('confirmation:game-bulk-delete', this.deleteAllGames);
    }
}

</script>
<style lang="scss">

</style>