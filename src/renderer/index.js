import 'bootstrap-css-only/css/bootstrap.min.css';
import 'toastr/build/toastr.css';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import toastr from 'toastr'
window.toastr = toastr

import Vue from 'vue'
import App from './App.vue'

import { Player } from './services/Player';
import { Utils } from './services/Utils';
import { Events } from './services/Events';
import { Notifications } from './services/Notifications';

Vue.prototype.$player = new Player();
Vue.prototype.$utils = Utils;
Vue.prototype.$events = Events;
Vue.prototype.$notifications = Notifications;

new Vue({
  el: '#app',
  render(h) {
    return h(App)
  }
})