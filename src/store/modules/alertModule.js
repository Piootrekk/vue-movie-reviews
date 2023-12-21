// alertModule.js
export default {
  namespaced: true,
  state: {
    snackBars: [],
  },
  getters: {
    snackBars(state) {
      return state.snackBars;
    },
  },
  mutations: {
    addSnackBar(state, snackBar) {
      snackBar.id = Date.now();
      state.snackBars.push(snackBar);
    },
    removeSnackBar(state, snackBarId) {
      const index = state.snackBars.findIndex((s) => s.id === snackBarId);
      if (index !== -1) {
        state.snackBars.splice(index, 1);
      }
    },
  },
  actions: {
    displaySnackBar({ commit }, snackBar) {
      commit("addSnackBar", snackBar);
      setTimeout(() => {
        commit("removeSnackBar", snackBar.id);
      }, 4000);
    },
  },
};
