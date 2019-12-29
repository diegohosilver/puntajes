<template>

    <ps-modal v-if="isOpen" @close="close">
        <template v-slot:header>
            <h5 class="modal-title">{{title}}</h5>
        </template>

        <template v-slot:body>

            <form>

                <div class="form-group">

                    <label for="gameName">Nombre</label>

                    <input type="text" class="form-control" :class="inputClass(gameName, gameNameTouched)" id="gameName" v-model="gameName" @input="gameNameTouched = true">

                    <div v-if="gameNameTouched" :class="feedbackClass(gameName)">
                        {{ feedbackMessage(gameName) }}
                    </div>

                </div>

            </form>

        </template>

        <template v-slot:footer>
            <button type="button" class="btn btn-sm btn-primary" :class="{'disabled': !canSave}" :disabled="!canSave" @click="save">Agregar juego</button>
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

    data() {
        return {
            isOpen: false,

            gameNameTouched: false,

            gameName: undefined,
        }
    },

    computed: {
        title() {

            return 'Agregar juegos';
        },

        canSave() {

            return !!(this.gameName);
        }
    },

    methods: {
        open() {
            this.isOpen = true;
        },

        defaultState() {

            this.gameNameTouched = false;

            this.gameName = undefined;
        },

        close() {
            this.defaultState();

            this.isOpen = false;
        },

        save() {

            this.$game.add(this.gameName);

            this.$events.emit('event:trigger', {name: 'game:add'});

            this.$notifications.success('Juego agregado');

            this.defaultState();
        },

        inputClass(model, touched) {
            if (!touched) return {};

            return  {
                'is-invalid': !model,
                'is-valid': model
            };
        },

        feedbackClass(model) {

            return {
                'invalid-feedback': !model,
                'valid-feedback': model
            }
        },

        feedbackMessage(model) {
            return model ? 'Bien hecho!' : 'Acá falta algo macho';
        }
    }
}

</script>
<style lang="scss">

    .invalid-feedback, 
    .valid-feedback {
        display: block !important;
    }
</style>