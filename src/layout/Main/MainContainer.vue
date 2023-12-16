<script setup>
import { computed, watch, onMounted, watchEffect, ref } from "vue";
import { useStore } from "vuex";
import MainMovie from "./MainMovie.vue";
import BodyWrapper from "../StyleWrappers/BodyWrapper.vue";
import NotFoundWrapper from "../StyleWrappers/NotFoundWrapper.vue";

const store = useStore();
const follow = ref(false);
const isLoading = computed(() => store.getters["movieApiModule/isLoading"]);
const displayedMovies = computed(
  () => store.getters["movieApiModule/displayedMovies"]
);
const storedData = computed(
  () => store.getters["localStorageModule/getmovieData"]
);

onMounted(() => {
  store.dispatch("localStorageModule/initializeLocalStorage", {
    key: "movieData",
  });

  if (storedData.value) {
    store.commit("movieApiModule/setDisplayedMovies", storedData.value);
  }
  const movieIds = storedData.value.map((movie) => movie.imdbID);

  store.dispatch("firebaseDatabaseModule/getDocumentByMovieId", {
    collectionName: "MovieFollows",
    movieId: movieIds,
  });
});

watchEffect(() => {
  if (storedData.value) {
    store.dispatch("firebaseDatabaseModule/setReviewsStateToEmpty");
    const movieIds = storedData.value.map((movie) => movie.imdbID);
    store.dispatch("firebaseDatabaseModule/getDocumentByMovieId", {
      collectionName: "MovieFollows",
      movieId: movieIds,
    });
  }
});

watch(
  () => [
    store.getters["popularModule/isPopular"],
    store.getters["searchBarModule/getSearchTerm"],
  ],
  () => {
    store.dispatch("movieApiModule/fetchMovieData");
  }
);

watch(
  () => displayedMovies.value,
  (newDisplayedMovies) => {
    if (newDisplayedMovies) {
      store.dispatch("localStorageModule/updatemovieData", {
        newData: newDisplayedMovies,
        key: "movieData",
      });
    }
  }
);

const foundReview = computed(
  () => store.getters["firebaseDatabaseModule/getReviews"]
);

const feedBackHandler = (isfollowing) => {
  follow.value = isfollowing.value;
  console.log("1", isfollowing.value);
  console.log("2", follow.value);
};

const followHandler = (movieId) => {
  const getFollowsMovies = [];
  getFollowsMovies.push(...foundReview.value.map((follow) => follow.movieId));
  if (follow.value) {
    DelFollow(movieId);
  } else AddFollow(movieId);
  console.log(getFollowsMovies);
};

const AddFollow = async (movieId) => {
  let docTOSend = {
    movieId: movieId,
    id_user: store.getters["firebaseAuthModule/getUser"].uid,
  };
  await store.dispatch("firebaseDatabaseModule/addDocument", {
    data: docTOSend,
    collectionName: "MovieFollows",
  });
};

const DelFollow = async (movieId) => {
  const foundSameReview = foundReview.value.find(
    (review) => review.movieId === movieId
  );
  await store.dispatch("firebaseDatabaseModule/deleteDocument", {
    collectionName: "MovieFollows",
    reviewId: foundSameReview.id,
  });
};
</script>

<template>
  <div>
    <NotFoundWrapper
      :displayedMovies="displayedMovies"
      v-if="displayedMovies === undefined || displayedMovies.length === 0"
    >
      NO RESULTS FOUND
    </NotFoundWrapper>
    <BodyWrapper v-else :isLoading="isLoading">
      <template v-slot:main-movie>
        <MainMovie
          v-for="movie in displayedMovies"
          :key="movie.imdbID"
          :link="movie.Poster"
          :title="movie.Title"
          :year="movie.Year"
          :id="movie.imdbID"
          @feedBackFollow="feedBackHandler"
          :followHandler="() => followHandler(movie.imdbID)"
        />
      </template>
    </BodyWrapper>
  </div>
</template>
