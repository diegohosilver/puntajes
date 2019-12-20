<template>
  <div class="container-fluid mt-3">

    <ps-confirmation ref="psConfirmation"></ps-confirmation>

    <ps-add-players ref="psAddPlayers"></ps-add-players>

    <ps-list-players ref="psListPlayers"></ps-list-players>

    <ps-add-games ref="psAddGames"></ps-add-games>

    <ps-list-games ref="psListGames"></ps-list-games>

    <ps-add-rounds ref="psAddRounds"></ps-add-rounds>

    <ps-add-matches ref="psAddMatches"></ps-add-matches>

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
          @click="trigger('player-add-window:show')">Agregar jugador </a>

        <a
          class="btn btn-secondary btn-md"
          href="#"
          role="button"
          @click="trigger('player-list-window:show')">Listar jugadores <span class="badge badge-light">{{ playerCount }}</span></a>

          <a
          class="btn btn-primary btn-md"
          href="#"
          role="button"
          @click="trigger('game-add-window:show')">Agregar juego </a>

        <a
          class="btn btn-secondary btn-md"
          href="#"
          role="button"
          @click="trigger('game-list-window:show')">Listar juegos <span class="badge badge-light">{{ gameCount }}</span></a>

          <a
          class="btn btn-primary btn-md"
          href="#"
          role="button"
          @click="trigger('match-add-window:show')">Agregar partida </a>

        <a
          class="btn btn-secondary btn-md"
          href="#"
          role="button"
          @click="trigger('match-list-window:show')">Listar partidas <span class="badge badge-light">{{ gameCount }}</span></a>
      </p>

    </div>

    <div class="jumbotron">

      <div class="row">
        <div class="col-3" v-for="game in pinnedGames">

          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{game.name}}</h5>
              <button class="btn btn-sm btn-primary" @click="onEvent({name:'round-add-window:show', value: game})">Agregar Ronda</button>
            </div>
          </div>

        </div>
      </div>

    </div>

  </div>

</template>

<script>

import PsConfirmation from './components/confirmation/Confirmation.vue';
import PsAddPlayers from './components/players/Add.vue';
import PsListPlayers from './components/players/List.vue';
import PsAddGames from './components/games/Add.vue';
import PsListGames from './components/games/List.vue';
import PsAddRounds from './components/rounds/Add.vue';
import PsAddMatches from './components/match/Add.vue';

export default {

  components: {
    PsConfirmation,
    PsAddPlayers,
    PsListPlayers,
    PsAddGames,
    PsListGames,
    PsAddRounds,
    PsAddMatches
  },

  data() {

    return {

      playerCount: 0,

      gameCount: 0,

      pinnedGames: []
    };
  },

  methods: {

    getCounters() {

      this.playerCount = this.$players.list().length;

      this.gameCount = this.$games.list().length;
    },

    getPinnedGames() {

      this.pinnedGames = this.$games.listPinned();
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
            this.getPinnedGames();
            break;
        case 'game:pinned':
            this.getPinnedGames();
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
        case 'game-add-window:show':
            this.$refs.psAddGames.open();
            break;
        case 'game-list-window:show':
            this.$refs.psListGames.open();
            break;
        case 'round-add-window:show':
            this.$refs.psAddRounds.open(value);
            break;
        case 'match-add-window:show':
            this.$refs.psAddMatches.open();
            break;
      }
    }
  },

  created() {

    this.getCounters();

    this.getPinnedGames();

    this.$events.on('event:trigger', this.onEvent);
  }
};
</script>