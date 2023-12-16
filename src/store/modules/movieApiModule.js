// movieApiModule.js
import apiKeys from "@/env.js";

let apiKey = apiKeys.API_KEY2;

export default {
  namespaced: true,
  state: {
    loading: false,
    displayedMovies: [],
    selectedMovie: null,
  },
  getters: {
    isLoading: (state) => state.loading,
    displayedMovies: (state) => state.displayedMovies,
    selectedMovie: (state) => state.selectedMovie,
  },
  mutations: {
    setLoading(state, value) {
      state.loading = value;
    },
    setDisplayedMovies(state, movies) {
      state.displayedMovies = movies;
    },
    setSelectedMovie(state, movie) {
      state.selectedMovie = movie;
    },
  },
  actions: {
    async fetchMovieData({ commit, dispatch, rootState }) {
      commit("setLoading", true);

      let searchTerm = rootState.searchBarModule.searchTerm;
      let pages = 1;
      let type = rootState.popularModule.isPopular.movie ? "movie" : "series";

      const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&page=${pages}&type=${type}`;

      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          commit("setDisplayedMovies", data.Search);
        } else {
          console.error("Błąd podczas pobierania danych z API OMDB");
          apiKey =
            apiKey === apiKeys.API_KEY2 ? apiKeys.API_KEY1 : apiKeys.API_KEY3;
          await dispatch("fetchMovieData");
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych z API OMDB:", error);
      } finally {
        commit("setLoading", false);
      }
    },

    async fetchmovieDetails({ commit }, id) {
      commit("setLoading", true);
      const apiUrl = `http://www.omdbapi.com/?apikey=${apiKeys.API_KEY2}&i=${id}&plot=full`;

      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          commit("setSelectedMovie", data);
        } else {
          console.error(
            "Błąd podczas pobierania danych z API OMDB (detale filmu)"
          );
        }
      } catch (error) {
        console.error(
          "Błąd podczas pobierania danych z API OMDB (detale filmu):",
          error
        );
      }
      commit("setLoading", false);
    },
  },
};
