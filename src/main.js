import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import store from "./store";
import VueClickAway from "vue3-click-away";

createApp(App).use(store).use(VueClickAway).mount("#app");
