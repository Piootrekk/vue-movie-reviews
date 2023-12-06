<template>
  <h1 class="text-3xl text-center mb-8">Your reviews</h1>
  <p class="ml-5 text-xl">Add your review</p>
  <div class="flex">
    <CustomInput class="h-14 w-full mb-0 mt-0 mr-4" />
    <CustomButton class="h-14 w-1/5 mb-12 mt-8" label="Add"></CustomButton>
  </div>
  <h1 class="text-3xl text-center mb-8">Other reviews</h1>
  <ReviewsSection
    author="test@test.test"
    text="asdasdasd"
    date="23/11/11 23:23"
    rate="5"
  />
  <ReviewsSection
    author="test@test.test"
    text="asdasdasd"
    date="23/11/11 23:23"
    rate="5"
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
    rate="5"
  />
</template>
<script>
import CustomButton from "@/components/CustomButton.vue";
import CustomInput from "@/components/CustomInput.vue";
import ReviewsSection from "./ReviewsSection.vue";
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
    return {};
  },
};
</script>
