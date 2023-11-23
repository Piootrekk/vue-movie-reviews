// firebaseModule.js
import auth from "@/firebase/config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    getUser: (state) => state.user,
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
  },
  actions: {
    createUser: async ({ commit }, { email, password }) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        const user = userCredential.user;
        commit("setUser", user);
        console.log("user created:", user);
      }
    },
    login: async ({ commit }, { email, password }) => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        commit("setUser", user);
        console.log("user logged in:", user);
      }
    },
  },
};
