// searchBarModule.js
export default {
  namespaced: true,
  state: {
    searchTerm: "",
  },
  getters: {
    getSearchTerm: (state) => state.searchTerm,
  },
  mutations: {
    updateSearchTerm: (state, searchTerm) => {
      state.searchTerm = searchTerm;
    },
  },
  actions: {
    updateSearchTerm: ({ commit }, searchTerm) => {
      commit("updateSearchTerm", searchTerm);
    },
  },
};
