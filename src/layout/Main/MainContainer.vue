<template>
  <div>
    <div
      v-if="displayedMovies === undefined || displayedMovies.length === 0"
      class="justify-between mt-8 mx-auto container"
    >
      <h2
        class="text-red-500 font-extrabold leading-none text-xl text-center flex"
      >
        No results found
      </h2>
    </div>
    <BodyWrapper v-else :isLoading="isLoading">
      <template v-slot:main-movie>
        <MainMovie
          v-for="movie in displayedMovies"
          :key="movie.imdbID"
          :link="movie.Poster"
          :title="movie.Title"
          :year="movie.Year"
          @my-event="onFollow"
        />
      </template>
    </BodyWrapper>
  </div>
</template>

<script>
import { computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import MainMovie from "./MainMovie.vue";
import BodyWrapper from "@/components/BodyWrapper.vue";

export default {
  name: "MainContainer",
  components: {
    MainMovie,
    BodyWrapper,
  },
  setup() {
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

    return {
      isLoading,
      displayedMovies,
      onFollow,
    };
  },
};
</script>
