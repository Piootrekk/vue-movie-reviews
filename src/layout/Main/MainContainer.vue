<template>
  <div
    class="grid gap-4 justify-between mt-8 mx-auto container mb-7 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3"
  >
    <MainMovie
      v-for="movie in displayedMovies"
      :key="movie.imdbID"
      :link="movie.Poster"
      :title="movie.Title"
      :year="movie.Year"
    />
  </div>
  <div v-if="loading" class="justify-between mt-8 mx-auto container">
    Pobieranie danych...
  </div>
</template>

<script>
import MainMovie from "./MainMovie.vue";
import apiKeys from "@/env.js";

export default {
  name: "MainContainer",
  components: {
    MainMovie,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    displayedMovies() {
      const storedData = localStorage.getItem("movieData");
      console.log("Displayed from localStorage");
      return storedData ? JSON.parse(storedData) : [];
    },
  },
  methods: {
    async fetchMovieData() {
      this.loading = true;

      const apiKey = apiKeys.API_KEY2;
      const s = "Batman";
      const pages = 2;
      const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${s}&page=${pages}`;

      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          console.log("Data fetched and set to local from API:");
          localStorage.setItem("movieData", JSON.stringify(data.Search));
          this.setLocalStorageTimer();
        } else {
          console.error("Błąd podczas pobierania danych z API OMDB");
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych z API OMDB:", error);
      } finally {
        this.loading = false;
      }
    },
    setLocalStorageTimer() {
      setTimeout(() => {
        localStorage.removeItem("movieData");
        this.fetchMovieData();
      }, 15 * 60 * 1000); // 15 minut na localstorage
    },
  },
  watch: {
    displayedMovies(newVal) {
      if (!newVal.length) {
        this.setLocalStorageTimer();
        this.fetchMovieData();
      }
    },
  },
  mounted() {
    if (!localStorage.getItem("movieData")) {
      console.log("load to local");
      this.fetchMovieData();
    } else {
      this.setLocalStorageTimer();
    }
  },
};
</script>
