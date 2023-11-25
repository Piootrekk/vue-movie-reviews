import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import store from "./store";
import VueClickAway from "vue3-click-away";
import router from "./router";

createApp(App).use(router).use(store).use(VueClickAway).mount("#app");
