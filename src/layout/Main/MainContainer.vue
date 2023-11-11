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

    const fetchMovieData = async () => {
      loading.value = true;
      // wait 5sec FOR test ↓↓↓↓↓
      // await new Promise((resolve) => setTimeout(resolve, 10000));

      const apiKey = apiKeys.API_KEY2;
      const s = "Star Wars";
      const pages = 1;
      const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${s}&page=${pages}`;

      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          console.log("Data fetched and set to local from API:");
          localStorage.setItem("movieData", JSON.stringify(data.Search));
          setLocalStorageTimer();
          checkLocalStorage();
        } else {
          console.error("Błąd podczas pobierania danych z API OMDB");
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych z API OMDB:", error);
      } finally {
        loading.value = false;
      }
    };

    const setLocalStorageTimer = () => {
      setTimeout(() => {
        localStorage.removeItem("movieData");
        fetchMovieData();
      }, 15 * 60 * 1000); // 15 minut na localstorage
    };

    const checkLocalStorage = () => {
      const storedData = localStorage.getItem("movieData");
      console.log("Displayed from localStorage");
      displayedMovies.value = storedData ? JSON.parse(storedData) : [];
    };

    watch(displayedMovies, (newVal) => {
      if (!newVal.length) {
        setLocalStorageTimer();
        fetchMovieData();
      }
    });

    onMounted(() => {
      if (!localStorage.getItem("movieData")) {
        console.log("load to local");
        fetchMovieData();
      } else {
        setLocalStorageTimer();
        checkLocalStorage();
      }
    });

    return {
      loading,
      displayedMovies,
    };
  },
};
</script>
