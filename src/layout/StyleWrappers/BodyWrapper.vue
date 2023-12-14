<script setup>
import LoadingSpin from "@/components/LoadingSpin.vue";
import { defineProps } from "vue";

defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div>
    <div v-if="isLoading" class="mt-8 mx-auto container">
      <LoadingSpin />
    </div>
    <div v-else>
      <div
        class="animate-popping-up grid gap-4 justify-between mt-8 mx-auto container mb-7 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2"
      >
        <slot name="main-movie"></slot>
      </div>
    </div>
  </div>
</template>
