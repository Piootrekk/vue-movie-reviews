// firebaseModule.js
import auth from "@/firebase/config.js";

export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    getUser: (state) => state.user,
  },
  mutations: {
    updateUser: (state, newUser) => {
      state.user = newUser;
    },
  },
  actions: {
    initializeFirebase: ({ commit }) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          commit("updateUser", user);
        } else {
          commit("updateUser", null);
        }
      });
    },
    updateUser: ({ commit }, newUser) => {
      commit("updateUser", newUser);
    },
  },
};
