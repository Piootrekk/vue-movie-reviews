<template>
  <div class="flex justify-center items-center">
    <div class="relative">
      
      <input
        type="text"
        placeholder="Search..."
        class="h-8 border-2 border-gray-700 bg-gray-700 rounded-full px-3 focus:outline-none text-gray-100 pl-12 mr-6"
      />
      <svg-icon
        type="mdi"
        :path="pathMagnify"
        class="absolute inset-y-0 left-1 top-1 w-6 h-6 m-auto pointer-events-none"
      ></svg-icon>
    </div>
    
    <div
      class="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 cursor-pointer relative"
      @click="isOpen = !isOpen"
    >
      <svg-icon type="mdi" :path="path" size="30"></svg-icon>
      <DropList v-if="isOpen" />
    </div>
    
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiAccount, mdiMagnify } from "@mdi/js";
import { ref } from "vue";
import DropList from "@/components/DropList.vue";

export default {
  components: {
    SvgIcon,
    DropList,
  },
  name: "HeaderSearch",
  setup() {
    const path = mdiAccount;
    const pathMagnify = mdiMagnify;
    let isOpen = ref(false);
    return {
      path,
      pathMagnify,
      isOpen,
    };
  },
};
</script>
