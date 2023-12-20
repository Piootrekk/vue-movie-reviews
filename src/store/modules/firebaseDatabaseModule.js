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
  Timestamp,
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
    },
  },
  getters: {
    getReviews(state) {
      return state.Reviews;
    },
    getIsLoading(state) {
      return state.isLoading;
    },
    getReviewsOrderedByDate(state) {
      return state.Reviews.sort(
        (a, b) => b.createdAt.seconds - a.createdAt.seconds
      );
    },
  },
  actions: {
    async addDocument({ commit }, { collectionName, data }) {
      try {
        commit("setIsLoading", true);
        const reviewsCollectionRef = collection(db, collectionName);
        commit("pushReview", {
          // Kiedyś tu będzie desynchro z firebase Timestamp.now vs serverTimestamp() ~52
          createdAt: Timestamp.now(),
          ...data,
        });
        data.createdAt = serverTimestamp();
        await addDoc(reviewsCollectionRef, data);
      } catch (error) {
        console.error("Error adding review:", error);
      } finally {
        commit("setIsLoading", false);
      }
    },
    async getDocument({ commit }, collectionName) {
      try {
        commit("setIsLoading", true);
        const reviewsSnapshot = await getDocs(collection(db, collectionName));
        const reviewsList = [];
        reviewsSnapshot.docs.forEach((doc) => {
          reviewsList.push({ id: doc.id, ...doc.data() });
        });
        commit("setReviews", reviewsList);
      } catch (error) {
        console.error("Error getting reviews:", error);
      } finally {
        commit("setIsLoading", false);
      }
    },

    async getDocumentByMovieId({ commit }, { collectionName, movieId }) {
      try {
        commit("setIsLoading", true);
        if (movieId.length > 0) {
          const q = query(
            collection(db, collectionName),
            where("movieId", "in", movieId)
          );
          const querySnapshot = await getDocs(q);
          const reviews = [];
          querySnapshot.forEach((doc) => {
            reviews.push({ id: doc.id, ...doc.data() });
          });
          commit("setReviews", reviews);
        }
      } catch (error) {
        console.error("Error getting reviews:", error);
      } finally {
        commit("setIsLoading", false);
      }
    },

    async updateDocument(
      { commit, state },
      { reviewId, collectionName, newComment }
    ) {
      try {
        commit("setIsLoading", true);
        const existingReviewIndex = state.Reviews.findIndex(
          (review) => review.id === reviewId
        );
        if (existingReviewIndex !== -1) {
          const updatedReviews = [...state.Reviews];
          updatedReviews[existingReviewIndex] = {
            ...state.Reviews[existingReviewIndex],
            comment: newComment,
            updatedAt: serverTimestamp(),
          };
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
      }
    },
    async deleteDocument({ commit, state }, { reviewId, collectionName }) {
      try {
        commit("setIsLoading", true);

        const existingReviewIndex = state.Reviews.findIndex(
          (review) => review.id === reviewId
        );

        if (existingReviewIndex !== -1) {
          const newState = state.Reviews.filter(
            (_, index) => index !== existingReviewIndex
          );
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
      }
    },
    async setReviewsStateToEmpty({ commit }) {
      commit("setReviews", []);
    },
  },
};
