// firebaseModule.js
import auth from "@/firebase/config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    getUser: (state) => state.user,
    isAuthenticated: (state) => state.user !== null,
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
      // Zapisz dane użytkownika w localStorage po zalogowaniu
      localStorage.setItem("user", JSON.stringify(user));
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
    logout: async ({ commit }) => {
      await signOut(auth);
      commit("setUser", null);
      localStorage.removeItem("user");
      console.log("user logged out");
    },
    async checkAuthState({ commit }) {
      const userFromStorage = localStorage.getItem("user");
      if (userFromStorage) {
        const user = JSON.parse(userFromStorage);
        console.log("user logged in from localStorage");
        commit("setUser", user);
      } else {
        auth.onAuthStateChanged((user) => {
          if (user) {
            console.log("user logged in");
            commit("setUser", user);
          } else {
            console.log("user not logged in");
            commit("setUser", null);
          }
        });
      }
    },
  },
};
