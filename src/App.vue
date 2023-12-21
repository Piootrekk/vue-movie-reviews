<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";
import SnackBarQueue from "./components/SnackBarQueue.vue";


const initApp = async () => {
  await useStore().dispatch("firebaseAuthModule/checkAuthState");
};

onMounted(() => {
  initApp();
});
</script>

<template>
  <SnackBarQueue />
  <RouterView />
</template>
