<template>
  <Header />
  <div v-if="isLoading" class="mt-8 mx-auto container">
    <LoadingSpin />
  </div>
  <div
    v-else
    class="container animate-popping-up mt-8 grid gap-4 mx-auto mb-7 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1"
  >
    <div class="border shadow-lg border-gray-600 rounded px-5 py-5">
      <div v-if="movieDetails !== null">
        <h1 class="text-3xl text-center mb-8">
          {{ movieDetails.Title }}
        </h1>
        <div class="flex">
          <img
            class="w-1/2 h-1/2 rounded-lg self-center"
            :src="movieDetails.Poster"
            :alt="movieDetails.Title"
          />
          <div class="flex flex-col ml-5 text-xl">
            <p class="py-2"><b>Released:</b> {{ movieDetails.Released }}</p>
            <p class="py-2"><b>Runtime: </b>{{ movieDetails.Runtime }}</p>
            <p class="py-2"><b>Genre:</b> {{ movieDetails.Genre }}</p>
            <p class="py-2"><b>Director: </b>{{ movieDetails.Director }}</p>
            <p class="py-2"><b>Writer:</b> {{ movieDetails.Writer }}</p>
            <p class="py-2"><b>Actors:</b> {{ movieDetails.Actors }}</p>

            <p class="py-2"><b>Language:</b> {{ movieDetails.Language }}</p>
            <p class="py-2"><b>Country:</b> {{ movieDetails.Country }}</p>
            <p class="py-2"><b>Awards:</b> {{ movieDetails.Awards }}</p>
            <p class="py-2"><b>BoxOffice:</b> {{ movieDetails.BoxOffice }}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <h1 class="text-center">Ops coś się wypierdoliło ¯\_(ツ)_/¯</h1>
      </div>
      <div class="flex justify-between gap-7 mb-2">
        <CustomButton label="Rate"></CustomButton>
        <CustomButton label="Plot"></CustomButton>
        <CustomButton label="Comments"></CustomButton>
      </div>
    </div>
    <div class="border shadow-lg border-gray-600 rounded px-5 py-5">
      <h1 class="text-center">TU NARAZIE NIE MA NIC ¯\_(ツ)_/¯</h1>
    </div>
  </div>
</template>

<script>
import Header from "@/layout/Header/Header.vue";
import LoadingSpin from "@/components/LoadingSpin.vue";
import CustomButton from "@/components/CustomButton.vue";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  name: "MovieDetails",
  components: {
    Header,
    LoadingSpin,
    CustomButton,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const movieDetails = computed(() => {
      return store.getters["movieApiModule/selectedMovie"];
    });
    const isLoading = computed(() => store.getters["movieApiModule/isLoading"]);

    onMounted(() => {
      const movieId = route.params.id;
      store.dispatch("movieApiModule/fetchmovieDetails", movieId);
    });

    return {
      movieDetails,
      isLoading,
    };
  },
};
</script>
