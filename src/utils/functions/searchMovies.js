import { DURATION_40 } from "../constants/constants";

function searchMovies(movies, query, checkbox) {
    if (!movies.length) return movies;

    let foundMovies = movies;

    if (checkbox) {
        foundMovies = foundMovies.filter(
            (movie) => movie.duration <= DURATION_40,
        );
    }

    foundMovies = foundMovies.filter(
        (movie) =>
            movie.nameRU.toString().toLowerCase().includes(query.toLowerCase()) ||
            movie.nameEN.toString().toLowerCase().includes(query.toLowerCase())
    );

    return foundMovies;
}

export default searchMovies;