import store from "@/store";

export default async (to, from, next) => {
  const user = store.getters["firebase/getUser"];
  if (!user) {
    await store.dispatch("firebase/checkAuthState");
  }
  next();
};
