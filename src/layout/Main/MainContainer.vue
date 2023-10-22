<template>
    <div
      class="grid grid-cols-4 gap-4 justify-between mt-8 mx-auto container mb-7"
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
          } else {
            console.error("Błąd podczas pobierania danych z API OMDB");
          }
        } catch (error) {
          console.error("Błąd podczas pobierania danych z API OMDB:", error);
        } finally {
          this.loading = false;
        }
      },
    },
    mounted() {
      if (!localStorage.getItem("movieData")) {
        console.log("load to local");
        this.fetchMovieData();
      }
    },
  };
  </script>
  