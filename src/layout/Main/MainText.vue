<template>
  <div class="mx-auto container flex mt-6">
    <h2 class="uppercase text-yellow-500 font-extrabold leading-none text-2xl">
      {{ popularText }}
    </h2>
  </div>
</template>

<script>
export default {
  name: "MainText",
  data() {
    return {
      PopularMovies: "Popular Movies",
      PopularTvShows: "Popular TV Shows",
    };
  },
  computed: {
    popularText() {
      if (this.isPopularMovies) return this.PopularMovies;
      else if (this.isPopularTvShows) return this.PopularTvShows;
      return "Popular Movies";
    },
  },
};
</script>