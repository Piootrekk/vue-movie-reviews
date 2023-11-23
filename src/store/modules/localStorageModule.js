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
    updatemovieData: (state, { newData, key }) => {
      state.movieData = newData;
      localStorage.setItem(key, JSON.stringify(newData));
    },
  },
  actions: {
    initializeLocalStorage: ({ commit }, { key }) => {
      const storedData = localStorage.getItem(key);
      if (storedData) {
        commit("updatemovieData", { newData: JSON.parse(storedData), key });
      }
    },
    updatemovieData: ({ commit }, { newData, key }) => {
      commit("updatemovieData", { newData, key });
    },
    clearLocalStorage: (_, { key }) => {
      localStorage.removeItem(key);
    },
    saveWithExpiry: ({ commit }, { key, data, expiryInSeconds }) => {
      const expiryTime = new Date().getTime() + expiryInSeconds * 1000;
      const item = { data, expiry: expiryTime };
      localStorage.setItem(key, JSON.stringify(item));
      commit("updatemovieData", { newData: data, key });
    },
    
  },
};
