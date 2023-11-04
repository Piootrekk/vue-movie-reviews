<template>
  <div class="self-center text-xl">
    <ul class="flex">
      <li
        class="ml-5 hover:text-gray-400 cursor-pointer"
        :class="{ 'text-gray-400': isPopularMovies, 'text-white': !isPopularMovies }"
        @click="setPopularMoviesTrue"
      >
        Movies
      </li>
      <li
        class="ml-5 hover:text-gray-400 cursor-pointer"
        :class="{ 'text-gray-400': isPopularTvShows, 'text-white': !isPopularTvShows }"
        @click="setPopularShowsTrue"
      >
        TV shows
      </li>
      <li class="ml-5 hover:text-gray-400 cursor-pointer">About</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HeaderNavItems",
  data() {
    return {
      isPopularMovies: true,
      isPopularTvShows: false
    };
  },
  methods: {
    setPopularMoviesTrue() {
      this.isPopularMovies = true;
      this.isPopularTvShows = false;
    },
    setPopularShowsTrue() {
      this.isPopularMovies = false;
      this.isPopularTvShows = true;
    }
  }
};
</script>