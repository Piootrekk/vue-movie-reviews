<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMovieOpen } from "@mdi/js";
import HeaderNavItems from "./HeaderNavItems.vue";
import HeaderSearch from "./HeaderSearch.vue";
import MenuMobile from "./MenuMobile.vue";

const path = mdiMovieOpen;
</script>
<script>
export default {
  name: "HeaderMain",
  inheritAttrs: false,
  customOptions: {},
};
</script>

<template>
  <header
    class="flex justify-between mt-3 mx-auto container border-b border-gray-600 pb-8 pt-4"
  >
    <RouterLink to="/">
      <div class="flex cursor-pointer">
        <svg-icon type="mdi" :path="path" size="40"></svg-icon>
        <h1
          class="mb-2 text-3xl lg:text-3xl sm:text-3xl md:text-2xl ml-1 mt-1 font-extrabold leading-none"
        >
          MovieReviewer
        </h1>
      </div>
    </RouterLink>
    <HeaderNavItems class="hidden md:flex" />
    <HeaderSearch class="hidden md:flex md:pl-10" />
    <MenuMobile class="md:hidden mr-5" />
  </header>
</template>
