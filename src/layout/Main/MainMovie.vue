<template>
  <div
    class="rounded-lg border shadow-lg border-gray-600 pb-8 flex flex-col items-center hover:scale-110 transition-all hover:opacity-75 duration-500 ease-in-out mb-5 cursor-pointer"
  >
    <img
      :src="link"
      alt="movie"
      class="w-full h-96 object-cover rounded-lg p-1"
    />
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
