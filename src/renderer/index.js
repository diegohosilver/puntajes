// Archivos css de npm
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'toastr/build/toastr.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Librerias de npm
import $ from 'jquery';
import toastr from 'toastr';
window.jQuery = $;
window.$ = $;
window.toastr = toastr;

// Vuejs setup
import App from './App.vue';
import Vue from 'vue';

import { Events } from './services/Events';
import { Game } from './services/Game';
import { Games } from './services/Games';
import { GameStore } from './services/GameStore';
import { Notifications } from './services/Notifications';
import { Player } from './services/Player';
import { Players } from './services/Players';
import { PlayerStore } from './services/PlayerStore';
import { Round } from './services/Round';
import { Rounds } from './services/Rounds';
import { RoundStore } from './services/RoundStore';
import { Utils } from './services/Utils';

// Almacenamientos
let gameStore = new GameStore({ name: 'Game store' });
let playerStore = new PlayerStore({ name: 'Player store' });
let roundStore = new RoundStore({name: 'Round store'});

Vue.prototype.$events = Events;
Vue.prototype.$game = new Game(gameStore);
Vue.prototype.$games = new Games(gameStore);
Vue.prototype.$gameStore = gameStore;
Vue.prototype.$notifications = Notifications;
Vue.prototype.$player = new Player(playerStore);
Vue.prototype.$players = new Players(playerStore);
Vue.prototype.$playerStore = playerStore;
Vue.prototype.$round = new Round(roundStore);
Vue.prototype.$rounds = new Rounds(roundStore);
Vue.prototype.$roundStore = roundStore;
Vue.prototype.$utils = Utils;

new Vue({
  el: '#app',
  render(h) {
    return h(App)
  }
});