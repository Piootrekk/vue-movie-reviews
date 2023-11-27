<template>
  <DropList :itemIconMap="itemIconMapHeaderNotLogged" v-if="isOpen" />
</template>

<script>
import DropList from "@/components/DropList.vue";
import { itemIconMapHeaderNotLogged } from "@/utils/utils.js";
import { inject } from "vue";

export default {
  components: {
    DropList,
  },
  setup() {
    const isOpen = inject("isOpen");

    return {
      isOpen,
      itemIconMapHeaderNotLogged,
    };
  },
};
</script>
