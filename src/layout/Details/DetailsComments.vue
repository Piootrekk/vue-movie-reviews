<template>
  <h1 class="text-3xl text-center mb-8">Tu narazie nic nie ma ¯\_(ツ)_/¯</h1>
  <p class="ml-5 text-xl">Kiedyś zrobie</p>
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
