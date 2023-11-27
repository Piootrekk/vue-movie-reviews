import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/logout",
    // JAKIEŚ POJEBANE TO CHUJ WIE CZY DZIAŁA
    beforeEnter: (to, from, next) => {
      store
        .dispatch("firebaseModule/logout")
        .then(() => {
          next("/");
        })
        .catch((error) => {
          console.error("Logout failed:", error);
          next(false);
        });
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
