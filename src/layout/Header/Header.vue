<template>
  <header
    class="flex justify-between mt-3 mx-auto container border-b border-gray-600 pb-8 pt-4"
  >
    <RouterLink to="/">
      <div class="flex cursor-pointer">
        <svg-icon type="mdi" :path="path" size="40"></svg-icon>
        <h1 class="mb-2 text-3xl ml-1 mt-1 font-extrabold leading-none">
          MovieReviewer
        </h1>
      </div>
    </RouterLink>
    <HeaderNavItems />
    <HeaderSearch />
  </header>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMovieOpen } from "@mdi/js";
import HeaderNavItems from "./HeaderNavItems.vue";
import HeaderSearch from "./HeaderSearch.vue";

export default {
  components: {
    HeaderNavItems,
    HeaderSearch,
    SvgIcon,
  },
  name: "HeaderMain",
  setup() {
    const path = mdiMovieOpen;
   
    return {
      path,
    };
  },
};
</script>
