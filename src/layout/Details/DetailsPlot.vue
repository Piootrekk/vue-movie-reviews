<script setup>
import { defineProps } from "vue";
defineProps({
  movie: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <h1 class="text-3xl text-center mb-8">Informations</h1>
  <p class="ml-5 text-xl indent-4">{{ movie.Plot }}</p>
</template>
