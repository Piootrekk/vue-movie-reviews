<script setup>
import { defineProps } from "vue";

defineProps({
  props: {
    displayedMovies: Array,
  },
});
</script>

<template>
  <div>
    <div class="justify-between mt-8 mx-auto container">
      <h2
        class="text-red-500 font-extrabold leading-none text-xl text-center flex"
      >
        <slot></slot>
      </h2>
    </div>
  </div>
</template>
