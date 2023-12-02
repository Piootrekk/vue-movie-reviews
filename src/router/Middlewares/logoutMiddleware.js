import { useStore } from "vuex";

export default function logoutMiddleware(to, from, next) {
  useStore()
    .dispatch("firebaseModule/logout")
    .then(() => {
      next("/");
    })
    .catch((error) => {
      console.error("Logout failed:", error);
      next(false);
    });
}
