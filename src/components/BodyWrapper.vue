<template>
  <div>
    <div v-if="isLoading" class="mt-8 mx-auto container">
      <LoadingSpin />
    </div>
    <div v-else>
      <div
        v-if="displayedMovies && displayedMovies.length"
        class="animate-popping-up grid gap-4 justify-between mt-8 mx-auto container mb-7 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2"
      >
        <slot name="main-movie"></slot>
      </div>
      <div v-else class="justify-between mt-8 mx-auto container">
        <h2
          class="text-red-500 font-extrabold leading-none text-xl text-center flex"
        >
          No results found
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpin from "@/components/LoadingSpin.vue";

export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    displayedMovies: Array,
  },
  components: {
    LoadingSpin,
  },
};
</script>
