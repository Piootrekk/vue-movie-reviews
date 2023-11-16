<template>
  <div v-if="loading" class="justify-between mt-8 mx-auto container">
    <LoadingSpin />
  </div>
  <div
    v-else
    class="animate-popping-up grid gap-4 justify-between mt-8 mx-auto container mb-7 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2"
  >
    <MainMovie
      v-for="movie in displayedMovies"
      :key="movie.imdbID"
      :link="movie.Poster"
      :title="movie.Title"
      :year="movie.Year"
    />
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import MainMovie from "./MainMovie.vue";
import apiKeys from "@/env.js";
import LoadingSpin from "@/components/LoadingSpin.vue";

export default {
  name: "MainContainer",
  components: {
    MainMovie,
    LoadingSpin,
  },
  setup() {
    const loading = ref(false);
    const displayedMovies = ref([]);
    let apiKey = apiKeys.API_KEY2;

    const fetchMovieData = async () => {
      loading.value = true;
      //  10sec delay FOR test ↓↓↓↓↓
      // await new Promise((resolve) => setTimeout(resolve, 10000));

      const s = "Star Wars";
      const pages = 2;
      const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${s}&page=${pages}`;

      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          console.log("Data fetched from API:");
          displayedMovies.value = data.Search;
        } else {
          console.error("Błąd podczas pobierania danych z API OMDB");
          apiKey = (apiKey === apiKeys.API_KEY2) ? apiKeys.API_KEY1 : apiKeys.API_KEY3;
          console.log("Switching to a different API key:", apiKey);
          await fetchMovieData();
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych z API OMDB:", error);
      } finally {
        loading.value = false;
      }
    };

    watch(displayedMovies, (newVal) => {
      if (!newVal.length) {
        fetchMovieData();
      }
    });

    onMounted(() => {
      fetchMovieData();
    });

    return {
      loading,
      displayedMovies,
    };
  },
};
</script>
