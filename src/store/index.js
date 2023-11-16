import { createStore } from "vuex";
import popularModule from "./modules/popular";

export default createStore({
  modules: {
    popularModule,
  },
});
