<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const isPopularMovies = computed(
  () => store.getters["popularModule/isPopular"].movie
);
const isPopularTvShows = computed(
  () => store.getters["popularModule/isPopular"].tvShow
);

const setPopularMoviesTrue = () => {
  store.commit("popularModule/setIsPopular", {
    movie: true,
    tvShow: false,
  });
};

const setPopularShowsTrue = () => {
  store.commit("popularModule/setIsPopular", {
    movie: false,
    tvShow: true,
  });
};
</script>

<template>
  <div class="self-center text-xl">
    <ul class="flex">
      <RouterLink
        to="/"
        class="ml-5 hover:text-gray-400 cursor-pointer"
        :class="{
          'text-gray-400': isPopularMovies,
          'text-white': !isPopularMovies,
        }"
        @click="setPopularMoviesTrue"
      >
        Movies
      </RouterLink>
      <RouterLink
        to="/"
        class="ml-5 hover:text-gray-400 cursor-pointer"
        :class="{
          'text-gray-400': isPopularTvShows,
          'text-white': !isPopularTvShows,
        }"
        @click="setPopularShowsTrue"
      >
        TV shows
      </RouterLink>
      <router-link to="/about" class="ml-5 hover:text-gray-400 cursor-pointer"
        >About</router-link
      >
    </ul>
  </div>
</template>
