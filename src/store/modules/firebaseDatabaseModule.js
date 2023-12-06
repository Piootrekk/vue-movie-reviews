// firebaseDatabaseModule.js

export default {
  namespaced: true,
  state: {
    userReviews: [],
    userFavorites: [],
    userWatchlist: [],
    userWatched: [],
    userRatings: [],
  },
  getters: {
    getUserReviews: (state) => state.userReviews,
    getUserFavorites: (state) => state.userFavorites,
    getUserWatchlist: (state) => state.userWatchlist,
    getUserWatched: (state) => state.userWatched, 
    getUserRatings: (state) => state.userRatings,
  },
  mutations: {
    setUserReviews(state, payload) {
      state.userReviews = payload;
    },
    setUserFavorites(state, payload) {
      state.userFavorites = payload;
    },
    setUserWatchlist(state, payload) {
      state.userWatchlist = payload;
    },
    setUserWatched(state, payload) {
      state.userWatched = payload;
    },
    setUserRatings(state, payload) {
      state.userRatings = payload;
    },
  },
  actions: {},
};
