<template>
  <div
    class="grid grid-cols-4 gap-4 justify-between mt-8 mx-auto container mb-7"
    v-if="movieData"
  >
    <MainMovie
      v-for="movie in movieData.Search"
      :key="movie.imdbID"
      :link="movie.Poster"
      :title="movie.Title"
      :year="movie.Year"
    />
  </div>
  <div v-else class="justify-between mt-8 mx-auto container">
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
    return { movieData: null };
  },
  methods: {
    async fetchMovieData() {
      const apiKey = apiKeys.API_KEY2;
      const s = "Batman";
      const pages = 2;
      const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${s}&page=${pages}`;

      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          this.movieData = data;
          console.log(data);
        } else {
          console.error("Błąd podczas pobierania danych z API OMDB");
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych z API OMDB:", error);
      }
    },
  },
  mounted() {
    this.fetchMovieData();
  },
};
</script>
