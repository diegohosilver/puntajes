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
          @click="trigger('player-add-window:open')">Agregar jugador </a>

        <a
          class="btn btn-secondary btn-md"
          href="#"
          role="button"
          @click="trigger('player-list-window:open')">Listar jugadores <span class="badge badge-light">{{ playerCount }}</span></a>

          <a
          class="btn btn-primary btn-md"
          href="#"
          role="button"
          @click="trigger('game-add-window:open')">Agregar juego </a>

        <a
          class="btn btn-secondary btn-md"
          href="#"
          role="button"
          @click="trigger('game-list-window:open')">Listar juego <span class="badge badge-light">{{ gameCount }}</span></a>
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

      gameCount: 0
    };
  },

  methods: {

    getCounters() {

      this.playerCount = this.$players.list().length;

      this.gameCount = this.$events.list().length;
    },

    trigger(name) {

      this.onEvent({name});
    },

    onEvent({name, value}) {

      switch(name) {

        case 'player:add':
        case 'player:deleted':
        case 'game:add':
        case 'game:deleted':
            this.getCounters();
            break;
        case 'confirmation-window:show':
            this.$refs.psConfirmation.open(value);
            break;
        case 'player-list-window:show':
            this.$refs.psListPlayers.open();
            break;
        case 'player-add-window:show':
            this.$refs.psAddPlayers.open();
            break;
      }
    }
  },

  created() {

    this.getCounters();

    this.$events.on('event:trigger', this.onEvent);
  }
};
</script>