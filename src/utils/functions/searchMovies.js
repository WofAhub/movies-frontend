import { DURATION_40 } from "../constants/constants";

function searchMovies(movies, searchText, areShortiesSeleted) {
  if (!movies.length) return movies;
  let foundMovies = movies;

  if (areShortiesSeleted) {
    foundMovies = foundMovies.filter(
      (movie) => movie.duration <= DURATION_40,
    );
  }

  foundMovies = foundMovies.filter((movie) =>
    movie.nameRU.toLowerCase().includes(searchText.toLowerCase()),
  );

  return foundMovies;
}

export default searchMovies;