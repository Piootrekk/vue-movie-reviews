<template>
  <Header />
  <BodyWrapper>
    <template v-slot:main-movie>
      <h1>TU NARAZIE NIE MA NIC ¯\_(ツ)_/¯</h1>
      <p>{{ movieDetails.Title }}</p>
    </template>
  </BodyWrapper>
</template>

<script>
import BodyWrapper from "@/components/BodyWrapper.vue";
import Header from "@/layout/Header/Header.vue";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  name: "MovieDetails",
  components: {
    Header,
    BodyWrapper,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const movieDetails = computed(() => {
      return store.getters["movieApiModule/selectedMovie"];
    });

    onMounted(() => {
      const movieId = route.params.id;
      store.dispatch("movieApiModule/fetchmovieDetails", movieId);
    });

    return {
      movieDetails,
    };
  },
};
</script>
