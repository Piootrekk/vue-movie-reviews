import { createStore } from "vuex";
import popularModule from "./modules/popularModule";
import movieApiModule from "./modules/movieApiModule";

export default createStore({
  modules: {
    popularModule,
    movieApiModule,
  },
});
