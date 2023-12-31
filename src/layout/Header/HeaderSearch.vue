<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiAccount, mdiMagnify } from "@mdi/js";
import { ref, watch, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import _debounce from "lodash/debounce";
import DropList from "@/components/DropList.vue";
import { headerLoggedItems, headerNotLoggedItems } from "@/utils/utils.js";

const store = useStore();
const path = mdiAccount;
const pathMagnify = mdiMagnify;
const isOpen = ref(false);
const searchTerm = ref("");
const isUserAuthenticated = computed(
  () => store.getters["firebaseAuthModule/isAuthenticated"]
);
const itemIconMapper = ref(headerNotLoggedItems);

watchEffect(() => {
  itemIconMapper.value = isUserAuthenticated.value
    ? headerLoggedItems
    : headerNotLoggedItems;
});

const debouncedUpdateSearchTerm = _debounce((newVal) => {
  store.dispatch("searchBarModule/updateSearchTerm", newVal);
}, 800);

watch(searchTerm, (newVal) => {
  debouncedUpdateSearchTerm(newVal);
});

const handleClose = () => {
  isOpen.value = false;
};
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="relative">
      <input
        id="search"
        type="text"
        placeholder="Search..."
        class="h-8 border-2 border-gray-700 bg-gray-700 rounded-full px-3 focus:outline-none text-gray-100 pl-12 mr-6 lg:w-full sm:w-full md:w-4/5"
        v-model="searchTerm"
      />
      <svg-icon
        type="mdi"
        :path="pathMagnify"
        class="absolute inset-y-0 left-1 top-1 w-6 h-6 m-auto pointer-events-none"
      ></svg-icon>
    </div>

    <div
      class="w-12 h-12 rounded-full bg-gray-700 items-center justify-center cursor-pointer relative border-2 border-gray-700 lg:ml-6 hidden md:flex"
      @click="isOpen = !isOpen"
    >
      <svg-icon type="mdi" :path="path" size="30"></svg-icon>
      <DropList
        :itemIconMap="itemIconMapper"
        v-if="isOpen"
        @close="handleClose"
      />
    </div>
  </div>
</template>
