<template>
  <DropList :itemIconMap="itemIconMapHeaderLogged" v-if="isOpen" />
</template>

<script>
import DropList from "@/components/DropList.vue";
import { itemIconMapHeaderLogged } from "@/utils/utils.js";
import { inject } from "vue";

export default {
  components: {
    DropList,
  },
  setup() {
    const isOpen = inject("isOpen");

    return {
      isOpen,
      itemIconMapHeaderLogged,
    };
  },
};
</script>
