import Vue from 'vue'
import App from './App.vue'
import router from './route/router.js'
import store from './store'
import FullCalendar from 'vue-full-calendar'

import "fullcalendar-scheduler";
import "fullcalendar/dist/fullcalendar.min.css";
import "fullcalendar-scheduler/dist/scheduler.min.css";

Vue.use(FullCalendar);
Vue.config.productionTip = false;

let Main = Vue.component('app', App);

Main = new Main({
  el: '#app',
  store,
  router
});
