import Vue from 'vue'
import App from './App.vue'
import router from './route/router.js'
import store from './store'
import Buefy from 'buefy'
import FullCalendar from 'vue-full-calendar'

import 'buefy/lib/buefy.css'
import "fullcalendar-scheduler";
import "fullcalendar/dist/fullcalendar.min.css";
import "fullcalendar-scheduler/dist/scheduler.min.css";

Vue.use(Buefy);
Vue.use(FullCalendar);
Vue.config.productionTip = false;

import Calendar from './components/Calendar';
import EventModal from './components/EventModal';
import Navbar from './components/Navbar';

Vue.component('calendar', Calendar);
Vue.component('event-modal', EventModal);
Vue.component('navbar', Navbar);

let Main = Vue.component('app', App);

Main = new Main({
  el: '#app',
  store,
  router
});
