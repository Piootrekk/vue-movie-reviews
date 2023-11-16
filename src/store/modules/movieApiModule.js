// movieApiModule.js
import apiKeys from "@/env.js";

let apiKey = apiKeys.API_KEY2;

export default {
  namespaced: true,
  state: {
    loading: false,
    displayedMovies: [],
  },
  getters: {
    isLoading: (state) => state.loading,
    displayedMovies: (state) => state.displayedMovies,
  },
  mutations: {
    setLoading(state, value) {
      state.loading = value;
    },
    setDisplayedMovies(state, movies) {
      state.displayedMovies = movies;
    },
  },
  actions: {
    async fetchMovieData({ commit, dispatch, rootState }) {
      commit("setLoading", true);

      // Wait 3 sec for loading animation {TEST}
      await new Promise((resolve) => setTimeout(resolve, 1000));

      let s = "Star Wars";
      let pages = 1;
      let type = rootState.popularModule.isPopular.movie ? "movie" : "series";

      const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${s}&page=${pages}&type=${type}`;

      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          console.log("Dane pobrane z API:");
          commit("setDisplayedMovies", data.Search);
        } else {
          console.error("Błąd podczas pobierania danych z API OMDB");
          apiKey =
            apiKey === apiKeys.API_KEY2 ? apiKeys.API_KEY1 : apiKeys.API_KEY3;
          console.log("Zmiana klucza API na inny:", apiKey);
          await dispatch("fetchMovieData");
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych z API OMDB:", error);
      } finally {
        commit("setLoading", false);
      }
    },
  },
};
