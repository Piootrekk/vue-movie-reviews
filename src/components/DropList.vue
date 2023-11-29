<template>
  <div
    class="absolute shadow-lg rounded-lg z-10 mt-4 top-8 right-6 bg-gray-900 border border-gray-700"
    v-click-away="onClickaway"
  >
    <ul class="text-center self-center">
      <router-link
        v-for="(value, name, index) in itemIconMap"
        :key="index"
        :to="{ name: 'NotFound' }"
        class="px-6 py-4 cursor-pointer hover:bg-gray-800 focus:outline-none rounded-lg flex items-center"
      >
        <svg-icon
          class="mr-2"
          v-if="value !== null"
          type="mdi"
          :path="value"
          size="30"
        ></svg-icon>
        {{ name }}
      </router-link>
    </ul>
  </div>
</template>

<script>
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
  setup(props, { emit }) {
    const onClickaway = () => {
      emit("close");
    };

    return { onClickaway };
  },
};
</script>
