<template>
  <div>
    <h1 class="text-3xl text-center mb-8">Movie Rating</h1>
    <p
      v-for="(rating, index) in movie.Ratings"
      :key="index"
      class="py-2 text-xl ml-5"
    >
      <b>{{ rating.Source }}</b
      >: {{ rating.Value }}
    </p>
    <h2 class="text-3xl text-center mb-4 mt-8">Rate movie:</h2>
    <div
      class="flex space-x-1 text-yellow-500 cursor-pointer justify-center items-center"
    >
      <svg-icon
        v-for="star in 5"
        :key="star"
        type="mdi"
        :path="getStarPath(star)"
        class="h-20 w-20"
        @mouseover="hoverStar(star)"
        @click="clickStar(star)"
        :style="{ pointerEvents: starClicked ? 'none' : 'auto' }"
      />
    </div>
    <p
      class="py-2 text-xl text-center animate-popping-up"
      v-if="acceptedStars > 0"
    >
      Your rate: {{ acceptedStars }} ☺
    </p>
  </div>
</template>

<script>
import { ref } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiStarOutline, mdiStar } from "@mdi/js";

export default {
  name: "DetailsRate",
  components: {
    SvgIcon,
  },
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const filledStars = ref(0);
    const acceptedStars = ref(0);
    const starClicked = ref(false);

    const hoverStar = (star) => {
      if (!starClicked.value) {
        filledStars.value = star;
      }
    };

    const resetStars = () => {
      if (filledStars.value === 0) {
        filledStars.value = 0;
        acceptedStars.value = 0;
      }
    };

    const clickStar = (star) => {
      filledStars.value = star;
      acceptedStars.value = star;
      starClicked.value = true;
    };

    const getStarPath = (star) => {
      return star <= filledStars.value ? mdiStar : mdiStarOutline;
    };

    return {
      filledStars,
      hoverStar,
      resetStars,
      clickStar,
      getStarPath,
      acceptedStars,
      starClicked,
    };
  },
};
</script>
