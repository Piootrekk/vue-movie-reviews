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
  if (store.getters["firebaseDatabaseModule/getReviews"]) {
    const getFollowsList = store.getters[
      "firebaseDatabaseModule/getReviews"
    ].map((follow) => follow.movieId);
    isfollowing.value = getFollowsList.includes(props.id);
  }
});

const ClickHandler = () => {
  emit("feedBackFollow", isfollowing);
  props.followHandler();
};

//   console.log(getFollowsMovies);
//   isfollowing.value = getFollowsMovies.includes(props.id);

//   if (isfollowing.value) {
//     const foundReview = store.getters["firebaseDatabaseModule/getReviews"].find(
//       (review) => review.movieId === props.id
//     );
//     store.dispatch("firebaseDatabaseModule/deleteDocument", {
//       collectionName: "MovieFollows",
//       reviewId: foundReview.id,
//     });
//   } else {
//     if (getFollowsMovies.some((follow) => follow.movieId === props.id))
//       return console.error("Already following");
//     let docTOSend = {
//       movieId: props.id,
//       id_user: store.getters["firebaseAuthModule/getUser"].uid,
//     };
//     store.dispatch("firebaseDatabaseModule/addDocument", {
//       data: docTOSend,
//       collectionName: "MovieFollows",
//     });
//   }

//   getFollowsMovies = [];
// };
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
      @click.prevent="ClickHandler"
      class="w-24 mt-auto px-2 py-2 text-white rounded-full focus:outline-none"
      :class="!isfollowing ? 'bg-blue-500' : 'bg-red-500'"
    >
      {{ !isfollowing ? "Follow" : "Unfollow" }}
    </button>
  </router-link>
</template>
