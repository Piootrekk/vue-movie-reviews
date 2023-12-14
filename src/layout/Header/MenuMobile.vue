<template>
  <div>
    <SvgIcon
      :path="isOpen ? mdiMenuOpen : mdiMenu"
      type="mdi"
      size="40"
      @click="toggleMenu"
    />
    <MenuNavMobile :isOpen="isOpen" @close="closeNav" />
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMenu, mdiMenuOpen } from "@mdi/js";
import { ref } from "vue";
import MenuNavMobile from "./MenuNavMobile.vue";
export default {
  components: {
    SvgIcon,
    MenuNavMobile,
  },
  name: "MenuMobile",
  setup() {
    const isOpen = ref(false);

    const toggleMenu = () => {
      isOpen.value = !isOpen.value;
    };

    const closeNav = () => {
      isOpen.value = false;
    };

    return {
      mdiMenu,
      mdiMenuOpen,
      isOpen,
      toggleMenu,
      closeNav,
    };
  },
};
</script>
