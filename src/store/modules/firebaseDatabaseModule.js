// firebaseDatabaseModule.js
import { db } from "@/firebase/config.js";

export default {
  namespaced: true,
  state: {
    Reviews: [
      {
        id: "",
        movieId: "",
        user: {
          id: "",
          mail: "",
        },
        rating: "",
        comment: "",
        createdAt: "",
      },
    ],
    isLoading: false,
  },
  mutations: {
    setReviews(state, payload) {
      state.Reviews = payload;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
  },
  getters: {
    getReviews(state) {
      return state.Reviews;
    },
    getIsLoading(state) {
      return state.isLoading;
    },
  },
  actions: {
    async fetchReviews({ commit }, movieId) {
      commit("setIsLoading", true);
      const reviews = [];
      const querySnapshot = await db
        .collection("Reviews")
        .where("movieId", "==", movieId)
        .get();
      querySnapshot.forEach((doc) => {
        reviews.push(doc.data());
      });
      commit("setReviews", reviews);
      commit("setIsLoading", false);
    },
    async addReview({ commit }, payload) {
      commit("setIsLoading", true);
      await db.collection("Reviews").add(payload);
      commit("setIsLoading", false);
    },
    async updateReview({ commit }, { reviewId, updatedData }) {
      commit("setIsLoading", true);
      await db.collection("Reviews").doc(reviewId).update(updatedData);
      commit("setIsLoading", false);
    },
    async deleteReview({ commit }, reviewId) {
      commit("setIsLoading", true);
      await db.collection("Reviews").doc(reviewId).delete();
      commit("setIsLoading", false);
    },
  },
};
