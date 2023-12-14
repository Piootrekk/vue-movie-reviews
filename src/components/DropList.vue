<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { defineEmits, defineProps } from "vue";

defineProps({
  itemIconMap: Array,
});

const emit = defineEmits(["close"]);

const onClickaway = () => {
  emit("close");
};

const handleClickedItem = (item) => {
  item.action();
};
</script>

<script>
import { mixin as clickaway } from "vue3-click-away";

export default {
  name: "DropList",
  mixins: [clickaway],
};
</script>

<template>
  <div
    class="absolute shadow-lg rounded-lg z-10 mt-4 top-8 right-6 bg-gray-900 border border-gray-700"
    v-click-away="onClickaway"
  >
    <ul class="text-center self-center">
      <li
        v-for="(item, index) in itemIconMap"
        :key="index"
        @click="handleClickedItem(item)"
        class="px-6 py-4 cursor-pointer hover:bg-gray-800 focus:outline-none rounded-lg flex items-center"
      >
        <svg-icon
          class="mr-2"
          v-if="item.icon !== null"
          type="mdi"
          :path="item.icon"
          size="30"
        ></svg-icon>
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
