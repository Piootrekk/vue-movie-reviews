<script setup>
import { computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import MainMovie from "./MainMovie.vue";
import BodyWrapper from "../StyleWrappers/BodyWrapper.vue";
import NotFoundWrapper from "../StyleWrappers/NotFoundWrapper.vue";

const store = useStore();

const onFollow = (flw) => {
  flw.value = !flw.value;
};

const isLoading = computed(() => store.getters["movieApiModule/isLoading"]);
const displayedMovies = computed(
  () => store.getters["movieApiModule/displayedMovies"]
);

onMounted(() => {
  store.dispatch("localStorageModule/initializeLocalStorage", {
    key: "movieData",
  });
  const storedData = store.getters["localStorageModule/getmovieData"];
  if (storedData) {
    store.commit("movieApiModule/setDisplayedMovies", storedData);
  }
});

watch(
  () => [
    store.getters["popularModule/isPopular"],
    store.getters["searchBarModule/getSearchTerm"],
  ],
  () => {
    store.dispatch("movieApiModule/fetchMovieData");
  }
);

watch(
  () => displayedMovies.value,
  (newDisplayedMovies) => {
    if (newDisplayedMovies) {
      store.dispatch("localStorageModule/updatemovieData", {
        newData: newDisplayedMovies,
        key: "movieData",
      });
    }
  }
);
</script>

<template>
  <div>
    <NotFoundWrapper
      :displayedMovies="displayedMovies"
      v-if="displayedMovies === undefined || displayedMovies.length === 0"
    >
      NO RESULTS FOUND
    </NotFoundWrapper>
    <BodyWrapper v-else :isLoading="isLoading">
      <template v-slot:main-movie>
        <MainMovie
          v-for="movie in displayedMovies"
          :key="movie.imdbID"
          :link="movie.Poster"
          :title="movie.Title"
          :year="movie.Year"
          :id="movie.imdbID"
          @my-event="onFollow"
        />
      </template>
    </BodyWrapper>
  </div>
</template>
