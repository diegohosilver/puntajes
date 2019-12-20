<template>

<ps-modal v-if="isOpen" @close="close">

    <template v-slot:header>

        <h5 class="modal-title">{{title}}</h5>

    </template>

    <template v-slot:body>
        
        <form>
 
            <div class="form-group">

                <label for="playerName">Juego</label>

                <input type="text" class="form-control disabled" disabled :value="game.name">

            </div>

            <div class="form-group">

                <label>Modalidad</label>

                <div class="custom-control custom-radio">
                    <input type="radio" name="mode" class="custom-control-input" id="modeCheck1" value="deathmatch" v-model="mode">
                    <label class="custom-control-label" for="modeCheck1">Deathmatch</label>
                </div>
                <div class="custom-control custom-radio">
                    <input type="radio" name="mode" class="custom-control-input" id="modeCheck2" value="teamDeathmatch" v-model="mode" disabled>
                    <label class="custom-control-label" for="modeCheck2">Team Deathmatch</label>
                </div>

            </div>

            <div class="form-group">

                <label>Tipo</label>

                <div class="custom-control custom-radio">
                    <input type="radio" name="type" class="custom-control-input" id="typeCheck1" value="kills" v-model="type">
                    <label class="custom-control-label" for="modeCheck1">Asesinatos / Muertes</label>
                </div>
                <div class="custom-control custom-radio">
                    <input type="radio" name="type" class="custom-control-input" id="typeCheck2" value="winner" v-model="type" disabled>
                    <label class="custom-control-label" for="modeCheck2">Ganador / Perdedor</label>
                </div>
            </div>

            <div class="form-group">

                <label>Participantes</label>

                <select class="custom-select" multiple size="4" v-model="selectedPlayers">

                    <option v-for="player in players" :value="player.id">
                        {{player.name}} - {{player.tag}}
                    </option>

                </select>

            </div>

        </form>

    </template>

    <template v-slot:footer>

        <button type="button" class="btn btn-sm btn-primary" :class="{'disabled': !canSave}" :disabled="!canSave" @click="save">Agregar ronda</button>
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

            return "Agregar ronda";
        },

        canSave() {

            return this.selectedPlayers.length > 0;
        }
    },

    data() {
        return {

            isOpen: false,

            game: undefined,

            mode: 'deathmatch',

            type: 'kills',

            selectedPlayers: [],

            players: []
        }
    },

    methods: {

        open(value) {

            this.getPlayers();

            this.game = value;

            this.isOpen = true;
        },

        defaultState() {

            this.game = undefined;

            this.mode = 'deathmatch';

            this.type = 'kills';

            this.selectedPlayers = [];
        },

        close() {

            this.defaultState();

            this.isOpen = false;
        },

        getPlayers() {

            this.players = this.$players.list();
        },

        save() {

            this.$round.add(this.game, this.mode, this.type, this.selectedPlayers);

            this.$events.emit('event:trigger', {name: 'round:add'});

            this.$notifications.success('Rounda agregada con éxito');

            this.defaultState();
        }
    }
}
</script>
<style lang="scss">

</style>