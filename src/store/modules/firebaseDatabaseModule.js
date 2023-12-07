// firebaseDatabaseModule.js
import { db } from "@/firebase/config.js";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default {
  namespaced: true,
  state: {
    Reviews: [],
    isLoading: false,
  },
  mutations: {
    setReviews(state, payload) {
      state.Reviews.push(payload);
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
    async addReview({ commit }, obj) {
      try {
        commit("setIsLoading", true);
        console.log("collectionName:", obj.collectionName);
        const reviewsCollectionRef = collection(
          db,
          obj.collectionName.toString()
        );
        obj.data.createdAt = serverTimestamp();
        await addDoc(reviewsCollectionRef, obj.data);
        commit("setReviews", obj.data);
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
        const reviewsCollectionRef = collection(db, collectionName);
        const reviewsSnapshot = await reviewsCollectionRef.get();
        reviewsSnapshot.forEach((doc) => {
          commit("setReviews", doc.data());
        });
      } catch (error) {
        console.error("Error getting reviews:", error);
      } finally {
        commit("setIsLoading", false);
        console.log("Reviews fetched");
        console.log("Reviews:", this.state.Reviews);
      }
    },
  },
};
