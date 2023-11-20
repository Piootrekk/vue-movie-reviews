// firebaseModule.js
import auth from "@/firebase/config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

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
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        commit("setUser", user);
        console.log("user created:", user);
      } catch (error) {
        console.log("error creating user:", error);
      }
    },
  },
};
