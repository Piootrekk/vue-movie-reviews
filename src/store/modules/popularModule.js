// popularModule.js
export default {
  namespaced: true,
  state: {
    isPopular: { movie: true, tvShow: false },
  },
  getters: {
    isPopular(state) {
      return state.isPopular;
    },
  },
  mutations: {
    setIsPopular(state, payload) {
      state.isPopular = payload;
    },
  },
  actions: {
    setIsPopular({ commit }, payload) {
      commit("setIsPopular", payload);
    },
  },
};
