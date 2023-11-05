<template>
  <div class="border-b border-gray-600 pb-8 pt-4 flex flex-col items-center">
    <img :src="link" alt="movie" class="w-full h-96 object-cover hover:opacity-75 cursor-pointer" />
    <span class="text-2xl font-bold text-center mt-3">{{ title }}<br /></span>
    <span class="font-bold text-center">{{ year }}</span>
  </div>
</template>

<script>
export default {
  props: {
    link: String,
    title: String,
    year: String,
  },
  name: "MainMovie",
};
</script>
