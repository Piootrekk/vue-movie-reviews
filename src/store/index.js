import { createStore } from "vuex";
import popularModule from "./modules/popularModule";
import movieApiModule from "./modules/movieApiModule";
import searchBarModule from "./modules/searchBarModule";
import localStorageModule from "./modules/localStorageModule";
import firebaseAuthModule from "./modules/firebaseAuthModule";
import firebaseDatabaseModule from "./modules/firebaseDatabaseModule";
import alertModule from "./modules/alertModule";

export default createStore({
  modules: {
    popularModule,
    movieApiModule,
    searchBarModule,
    localStorageModule,
    firebaseAuthModule,
    firebaseDatabaseModule,
    alertModule,
  },
});
