import {API} from '../../api.js';

const baseUrl = API.url + '/events';

const TYPE_PREFIX = 'EVENT';

const types = {
  EVENT_LOAD: '${TYPE_PREFIX}_LOAD',
  EVENT_LOAD_SUCCESS: '${TYPE_PREFIX}_LOAD_SUCCESS',
  EVENT_LOAD_FAILED: '${TYPE_PREFIX}_LOAD_FAILED',

  EVENT_PERIOD_LOAD: '${TYPE_PREFIX}_PERIOD_LOAD',
  EVENT_PERIOD_LOAD_SUCCESS: '${TYPE_PREFIX}_PERIOD_LOAD_SUCCESS',
  EVENT_PERIOD_LOAD_FAILED: '${TYPE_PREFIX}_PERIOD_LOAD_FAILED',

  EVENT_ADD: '${TYPE_PREFIX}_ADD',
  EVENT_ADD_SUCCESS: '${TYPE_PREFIX}_ADD_SUCCESS',
  EVENT_ADD_FAILED: '${TYPE_PREFIX}_ADD_FAILED',

  EVENT_UPDATE: '${TYPE_PREFIX}_UPDATE',
  EVENT_UPDATE_SUCCESS: '${TYPE_PREFIX}_UPDATE_SUCCESS',
  EVENT_UPDATE_FAILED: '${TYPE_PREFIX}_UPDATE_FAILED',

  EVENT_DELETE: '${TYPE_PREFIX}_DELETE',
  EVENT_DELETE_SUCCESS: '${TYPE_PREFIX}_DELETE_SUCCESS',
  EVENT_DELETE_FAILED: '${TYPE_PREFIX}_DELETE_FAILED',
}

const state = {
  isLoading: false,
  event: {
    title: '',
    notes: '',
    start: '',
    end: '',
    resourceId: 0
  },
  events: []
};

const getters = {
  isLoadingEvents: state => state.isLoading,
  event: state => state.event,
  getAllEvents: state => state.events
};

const actions = {
  loadAllEvents({ commit }) {
    return new Promise((resolve, reject) => {
      commit(types.EVENT_LOAD);

      fetch(baseUrl, {
        method: 'GET'
      })
        .then(data => data.json())
        .then(response => {
          console.log(response);
          commit(types.EVENT_LOAD_SUCCESS, response)
          resolve();
        })
        .catch(err => {
          console.error(err);
          commit(types.EVENT_LOAD_FAILED);
          reject();
        });
    });
  },

  loadAllEventsInPeriod({ commit }, { start, end }) {
    return new Promise((resolve, reject) => {
      commit(types.EVENT_PERIOD_LOAD);

      fetch(baseUrl + `/${start}/${end}`, {   
        method: 'GET'
      })
        .then(data => data.json())
        .then(response => {
          commit(types.EVENT_PERIOD_LOAD_SUCCESS, response)
          resolve();
        })
        .catch(err => {
          console.error(err);
          commit(types.EVENT_PERIOD_LOAD_FAILED);
          reject();
        });
    });
  },

  getEvent({ commit }, id) {

  },

  addEvent({ commit, state }, event) {
    commit(types.EVENT_ADD, event);

    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    })
      .then(data => data.json())
      .then(response => commit(types.EVENT_ADD_SUCCESS, response))
      .catch(err => {
        console.error(err);
        commit(types.EVENT_ADD_FAILED, state);
      });
  },

  updateEvent({ commit, state }, { id, event }) {
    commit(types.EVENT_UPDATE, { id, event });

    fetch(baseUrl + `/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    })
      .then(data => data.json())
      .then(response => commit(types.EVENT_UPDATE_SUCCESS, response))
      .catch(err => {
        console.error(err);
        commit(types.EVENT_UPDATE_FAILED, state);
      });
  },

  deleteEvent({ commit, state }, id) {
    commit(types.EVENT_DELETE, { id });

    fetch(baseUrl + `/${id}`, {
      method: 'DELETE'
    })
      .then(response => commit(types.EVENT_DELETE_SUCCESS, response))
      .catch(err => {
        console.error(err);
        commit(type.EVENT_DELETE_FAILED, state);
      });
  }
};

const mutations = {
  loadingState(state, { isLoading }) {
    state.isLoading = isLoading;
  },
  [types.EVENT_LOAD] (state) {
    state.isLoading = true;
  },
  [types.EVENT_LOAD_SUCCESS] (state, events) {
    state.events = events;
    state.isLoading = false;
  },
  [types.EVENT_LOAD_FAILED] (state) {
    state.isLoading = false;
  },

  [types.EVENT_PERIOD_LOAD] (state) {
    state.isLoading = true;
  },
  [types.EVENT_PERIOD_LOAD_SUCCESS] (state, events) {
    state.events = events;
    state.isLoading = false;
  },
  [types.EVENT_PERIOD_LOAD_FAILED] (state) {
    state.isLoading = false;
  },

  [types.EVENT_ADD] (state, event) {
    state.events.push(event);
  },
  [types.EVENT_ADD_SUCCESS] (state, response) {
    console.log(response);
  },
  [types.EVENT_ADD_FAILED] (state, oldState) {
    state = oldState;
  },

  [types.EVENT_UPDATE] (state, { id, event }) {

  },
  [types.EVENT_UPDATE_SUCCESS] (state, response) {
    // console.log(response);
  },
  [types.EVENT_UPDATE_FAILED] (state, oldState) {
    state = oldState;
  },

  [types.EVENT_DELETE] (state, { id }) {

  },
  [types.EVENT_DELETE_SUCCESS] (state, response) {
    // console.log(response);
  },
  [types.EVENT_DELETE_FAILED] (state, oldState) {
    state = oldState;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
