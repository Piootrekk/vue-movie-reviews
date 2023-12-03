import { useStore } from "vuex";

export default async function movieDetailsMiddleware(to, from, next) {
  const store = useStore();
  const movieId = to.params.id;
  await store.dispatch("movieApiModule/fetchmovieDetails", movieId);

  const movieDetails = store.getters["movieApiModule/selectedMovie"];
  if (movieDetails && movieDetails.Response === "False") {
    next({ name: "NotFound" });
  } else {
    next();
  }
}
