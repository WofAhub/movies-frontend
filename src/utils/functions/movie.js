import { DURATION_40, MOVIES_URL } from "../constants/constants";

// фильтрация по длительности фильма
export function filterShortMovies(arrayMovies) {
  return arrayMovies.filter((m) => m.duration <= DURATION_40);
}