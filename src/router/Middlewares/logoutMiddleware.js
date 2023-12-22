// logoutMiddleware.js
import { useStore } from "vuex";

export default async function logoutMiddleware(to, from, next) {
  const store = useStore();
  try {
    await store.dispatch("firebaseAuthModule/logout");
    store.dispatch("alertModule/displaySnackBar", {
      type: "success",
      title: "Logout",
      content: "You have been successfully logged out!",
    });

    next("/");
  } catch (error) {
    console.error("Logout failed:", error);
    store.dispatch("alertModule/displaySnackBar", {
      type: "error",
      title: "Logout Failed",
      content: "An error occurred during logout.",
    });

    next(false);
  }
}
