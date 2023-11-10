<template>
  <div
    class="absolute shadow-lg rounded-lg z-10 mt-4 top-8 right-6 bg-gray-900 border border-gray-700"
    v-click-away="onClickaway"
  >
    <ul class="text-center self-center">
      <li
        v-for="(value, name, index) in itemIconMap"
        :key="index"
        class="px-6 py-4 cursor-pointer hover:bg-gray-800 focus:outline-none rounded-lg flex items-center"
      >
        <svg-icon
          v-if="value !== null"
          type="mdi"
          :path="value"
          size="30"
        ></svg-icon>
        {{ name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { inject } from "vue";
import { mixin as clickaway } from "vue3-click-away";
import SvgIcon from "@jamescoyle/vue-icon";

export default {
  name: "DropList",
  mixins: [clickaway],
  components: {
    SvgIcon,
  },
  props: {
    itemIconMap: Object,
  },
  setup() {
    const isOpen = inject("isOpen");
    const onClickaway = () => {
      if (isOpen.value) isOpen.value = false;
    };

    return { onClickaway };
  },
};
</script>
