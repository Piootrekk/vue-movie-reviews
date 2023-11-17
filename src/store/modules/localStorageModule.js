// localStorageModule.js
export default {
  namespaced: true,
  state: {
    movieData: null,
  },
  getters: {
    getmovieData: (state) => state.movieData,
  },
  mutations: {
    updatemovieData: (state, newData) => {
      state.movieData = newData;
      localStorage.setItem("movieData", JSON.stringify(newData));
    },
  },
  actions: {
    initializeLocalStorage: ({ commit }) => {
      const storedData = localStorage.getItem("movieData");
      if (storedData) {
        commit("updatemovieData", JSON.parse(storedData));
      }
    },
    updatemovieData: ({ commit }, newData) => {
      commit("updatemovieData", newData);
    },
  },
};
