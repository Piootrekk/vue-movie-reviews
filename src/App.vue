<template>
  <RouterView />
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
export default {
  name: "App",
  setup() {
    const initApp = async () => {
      await useStore().dispatch("firebaseAuthModule/checkAuthState");
    };

    onMounted(() => {
      initApp();
    });

    return {};
  },
};
</script>
