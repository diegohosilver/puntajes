<template>

    <ps-modal v-if="isOpen" @close="close" :isScrollable="true">

        <template v-slot:header>

            <h5 class="modal-title">{{title}}</h5>

        </template>

        <template v-slot:body>

            <ul class="list-group">
                <li v-for="(match, index) in matches" class="list-group-item d-flex justify-content-between align-items-center">
                    <span>
                        <span class="text-success">{{match.name}}</span> - <span class="text-primary">{{match.tag}}</span>
                    </span>
                    <span class="badge badge-danger badge-pill" @click="confirmDelete(index, match)"><i class="fas fa-times"></i></span>
                </li>
            </ul>

            <div v-if="!hasMatchs" class="alert alert-primary" role="alert">
                No hay jugadores registrados!
            </div>

        </template>

        <template v-slot:footer>

            <button type="button" class="btn btn-sm btn-danger" :class="{'disabled': !hasMatchs}" :disabled="!hasMatchs" @click="confirmDeleteAll">Eliminar todos</button>

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

            matches: [],

            indexToDelete: undefined,

            matchToDelete: undefined
        }
    },

    computed: {

        hasMatchs() {

            return this.matches.length > 0;
        },

        title() {

            return 'Listar jugadores';
        }
    },

    methods: {

        open() {

            this.isOpen = true;

            this.matches = this.$matches.list();
        },

        close() {

            this.matches = [];

            this.isOpen = false;
        },

        buildConfirmation() {

            return {
                title: 'Eliminar partida',
                message: `¿Está seguro que desea eliminar a <b class="text-success">${this.matchToDelete.name}</b> (tag <b class="text-primary">${this.matchToDelete.tag}</b>)?`,
                event: 'match-delete'
            };
        },

        buildConfirmationBulk() {

            return {
                title: 'Eliminar todas las partidas',
                message: `¿Está seguro que desea eliminar <b class="text-danger">todas</b> las jugadores registrados?`,
                event: 'match-bulk-delete'
            }
        },

        confirmDelete(index, match) {

            this.indexToDelete = index;

            this.matchToDelete = match;

            this.isOpen = false;

            this.$events.emit('event:trigger', {name: 'confirmation-window:show', value: this.buildConfirmation()});
        },

        confirmDeleteAll() {

            this.isOpen = false;

            this.$events.emit('event:trigger', {name: 'confirmation-window:show', value: this.buildConfirmationBulk()});
        },

        deleteMatch({value}) {

            this.isOpen = true;

            if (!value) return; // no eliminar el jugador

            this.$matchStore.deleteMatch(this.matchToDelete);

            this.$delete(this.matches, this.indexToDelete);

            this.$notifications.success(`Jugador <b>${this.matchToDelete.name}</b> (tag ${this.matchToDelete.tag}) eliminado con éxito`);

            this.$events.emit('event:trigger', {name: 'match:deleted'});
        },

        deleteAllMatchs({value}) {

            this.isOpen = true;

            if (!value) return; // no eliminar jugadores

            this.$matchStore.deleteAllMatchs();

            this.matches.splice(0, this.matches.length);

            this.$notifications.success(`Todos los jugadores han sido eliminados con éxito`);

            this.$events.emit('event:trigger', {name: 'match:deleted'});
        }
    },

    created() {

        this.$events.on('confirmation:match-delete', this.deleteMatch);

        this.$events.on('confirmation:match-bulk-delete', this.deleteAllMatchs);
    }
}

</script>
<style lang="scss">

</style>