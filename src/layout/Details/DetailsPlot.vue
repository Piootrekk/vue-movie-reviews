<template>
  <h1 class="text-3xl text-center mb-8">Plot</h1>
  <p class="ml-5 text-xl indent-4"> {{ movie.Plot }}</p>
</template>
<script>
export default {
  name: "DetailsComments",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>
