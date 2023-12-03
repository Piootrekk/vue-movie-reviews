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
            <p
              v-for="(value, index) in detailsLabels"
              :key="index"
              class="py-2"
            >
              <b>{{ value }}:</b> {{ movieDetails[value] }}
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        <h1 class="text-center">Ops coś się wypierdoliło ¯\_(ツ)_/¯</h1>
      </div>
      <div class="flex justify-between gap-7 mb-2">
        <CustomButton label="Rate" :handleClick="RateClick"></CustomButton>
        <CustomButton label="Info" :handleClick="PlotClick"></CustomButton>
        <CustomButton
          label="Comments"
          :handleClick="CommentsClick"
        ></CustomButton>
      </div>
    </div>
    <div
      class="border shadow-lg border-gray-600 rounded px-5 py-5 animate-popping-up"
      v-if="movieDetails !== null"
      :key="selectedComponent"
    >
      <component :is="selectedComponent" :movie="movieDetails" />
    </div>
  </div>
</template>

<script>
import Header from "@/layout/Header/Header.vue";
import LoadingSpin from "@/components/LoadingSpin.vue";
import CustomButton from "@/components/CustomButton.vue";
import DetailsRate from "./DetailsRate.vue";
import DetailsPlot from "./DetailsPlot.vue";
import DetailsComments from "./DetailsComments.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "MovieDetails",
  components: {
    Header,
    LoadingSpin,
    CustomButton,
    DetailsRate,
    DetailsPlot,
    DetailsComments,
  },
  setup() {
    const store = useStore();
    const selectedComponent = ref("DetailsRate");

    const detailsLabels = [
      "Released",
      "Runtime",
      "Genre",
      "Director",
      "Writer",
      "Actors",
      "Language",
      "Country",
      "Awards",
      "BoxOffice",
    ];

    const movieDetails = computed(() => {
      return store.getters["movieApiModule/selectedMovie"];
    });
    const isLoading = computed(() => store.getters["movieApiModule/isLoading"]);

    const RateClick = () => {
      selectedComponent.value = "DetailsRate";
      console.log(selectedComponent.value);
    };

    const PlotClick = () => {
      selectedComponent.value = "DetailsPlot";
      console.log(selectedComponent.value);
    };

    const CommentsClick = () => {
      selectedComponent.value = "DetailsComments";
      console.log(selectedComponent.value);
    };

    return {
      movieDetails,
      isLoading,
      RateClick,
      PlotClick,
      CommentsClick,
      selectedComponent,
      detailsLabels,
    };
  },
};
</script>
