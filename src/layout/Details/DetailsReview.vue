<script setup>
import CustomButton from "@/components/CustomButton.vue";
import CustomInput from "@/components/CustomInput.vue";
import ReviewsSection from "./ReviewsSection.vue";
import LoadingSpin from "@/components/LoadingSpin.vue";
import { mdiNoteEdit, mdiTrashCan, mdiCheckBold } from "@mdi/js";
import { useStore } from "vuex";
import { computed, ref, defineProps, onMounted } from "vue";
// import Snackbar from "@/components/Snackbar.vue";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const inputRef = ref("");
const isLoading = computed(
  () => store.getters["firebaseDatabaseModule/getIsLoading"]
);
const store = useStore();
const user = computed(() => store.getters["firebaseAuthModule/getUser"]);
const isAuthenticated = computed(
  () => store.getters["firebaseAuthModule/isAuthenticated"]
);
const reviews = computed(
  () => store.getters["firebaseDatabaseModule/getReviewsOrderedByDate"]
);

const isEdit = ref([false]);
const editModel = ref("");

const AddData = async () => {
  let docTOSend = {
    movieId: props.movie.imdbID,
    id_user: user.value.uid,
    mail: user.value.email,
    rating: 0,
    comment: inputRef.value,
  };
  await store.dispatch("firebaseDatabaseModule/addDocument", {
    data: docTOSend,
    collectionName: "Reviews",
  });
  store.dispatch("alertModule/displaySnackBar", {
    type: "success",
    title: "Review",
    content: "Review added successfully!",
  });
  inputRef.value = "";
};

const ShowReviews = async () => {
  await store.dispatch("firebaseDatabaseModule/getDocumentByMovieId", {
    collectionName: "Reviews",
    movieId: [props.movie.imdbID],
  });
};

const DelReviews = async (id) => {
  await store.dispatch("firebaseDatabaseModule/deleteDocument", {
    collectionName: "Reviews",
    reviewId: id,
  });
  store.dispatch("alertModule/displaySnackBar", {
    type: "success",
    title: "Review",
    content: "Review deleted successfully!",
  });
  isEdit.value = [false];
  editModel.value = "";
};

const EditReviews = async (id) => {
  await store.dispatch("firebaseDatabaseModule/updateDocument", {
    collectionName: "Reviews",
    reviewId: id,
    newComment: editModel.value,
  });

  store.dispatch("alertModule/displaySnackBar", {
    type: "success",
    title: "Review",
    content: "Review edited successfully!",
  });
  isEdit.value = [false];
  editModel.value = "";
};

const isUsersReview = (review) => {
  return review.id_user === user.value.uid;
};

onMounted(() => {
  store.dispatch("firebaseDatabaseModule/getDocumentByMovieId", {
    collectionName: "Reviews",
    movieId: [props.movie.imdbID],
  });
});
</script>

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
    <CustomButton class="w-1/5" label="Refresh" :handleClick="ShowReviews" />
  </div>
  <LoadingSpin v-if="isLoading" class="mt-11" />
  <div
    v-if="!isLoading && isAuthenticated && reviews.length > 0"
    class="overflow-y-auto overflow-x-hidden max-h-72 pr-11"
  >
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
          :handleClick="() => (isEdit[index] = !isEdit[index])"
          :withIcon="mdiNoteEdit"
        />

        <CustomButton
          class="w-1/8 bg-red-700"
          label="Delete"
          :handleClick="() => DelReviews(review.id)"
          :withIcon="mdiTrashCan"
        />
      </div>
      <div v-if="isEdit[index]" class="flex">
        <CustomInput
          class="h-10 w-full mb-0 mt-0 mr-4"
          name="edit"
          v-model="editModel"
          :key="review.id"
        />
        <CustomButton
          class="h-10 w-1/8 bg-blue-700 mt-8"
          label="Edit"
          :handleClick="() => EditReviews(review.id)"
          :withIcon="mdiCheckBold"
          :isButtonDisabled="editModel.length === 0"
        />
      </div>
    </ReviewsSection>
  </div>
  <div v-else-if="reviews.length === 0">
    <p>No reviews :C</p>
  </div>
</template>
