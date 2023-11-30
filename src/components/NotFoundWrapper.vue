<template>
  <div>
    <div class="justify-between mt-8 mx-auto container">
      <h2
        class="text-red-500 font-extrabold leading-none text-xl text-center flex"
      >
        No results found
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    displayedMovies: Array,
  },
};
</script>
