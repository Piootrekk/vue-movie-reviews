<template>
  <div
    class="border-b w-full border-gray-600 mt-4 mx-5 px-5 hover:scale-105 transition-all hover:opacity-95 duration-300"
  >
    <div class="flex justify-between items-center mb-2">
      <p class="text-center">{{ author }}</p>
      <p class="text-right">{{ date }}</p>
    </div>
    <div class="mb-3 justify-between px-3">
      <p class="text-xl">{{ text }}</p>
      <p v-if="rate !== 0">Rate: {{ rate }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReviewsSection",
  components: {},
  props: {
    author: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      default: 0,
    },
    date: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>
