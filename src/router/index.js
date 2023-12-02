import { createRouter, createWebHistory } from "vue-router";
import authMiddleware from "./Middlewares/authMiddleware";
import logoutMiddleware from "./Middlewares/logoutMiddleware";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
    beforeEnter: authMiddleware,
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/RegisterView.vue"),
    beforeEnter: authMiddleware,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/logout",
    name: "Logout",
    beforeEnter: logoutMiddleware,
  },
  {
    path: "/movie/:id",
    name: "Movie",
    component: () => import("../views/MovieDetailsView.vue"),
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
