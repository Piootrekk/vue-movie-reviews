// authMiddleware.js

import { useStore } from "vuex";

export default function authMiddleware(to, from, next) {
  if (to.path === "/login" || to.path === "/register") {
    if (useStore().getters["firebaseAuthModule/isAuthenticated"]) {
      next("/");
    } else {
      next();
    }
  }
}
