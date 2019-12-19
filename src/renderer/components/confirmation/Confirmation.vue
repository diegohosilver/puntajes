<template>

    <ps-modal v-if="isOpen" @close="close">

        <template v-slot:header>

            <h5 class="modal-title">{{title}}</h5>

        </template>

        <template v-slot:body>
            
            <p v-html="message"></p>

        </template>

        <template v-slot:footer>

            <button type="button" class="btn btn-sm btn-secondary" @click="close(false)">Cancelar</button>

            <button type="button" class="btn btn-sm btn-primary" @click="close(true)">Aceptar</button>

        </template>
    </ps-modal>

</template>
<script>

import PsModal from './../modal/Modal.vue';

export default {

    components: {
        PsModal
    },

    data() {
        return {

            isOpen: false,

            title: undefined,

            message: undefined,

            event: undefined,
        }
    },

    methods: {

        open({title, message, event}) {

            this.title = title;

            this.message = message;

            this.event = event;

            this.isOpen = true;
        },

        close(value) {

            this.isOpen = false;

            this.title = undefined;

            this.message = undefined;

            this.$events.emit(`confirmation:${this.event}`, {value});

            this.event = undefined;
        }
    }
}

</script>
<style lang="scss">

</style>