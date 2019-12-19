<template>

    <ps-modal v-if="isOpen" @close="close">
        <template v-slot:header>
            <h5 class="modal-title">{{title}}</h5>
        </template>

        <template v-slot:body>

            <form>

                <div class="form-group">

                    <label for="playerName">Nombre</label>

                    <input type="text" class="form-control" :class="inputClass(playerName, playerNameTouched)" id="playerName" v-model="playerName" @input="playerNameTouched = true">

                    <div v-if="playerNameTouched" :class="feedbackClass(playerName)">
                        {{ feedbackMessage(playerName) }}
                    </div>

                </div>

                <div class="form-group">

                    <label for="playerTag">Tag</label>

                    <input type="text" class="form-control" :class="inputClass(playerTag, playerTagTouched)" id="playerTag" v-model="playerTag" @input="playerTagTouched = true">

                    <div v-if="playerTagTouched" :class="feedbackClass(playerTag)">
                        {{ feedbackMessage(playerTag) }}
                    </div>

                </div>

            </form>

        </template>

        <template v-slot:footer>
            <button type="button" class="btn btn-sm btn-primary" :class="{'disabled': !canSave}" :disabled="!canSave" @click="save">Agregar jugador</button>
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

            playerNameTouched: false,

            playerName: undefined,

            playerTagTouched: false,

            playerTag: undefined
        }
    },

    computed: {
        title() {

            return 'Agregar jugadores';
        },

        canSave() {

            return !!(this.playerName) && !!(this.playerTag);
        }
    },

    methods: {
        open() {
            this.isOpen = true;
        },

        defaultState() {

            this.playerNameTouched = false;

            this.playerName = undefined;

            this.playerTagTouched = false;

            this.playerTag = undefined;
        },

        close() {
            this.defaultState();

            this.isOpen = false;
        },

        save() {

            this.$player.add(this.playerName, this.playerTag);

            this.$events.emit('event:trigger', {name: 'player:add'});

            this.$notifications.success('Jugador agregado');

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

</style>