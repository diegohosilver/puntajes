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
import Vue from 'vue'
import App from './App.vue'

import { PlayerStore } from './services/PlayerStore';
import { Player } from './services/Player';
import { Players } from './services/Players';
import { Utils } from './services/Utils';
import { Events } from './services/Events';
import { Notifications } from './services/Notifications';
import { GameStore } from './services/GameStore';
import { Game } from './services/Game';
import { Games } from './services/Games';

// Almacenamientos
let playerStore = new PlayerStore({ name: 'Player store' });
let gameStore = new GameStore({ name: 'Game store' });

Vue.prototype.$playerStore = playerStore;
Vue.prototype.$player = new Player(playerStore);
Vue.prototype.$players = new Players(playerStore);
Vue.prototype.$gameStore = gameStore;
Vue.prototype.$games = new Games(gameStore);
Vue.prototype.$game = new Game(gameStore);
Vue.prototype.$utils = Utils;
Vue.prototype.$events = Events;
Vue.prototype.$notifications = Notifications;

new Vue({
  el: '#app',
  render(h) {
    return h(App)
  }
});