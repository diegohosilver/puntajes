<template>

    <ps-modal v-if="isOpen" @close="close" :isScrollable="true">

        <template v-slot:header>

            <h5 class="modal-title">{{title}}</h5>

        </template>

        <template v-slot:body>

            <ul class="list-group">
                <li v-for="(player, index) in players" class="list-group-item d-flex justify-content-between align-items-center">
                    {{player.name}}
                    <span class="badge badge-danger badge-pill" @click="deletePlayer(index, player)"><i class="fas fa-times"></i></span>
                </li>
            </ul>

            <div v-if="!hasPlayers" class="alert alert-primary" role="alert">
                No hay jugadores registrados!
            </div>

        </template>

        <template v-slot:footer>

            <button type="button" class="btn btn-danger" :class="{'disabled': !hasPlayers}">Eliminar todos</button>

            <button type="button" class="btn btn-secondary" @click="close">Cerrar</button>

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

            players: []
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

        deletePlayer(index, player) {

            this.$playerStore.deletePlayer(player);

            this.$delete(this.players, index);

            this.$events.emit('player:deleted');
        }
    }
}

</script>
<style lang="scss">

</style>