<template>
  <h1 class="text-3xl text-center mb-8">Your reviews</h1>
  <p class="ml-5 text-xl">Add your review</p>
  <div class="flex ml-5">
    <CustomInput
      class="h-14 w-full mb-0 mt-0 mr-4"
      v-model="inputRef"
      name="Add"
    />
    <CustomButton
      class="h-14 w-1/5 mb-12 mt-8"
      label="Add"
      :handleClick="AddData"
      :isButtonDisabled="inputRef.length === 0"
    ></CustomButton>
  </div>
  <h1 class="text-3xl text-center mb-8">Other reviews</h1>
  <div class="flex justify-center">
    <CustomButton class="w-1/5" label="Show" :handleClick="ShowReviews" />
  </div>
  <LoadingSpin v-if="isLoading" class="mt-11"/>
  <div v-if="reviews.length === 0">
    <p>No reviews :C</p>
  </div>
  <div v-else>
    <div v-if="!isLoading" class="overflow-y-auto overflow-x-hidden max-h-80 pr-11">
      <ReviewsSection
        v-for="(review, index) in reviews"
        :key="index"
        :author="review.mail"
        :text="review.comment"
        :rate="review.rating"
        :date="review.createdAt"
      >
        <div v-if="isUsersReview(review)" class="flex gap-2 mt-5">
          <CustomButton
            class="w-1/8 bg-green-700"
            label="Edit"
            @click="EditReviews(review.id)"
            :withIcon="mdiNoteEdit"
          />
          <CustomButton
            class="w-1/8 bg-red-700"
            label="Delete"
            @click="DelReviews(review.id)"
            :withIcon="mdiTrashCan"
          />
        </div>
      </ReviewsSection>
    </div>
  </div>
</template>
<script>
import CustomButton from "@/components/CustomButton.vue";
import CustomInput from "@/components/CustomInput.vue";
import ReviewsSection from "./ReviewsSection.vue";
import LoadingSpin from "@/components/LoadingSpin.vue";
import { mdiNoteEdit, mdiTrashCan } from "@mdi/js";
import { useStore } from "vuex";
import { computed, ref } from "vue";
export default {
  name: "DetailsReview",
  components: {
    CustomButton,
    CustomInput,
    ReviewsSection,
    LoadingSpin,
  },
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const inputRef = ref("");
    const isLoading = computed(
      () => store.getters["firebaseDatabaseModule/getIsLoading"]
    );
    const store = useStore();
    const user = computed(() => store.getters["firebaseAuthModule/getUser"]);
    const reviews = computed(
      () => store.getters["firebaseDatabaseModule/getReviews"]
    );

    const AddData = async () => {
      let docTOSend = {
        movieId: props.movie.imdbID,
        id_user: user.value.uid,
        mail: user.value.email,
        rating: 0,
        comment: inputRef.value,
      };
      await store.dispatch("firebaseDatabaseModule/addReview", {
        data: docTOSend,
        collectionName: "Reviews",
      });
    };

    const ShowReviews = async () => {
      await store.dispatch("firebaseDatabaseModule/getReviewsByMovieId", {
        collectionName: "Reviews",
        movieId: props.movie.imdbID,
      });
    };

    const DelReviews = async (id) => {
      await store.dispatch("firebaseDatabaseModule/deleteReview", {
        collectionName: "Reviews",
        reviewId: id,
      });
    };

    const EditReviews = async (id) => {
      await store.dispatch("firebaseDatabaseModule/updateReview", {
        collectionName: "Reviews",
        reviewId: id,
        newComment: "EDITED",
      });
    };

    const isUsersReview = (review) => {
      return review.id_user === user.value.uid;
    };

    return {
      AddData,
      inputRef,
      isLoading,
      ShowReviews,
      DelReviews,
      EditReviews,
      reviews,
      isUsersReview,
      mdiNoteEdit,
      mdiTrashCan,
    };
  },
};
</script>
