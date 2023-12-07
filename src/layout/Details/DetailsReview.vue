<template>
  <h1 class="text-3xl text-center mb-8">Your reviews</h1>
  <p class="ml-5 text-xl">Add your review</p>
  <div class="flex ml-5">
    <CustomInput class="h-14 w-full mb-0 mt-0 mr-4" />
    <CustomButton
      class="h-14 w-1/5 mb-12 mt-8"
      label="Add"
      :handleClick="AddData"
    ></CustomButton>
  </div>
  <h1 class="text-3xl text-center mb-8">Other reviews</h1>
  <ReviewsSection
    author="test@test.test"
    text="asdasdasd"
    date="23/11/11 23:23"
  />
  <ReviewsSection
    author="test@test.test"
    text="asdasdasd"
    date="23/11/11 23:23"
    :rate="5"
  />
  <ReviewsSection
    author="test@test.test"
    text="asdasdasd"
    date="23/11/11 23:23"
  />
  <ReviewsSection
    author="test@test.test"
    text="asdasdasd"
    date="23/11/11 23:23"
    :rate="5"
  />
</template>
<script>
import CustomButton from "@/components/CustomButton.vue";
import CustomInput from "@/components/CustomInput.vue";
import ReviewsSection from "./ReviewsSection.vue";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "DetailsReview",
  components: {
    CustomButton,
    CustomInput,
    ReviewsSection,
  },
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.getters["firebaseAuthModule/getUser"]);
    const reviews = computed(() => store.getters["firebaseDatabaseModule/getReviews"]);

    const AddData = () => {
      console.log("user: ",user);
      console.log(reviews);
    };
    return { AddData };
  },
};
</script>
