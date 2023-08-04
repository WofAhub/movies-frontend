import { MOVIES_URL } from './constants/constants';
import checkAnswerFromServer from './function/function.js';

// получить фильмы
export function getMovies() {
  return fetch(`${MOVIES_URL}`)
    .then((res) => {
      return checkAnswerFromServer(res)
    })
}