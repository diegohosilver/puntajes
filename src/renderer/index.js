import 'bootstrap-css-only/css/bootstrap.min.css';
import 'toastr/build/toastr.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import toastr from 'toastr'
window.toastr = toastr

import Vue from 'vue'
import App from './App.vue'

import { PlayerStore } from './services/PlayerStore';
import { Player } from './services/Player';
import { Players } from './services/Players';
import { Utils } from './services/Utils';
import { Events } from './services/Events';
import { Notifications } from './services/Notifications';

let playerStore = new PlayerStore({ name: 'Player store' });

Vue.prototype.$playerStore = playerStore;
Vue.prototype.$player = new Player(playerStore);
Vue.prototype.$players = new Players(playerStore);
Vue.prototype.$utils = Utils;
Vue.prototype.$events = Events;
Vue.prototype.$notifications = Notifications;

new Vue({
  el: '#app',
  render(h) {
    return h(App)
  }
})