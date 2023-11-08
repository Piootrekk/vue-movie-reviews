<template>
  <div
    class="absolute shadow-lg rounded-lg z-2 mt-4 top-8 right-6 bg-gray-900 border border-gray-700"  
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
import { ref } from "vue";

export default {
  setup() {
    const items = ref(["Profile", "Settings", "Favorites", "Comments", "Logout"]);

    return { items };
  },
};
</script>
