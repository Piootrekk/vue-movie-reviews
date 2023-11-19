import { createStore } from "vuex";
import popularModule from "./modules/popularModule";
import movieApiModule from "./modules/movieApiModule";
import searchBarModule from "./modules/searchBarModule";
import localStorageModule from "./modules/localStorageModule";
import firebaseModule from "./modules/firebaseModule";

export default createStore({
  modules: {
    popularModule,
    movieApiModule,
    searchBarModule,
    localStorageModule,
    firebaseModule,
  },
});
