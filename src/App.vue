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
      await useStore().dispatch("firebaseModule/checkAuthState");
    };

    onMounted(() => {
      initApp();
    });

    return {};
  },
};
</script>
