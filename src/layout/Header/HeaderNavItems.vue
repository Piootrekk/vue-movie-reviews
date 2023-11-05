<template>
  <div class="self-center text-xl">
    <ul class="flex">
      <li
        class="ml-5 hover:text-gray-400 cursor-pointer"
        :class="{
          'text-gray-400': isPopularMovies,
          'text-white': !isPopularMovies,
        }"
        @click="setPopularMoviesTrue"
      >
        Movies
      </li>
      <li
        class="ml-5 hover:text-gray-400 cursor-pointer"
        :class="{
          'text-gray-400': isPopularTvShows,
          'text-white': !isPopularTvShows,
        }"
        @click="setPopularShowsTrue"
      >
        TV shows
      </li>
      <li class="ml-5 hover:text-gray-400 cursor-pointer">About</li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "HeaderNavItems",
  setup() {
    const isPopularMovies = ref(true);
    const isPopularTvShows = ref(false);

    const setPopularMoviesTrue = () => {
      isPopularMovies.value = true;
      isPopularTvShows.value = false;
    };

    const setPopularShowsTrue = () => {
      isPopularMovies.value = false;
      isPopularTvShows.value = true;
    };

    return {
      isPopularMovies,
      isPopularTvShows,
      setPopularMoviesTrue,
      setPopularShowsTrue,
    };
  },
};
</script>
