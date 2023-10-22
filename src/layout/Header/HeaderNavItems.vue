<template>
  <div class="self-center">
    <ul class="flex">
      <li
        class="ml-5 hover:text-gray-400 cursor-pointer"
        @click="setPopularMoviesTrue"
      >
        Movies
      </li>
      <li
        class="ml-5 hover:text-gray-400 cursor-pointer"
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



