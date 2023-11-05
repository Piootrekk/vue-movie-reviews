<template>
  <div class="flex justify-items-center">
    <input
      type="text"
      placeholder="Search"
      class="border-2 border-gray-700 bg-gray-700 rounded-full px-5 focus:outline-none mr-5 mb-3"
    />
    <div
      class="w-10 h-10 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center"
    >
      <ProfileIcon height="20" width="20" class="cursor-pointer" />
    </div>
  </div>
</template>

<script>
import ProfileIcon from "@/components/ProfileIcon.vue";
export default {
  components: {
    ProfileIcon,
  },
  name: "HeaderSearch",
};
</script>
