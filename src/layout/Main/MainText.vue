<template>
  <div class="mx-auto container flex mt-6">
    <h2
      class="uppercase text-yellow-500 font-extrabold leading-none text-xl items-center flex"
    >
      {{ title }}
    </h2>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "MainText",
  setup() {
    const store = useStore();

    const title = computed(() => {
      if (store.getters.isPopular.movie) {
        return "Popular Movies";
      } else if (store.getters.isPopular.tvShow) {
        return "Popular TV shows";
      }
      return "Popular";
    });

    return {
      title,
    };
  },
};
</script>
