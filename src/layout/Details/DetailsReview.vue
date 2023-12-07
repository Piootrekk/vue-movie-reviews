<template>
  <h1 class="text-3xl text-center mb-8">Your reviews</h1>
  <p class="ml-5 text-xl">Add your review</p>
  <div class="flex ml-5">
    <CustomInput class="h-14 w-full mb-0 mt-0 mr-4" v-model="inputRef" />
    <CustomButton
      class="h-14 w-1/5 mb-12 mt-8"
      label="Add"
      :handleClick="AddData"
      :isButtonDisabled="inputRef.length === 0"
      :isLoading="isLoading"
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
import { computed, ref } from "vue";
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
  setup(props) {
    const inputRef = ref("");
    const isLoading = ref(false);
    const store = useStore();
    const user = computed(() => store.getters["firebaseAuthModule/getUser"]);
    // const reviews = computed(
    //   () => store.getters["firebaseDatabaseModule/getReviews"]
    // );

    const AddData = async () => {
      isLoading.value = true;
      let docTOSend = {
        movieId: props.movie.imdbID,
        id_user: user.value.uid,
        mail: user.value.email,
        rating: "",
        comment: inputRef.value,
      };
      console.log(docTOSend);
      await store.dispatch("firebaseDatabaseModule/addReview", {
        data: docTOSend,
        collectionName: "Reviews",
      });

      isLoading.value = false;
    };
    return { AddData, inputRef, isLoading };
  },
};
</script>

// { id: "", movieId: "", user: { id: "", mail: "", }, rating: "", comment: "",
// createdAt: "", },
