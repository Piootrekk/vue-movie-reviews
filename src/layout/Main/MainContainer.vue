<template>
  <div v-if="isLoading" class="justify-between mt-8 mx-auto container">
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
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import MainMovie from "./MainMovie.vue";
import LoadingSpin from "@/components/LoadingSpin.vue";

export default {
  name: "MainContainer",
  components: {
    MainMovie,
    LoadingSpin,
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      // Dispatch the fetchMovieData action from the store
      store.dispatch('movieApiModule/fetchMovieData');
    });

    // Use getters from the store
    const isLoading = computed(() => store.getters['movieApiModule/isLoading']);
    const displayedMovies = computed(() => store.getters['movieApiModule/displayedMovies']);

    return {
      isLoading,
      displayedMovies,
    };
  },
};
</script>
