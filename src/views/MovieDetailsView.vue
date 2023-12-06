<template>
  <Header />
  <MovieDetails />
</template>

<script>
import MovieDetails from "@/layout/Details/MovieDetails.vue";
import Header from "@/layout/Header/Header.vue";

export default {
  name: "MovieDetailsView",
  components: {
    MovieDetails,
    Header,
  },
};
</script>
