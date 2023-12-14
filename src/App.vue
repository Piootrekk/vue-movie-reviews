<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";

const initApp = async () => {
  await useStore().dispatch("firebaseAuthModule/checkAuthState");
};

onMounted(() => {
  initApp();
});
</script>

<template>
  <RouterView />
</template>
