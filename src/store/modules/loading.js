//intial state

const state = {
  loading: false
};

const getters = {};

const actions = {};

const mutations = {
  SET_LOADING(state, status) {
    state.loading = status;
    console.log(status);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
