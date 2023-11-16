<template>
  <div class="mx-auto container flex mt-6">
    <h2
      class="uppercase text-yellow-500 font-extrabold leading-none text-xl items-center flex"
    >
      <span v-if="isPopularMovies">Popular Movies</span>
      <span v-else-if="isPopularTvShows">Popular TV shows</span>
      <span v-else>Popular</span>
    </h2>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "MainText",
  setup() {
    const store = useStore();

    const isPopularMovies = computed(() => store.getters["popularModule/isPopular"].movie);
    const isPopularTvShows = computed(() => store.getters["popularModule/isPopular"].tvShow);

    return {
      isPopularMovies,
      isPopularTvShows,
    };
  },
};
</script>

