// firebaseDatabaseModule.js
import { db } from "@/firebase/config.js";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default {
  namespaced: true,
  state: {
    Reviews: [],
    isLoading: false,
  },
  mutations: {
    setReviews(state, payload) {
      state.Reviews = payload;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    pushReview(state, payload) {
      state.Reviews.push(payload);
    }
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
    async addReview({ commit }, { collectionName, data }) {
      try {
        commit("setIsLoading", true);
        console.log("collectionName:", collectionName);
        const reviewsCollectionRef = collection(db, collectionName);
        data.createdAt = serverTimestamp();
        await addDoc(reviewsCollectionRef, data);
        console.log("Review added");
      } catch (error) {
        console.error("Error adding review:", error);
      } finally {
        commit("setIsLoading", false);
      }
    },
    async getReviews({ commit }, collectionName) {
      try {
        commit("setIsLoading", true);
        const reviewsSnapshot = await getDocs(collection(db, collectionName));
        const reviewsList = [];
        reviewsSnapshot.docs.forEach((doc) => {
          reviewsList.push({ id: doc.id, ...doc.data() });
        });
        console.log("reviewsList", reviewsList);
        commit("setReviews", reviewsList);
      } catch (error) {
        console.error("Error getting reviews:", error);
      } finally {
        commit("setIsLoading", false);
        console.log("Reviews fetched");
      }
    },

    async getReviewsByMovieId({ commit }, { collectionName, movieId }) {
      try {
        commit("setIsLoading", true);
        const q = query(
          collection(db, collectionName),
          where("movieId", "==", movieId)
        );
        const querySnapshot = await getDocs(q);
        console.log("reviewsSnapshot", querySnapshot);
        const reviews = [];
        querySnapshot.forEach((doc) => {
          reviews.push({ id: doc.id, ...doc.data() });
        });
        commit("setReviews", reviews);
      } catch (error) {
        console.error("Error getting reviews:", error);
      } finally {
        commit("setIsLoading", false);
        console.log("Reviews fetched");
      }
    },

    async updateReview(
      { commit, state },
      { reviewId, collectionName, newComment }
    ) {
      try {
        commit("setIsLoading", true);
        console.log("state reviews", state.Reviews[0].id);
        console.log("reviewId", reviewId);
        const existingReviewIndex = state.Reviews.findIndex(
          (review) => review.id === reviewId
        );
        console.log("asdasdssssssssssss", state.Reviews);
        console.log("existingReviewIndex", existingReviewIndex);
        if (existingReviewIndex !== -1) {
          const updatedReviews = [...state.Reviews];
          updatedReviews[existingReviewIndex] = {
            ...state.Reviews[existingReviewIndex],
            comment: newComment,
            updatedAt: serverTimestamp(),
          };
          console.log("-----------updatedReviews", updatedReviews);
          commit("setReviews", updatedReviews);

          const reviewRef = doc(db, collectionName, reviewId);
          await updateDoc(reviewRef, {
            comment: newComment,
            updatedAt: serverTimestamp(),
          });
        } else {
          console.warn("Review not found in state.");
        }
      } catch (error) {
        console.error("Error updating review:", error);
      } finally {
        commit("setIsLoading", false);
        console.log("Review updated");
        console.log("updated state reviews", state.Reviews);
      }
    },
    async deleteReview({ commit, state }, { reviewId, collectionName }) {
      try {
        commit("setIsLoading", true);

        const existingReviewIndex = state.Reviews.findIndex(
          (review) => review.id === reviewId
        );

        if (existingReviewIndex !== -1) {
          const newState = state.Reviews.filter((_, index) => index !== existingReviewIndex);
          commit("setReviews", newState);
          const reviewRef = doc(db, collectionName, reviewId);
          await deleteDoc(reviewRef);
        } else {
          console.warn("Review not found in state.");
        }
      } catch (error) {
        console.error("Error deleting review:", error);
      } finally {
        commit("setIsLoading", false);
        console.log("Review deleted");
      }
    },
    async setReviewsStateToEmpty({ commit }) {
      commit("setReviews", []);
    },
  },
};
