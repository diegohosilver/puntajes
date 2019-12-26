<template>

    <ps-modal v-if="isOpen" @close="close">

        <template v-slot:header>

            <h5 class="modal-header">{{title}}</h5>

        </template>

        <template v-slot:body>



        </template>

        <template v-slot:footer>

            <button type="button" class="btn btn-sm btn-danger" :class="{'disabled': !hasPlayers}" :disabled="!hasPlayers" @click="confirmDeleteAll">Eliminar todos</button>

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
            isOpen: false
        }
    },

    methods: {

        open(){

        },

        close(){
            
        }
    }
}
</script>
<style>
</style>