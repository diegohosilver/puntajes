<template>

    <ps-modal v-if="isOpen" @close="close" :isScrollable="true">

        <template v-slot:header>

            <h5 class="modal-title">{{title}}</h5>

        </template>

        <template v-slot:body>

            <ul class="list-group">
                <li v-for="player in players" class="list-group-item d-flex justify-content-between align-items-center">
                    {{player.name}}
                    <span class="badge badge-danger badge-pill" @click="deletePlayer(player)"><i class="fas fa-times"></i></span>
                </li>
            </ul>

        </template>

        <template v-slot:footer>

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

        title() {

            return 'Listar jugadores';
        }
    },

    methods: {

        open() {

            this.isOpen = true;

            this.list();
        },

        close() {

            this.players = [];

            this.isOpen = false;
        },

        list() {

            this.players = this.$players.list();
        },

        deletePlayer(player) {

            this.$playerStore.deletePlayer(player);

            this.list();
        }
    }
}

</script>
<style lang="scss">

</style>