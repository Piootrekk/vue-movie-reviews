<template>
  <router-link
    :to="{ path: `/movie/${id}` }"
    class="rounded-lg border shadow-lg border-gray-600 pb-8 flex flex-col items-center hover:scale-110 transition-all hover:opacity-75 duration-500 ease-in-out mb-5 cursor-pointer"
  >
    <img
      :src="link"
      alt="movie"
      class="w-full h-96 object-cover rounded-lg p-1"
    />
    <span class="text-2xl font-bold text-center mt-3 mx-1"
      >{{ title }}<br
    /></span>
    <span class="font-bold text-center mx-1">{{ year }}</span> <br />
    <button
      @click.prevent="ButtonClick"
      class="w-24 mt-auto px-2 py-2 text-white rounded-full focus:outline-none"
      :class="follow ? 'bg-blue-500' : 'bg-red-500'"
    >
      {{ follow ? "Follow" : "Unfollow" }}
    </button>
  </router-link>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    link: String,
    title: String,
    year: String,
    id: String,
  },
  name: "MainMovie",
  setup(props, context) {
    let follow = ref(true);
    const ButtonClick = () => {
      context.emit("my-event", follow);
    };
    return { follow, ButtonClick };
  },
  emits: ["my-event"],
};
</script>
