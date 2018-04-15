import {API} from '../../api.js';

const baseUrl = API.url + '/resources';

const TYPE_PREFIX = 'RESOURCE';

const types = {
  RESOURCE_LOAD: '${TYPE_PREFIX}_LOAD',
  RESOURCE_LOAD_SUCCESS: '${TYPE_PREFIX}_LOAD_SUCCESS',
  RESOURCE_LOAD_FAILED: '${TYPE_PREFIX}_LOAD_FAILED',

  RESOURCE_ADD: '${TYPE_PREFIX}_ADD',
  RESOURCE_ADD_SUCCESS: '${TYPE_PREFIX}_ADD_SUCCESS',
  RESOURCE_ADD_FAILED: '${TYPE_PREFIX}_ADD_FAILED',
}

const state = {
  isLoading: false,
  resource: {
    title: ''
  },
  resources: []
};

const getters = {
  isLoadingResources: state => state.isLoading,
  resource: state => state.resource,
  getAllResources: state => state.resources
};

const actions = {
  loadAllResources({ commit }) {
    return new Promise((resolve, reject) => {
      commit(types.RESOURCE_LOAD);

      fetch(baseUrl, {
        method: 'GET'
      })
        .then(data => data.json())
        .then(response => {
          commit(types.RESOURCE_LOAD_SUCCESS, response)
          resolve();
        })
        .catch(err => {
          console.error(err);
          commit(types.RESOURCE_LOAD_FAILED);
          reject();
        });
    });
  },

  getResource({ commit }, id) {

  },

  addResource({ commit, state }, resourceTitle) {
    commit(types.RESOURCE_ADD, resourceTitle);

    fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify({ title: resourceTitle })
    })
      .then(response => commit(types.RESOURCE_ADD_SUCCESS, response))
      .catch(err => {
        console.error(err);
        commit(types.RESOURCE_ADD_FAILED, state);
      });
  },

  updateResource({ commit }, data) {

  },

  deleteResource({ commit }, id) {

  }
};

const mutations = {
  loadingState(state, { isLoading }) {
    state.isLoading = isLoading;
  },

  [types.RESOURCE_LOAD] (state) {
    state.isLoading = true;
  },
  [types.RESOURCE_LOAD_SUCCESS] (state, resources) {
    state.resources = resources;
    state.isLoading = false;
  },
  [types.RESOURCE_LOAD_FAILED] (state) {
    state.isLoading = false;
  },

  [types.RESOURCE_ADD] (state, resource) {
    state.resources.push(resource);
  },
  [types.RESOURCE_ADD_SUCCESS] (state, response) {
    // console.log(response);
  },
  [types.RESOURCE_ADD_FAILED] (state, oldState) {
    state = oldState;
  },

  updateResource(state, data) {

  },

  deleteResource(state, data) {
    
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
