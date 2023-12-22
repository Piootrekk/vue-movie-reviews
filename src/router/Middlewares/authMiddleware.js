// authMiddleware.js

import { useStore } from "vuex";

export default function authMiddleware(to, from, next) {
  if (to.path === "/login" || to.path === "/register") {
    if (useStore().getters["firebaseAuthModule/isConfirmed"]) {
      next("/");
      useStore().dispatch("alertModule/displaySnackBar", {
        type: "info",
        title: "Authorization",
        content: "You are already logged in!",
      });
    } else {
      next();
    }
  }
}
