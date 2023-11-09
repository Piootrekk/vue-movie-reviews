<template>
  <div
    class="absolute shadow-lg rounded-lg z-10 mt-4 top-8 right-6 bg-gray-900 border border-gray-700"
    v-click-away="onClickaway"
  >
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
        class="py-2 px-4 cursor-pointer hover:bg-gray-800 pt-4"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import { mixin as clickaway } from "vue3-click-away";

export default {
  name: "DropList",
  mixins: [clickaway],
  setup() {
    const items = ref([
      "Profile",
      "Settings",
      "Favorites",
      "Comments",
      "Logout",
    ]);
    const isOpen = inject("isOpen");
    const onClickaway = () => {
      if (isOpen.value) isOpen.value = false;
    };

    return { items, onClickaway };
  },
};
</script>
