import Vue from 'vue'
import Vuex from 'vuex'

import events from './modules/events'
import resources from './modules/resources'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    events,
    resources
  }
});
