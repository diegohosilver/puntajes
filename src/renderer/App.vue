<template>
  <div class="container-fluid mt-3">

    <ps-confirmation ref="psConfirmation"></ps-confirmation>

    <ps-add-players ref="psAddPlayers"></ps-add-players>

    <ps-list-players ref="psListPlayers"></ps-list-players>

    <div class="jumbotron">

      <h1 class="display-4">Bienvenido Sabalero!</h1>

      <p class="lead">Esta es una pequeña utilidad que te permitirá organizar el torneo</p>

      <hr class="my-4" />

      <p>Para comenzar haz click en alguna de las opciones:</p>

      <p class="lead">
        <a
          class="btn btn-primary btn-md"
          href="#"
          role="button"
          @click="addPlayer">Agregar jugador </a>

        <a
          class="btn btn-secondary btn-md"
          href="#"
          role="button"
          @click="listPlayers">Listar jugadores <span class="badge badge-light">{{ playerCount }}</span></a>
      </p>

    </div>

  </div>

</template>

<script>

import PsConfirmation from './components/confirmation/Confirmation.vue';
import PsAddPlayers from './components/players/Add.vue';
import PsListPlayers from './components/players/List.vue';

export default {

  components: {
    PsConfirmation,
    PsAddPlayers,
    PsListPlayers
  },

  data() {

    return {

      playerCount: 0,

    };
  },

  methods: {

    addPlayer() {

      this.$refs.psAddPlayers.open();
    },

    listPlayers() {

      this.$refs.psListPlayers.open();
    },

    getPlayerCount() {

      this.playerCount = this.$players.list().length;
    },

    onEvent({name, value}) {

      switch(name) {

        case 'player:add':
        case 'player:deleted':
            this.getPlayerCount();
            break;
        case 'confirmation:show':
            this.$refs.psConfirmation.open(value);
            break;
      }
    }
  },

  created() {

    this.getPlayerCount();

    this.$events.on('event:trigger', this.onEvent);
  }
};
</script>