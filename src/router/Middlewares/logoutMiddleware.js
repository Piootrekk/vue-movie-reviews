// logoutMiddleware.js
import { useStore } from "vuex";

export default async function logoutMiddleware(to, from, next) {
  const store = useStore();
  try {
    await store.dispatch("firebaseAuthModule/logout");

    // Display snackbar on successful logout
    store.dispatch("alertModule/displaySnackBar", {
      type: "success",
      title: "Logout",
      content: "You have been successfully logged out!",
    });

    next("/");
  } catch (error) {
    console.error("Logout failed:", error);

    // Handle logout failure (e.g., display an error snackbar)
    store.dispatch("alertModule/displaySnackBar", {
      type: "error",
      title: "Logout Failed",
      content: "An error occurred during logout.",
    });

    next(false);
  }
}
