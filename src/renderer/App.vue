<template>
  <div class="container-fluid mt-3">

    <ps-players ref="psPlayers"></ps-players>

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
          @click="goToPlayers">Agregar jugador <span class="badge badge-light">{{ playerCount }}</span></a>
      </p>

    </div>

  </div>

</template>

<script>
import PsPlayers from './components/players/Players.vue';

export default {

  components: {

    PsPlayers
  },

  data() {

    return {

      playerCount: 0,

    };
  },

  methods: {

    goToPlayers() {

      this.$refs.psPlayers.open();
    },

    getPlayerCount() {

      this.playerCount = this.$player.list().length;
    }
  },

  created() {

    this.getPlayerCount();

    this.$events.on('player:add', this.getPlayerCount);
  }
};
</script>