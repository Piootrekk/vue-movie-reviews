<script setup>
import { computed, watch, onMounted, watchEffect } from "vue";
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
const storedData = computed(
  () => store.getters["localStorageModule/getmovieData"]
);

onMounted(() => {
  store.dispatch("localStorageModule/initializeLocalStorage", {
    key: "movieData",
  });

  if (storedData.value) {
    store.commit("movieApiModule/setDisplayedMovies", storedData.value);
  }
  const movieIds = storedData.value.map((movie) => movie.imdbID);

  store.dispatch("firebaseDatabaseModule/getDocumentByMovieId", {
    collectionName: "MovieFollows",
    movieId: movieIds,
  });
});

watchEffect(() => {
  if (storedData.value) {
    store.dispatch("firebaseDatabaseModule/setReviewsStateToEmpty");
    const movieIds = storedData.value.map((movie) => movie.imdbID);
    store.dispatch("firebaseDatabaseModule/getDocumentByMovieId", {
      collectionName: "MovieFollows",
      movieId: movieIds,
    });
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
