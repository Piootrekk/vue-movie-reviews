<script setup>
//SnackbarQueue.vue
import Snackbar from "./Snackbar.vue";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const snackbarQueue = computed(() => store.getters["alertModule/snackBars"]);
</script>

<template>
  <div class="fixed z-50 bottom-4 right-4">
    <Snackbar
      class="mb-4"
      v-for="snackbar in snackbarQueue"
      :key="snackbar.id"
      :type="snackbar.type"
      :title="snackbar.title"
    >
      <p>{{ snackbar.content }}</p>
    </Snackbar>
  </div>
</template>
