<script setup>
import { defineProps, defineEmits, ref, watchEffect } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  link: String,
  title: String,
  year: String,
  id: String,
  followHandler: Function,
});

const emit = defineEmits(["feedBackFollow"]);
const store = useStore();

const isfollowing = ref(false);

watchEffect(() => {
  const reviews = store.getters["firebaseDatabaseModule/getReviews"];

  if (reviews && Array.isArray(reviews)) {
    const setFollowsList = reviews.map((follow) => follow.movieId);

    isfollowing.value = setFollowsList.includes(props.id);
  }
});

const ClickHandler = () => {
  emit("feedBackFollow", isfollowing);
  props.followHandler();
};
</script>

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
    <h2 class="text-2xl font-bold text-center mt-3 mx-1">{{ title }}<br /></h2>
    <h3 class="font-bold text-center mx-1">{{ year }}</h3>
    <br />
    <button
      v-if="store.getters['firebaseAuthModule/isAuthenticated']"
      @click.prevent="ClickHandler"
      class="w-24 mt-auto px-2 py-2 text-white rounded-full focus:outline-none"
      :class="!isfollowing ? 'bg-blue-500' : 'bg-red-500'"
    >
      {{ !isfollowing ? "Follow" : "Unfollow" }}
    </button>
  </router-link>
</template>
