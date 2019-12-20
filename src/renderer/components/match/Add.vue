<template>

<ps-modal v-if="isOpen" @close="close">

    <template v-slot:header>

        <h5 class="modal-title">{{title}}</h5>

    </template>

    <template v-slot:body>

        <form>

            <div class="form-group">

                <label for="name">Nombre</label>

                <input type="text" class="form-control" :class="inputClass(name, nameTouched)" id="name" v-model="name" @input="nameTouched = true">

                <div v-if="nameTouched" :class="feedbackClass(name)">
                    {{ feedbackMessage(name) }}
                </div>

            </div>

            <div class="form-group">

                <label for="date">Fecha</label>

                <input type="date" placeholder="mm/dd/aaaa" class="form-control" :class="inputClass(date, dateTouched)" id="date" v-model="date" @input="dateTouched = true">

                <div v-if="dateTouched" :class="feedbackClass(date)">
                    {{ feedbackMessage(date) }}
                </div>

            </div>

        </form>
        
    </template>

    <template v-slot:footer>

        <button type="button" class="btn btn-sm btn-primary" :class="{'disabled': !canSave}" :disabled="!canSave" @click="save">Agregar partida</button>
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

    computed: {

        title() {

            return "Agregar partidas";
        },

        canSave() {

            return !!(this.name) && !!(this.date);
        }
    },

    data() {
        return {

            isOpen: false,

            name: undefined,

            nameTouched: false,

            date: undefined,

            dateTouched: false
        }
    },

    methods: {

        open() {

            this.isOpen = true;
        },

        defaultState() {

            this.name = undefined,

            this.nameTouched = false,

            this.date = undefined,

            this.dateTouched = false
        },

        close() {

            this.defaultState();

            this.isOpen = false;
        },

        save() {

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