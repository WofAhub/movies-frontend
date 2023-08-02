import { MOVIES_URL } from "./constants.js";
import checkAnswerFromServer from './function/function.js';

// получить фильмы
export async function getMovies() {
  const res = await fetch(MOVIES_URL);
  return checkAnswerFromServer(res);
}