<template>
  <header class="flex justify-between mt-3 mx-auto container border-b border-gray-600">
    <div class="flex ">
      <SvgIcon height="40" width="40" />
      <h1 class="mb-2 text-3xl ml-1 mt-3 font-extrabold leading-none ">MovieReviewer</h1>
    </div>
    <HeaderNavItems />
    <HeaderSearch />
  </header>
</template>

<script>
import HeaderNavItems from "./HeaderNavItems.vue";
import HeaderSearch from "./HeaderSearch.vue";
import SvgIcon from "@/components/CameraIcon.vue";

export default {
  components: {
    HeaderNavItems,
    HeaderSearch,
    SvgIcon,
  },
  name: "HeaderNavBar",
  data() {
    return {};
  },
  methods: {},
};
</script>
