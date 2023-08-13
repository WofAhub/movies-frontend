import { RESULT_MESSAGE } from '../utils/constants/constants';
import MoviesCardList from './MoviesCardList';
import Preloader from './Preloader';

function MessageError({ messageError }) {
  return (
    <p className='notFoundMessage'>{messageError}</p>
  )
}

function SearchResults({
  loading,
  foundMovies,
  savedMovies,
  onBtnOfMovie,
  isAnErrorHasOccured,
  onSavedPage = false,
  moviesList,
}) {
  return isAnErrorHasOccured ? (
    <MessageError messageError={RESULT_MESSAGE.SOMETHING_WRONG} />
  ) : loading ? (
    <Preloader />
  ) : foundMovies.length === 0 ? (
    <MessageError messageError={RESULT_MESSAGE.NOTHING_FOUND} />
  ) : (
    <MoviesCardList
      foundMovies={foundMovies}
      savedMovies={savedMovies}
      onBtnOfMovie={onBtnOfMovie}
      onSavedPage={onSavedPage}
      moviesList={moviesList}
    />
  );
}

export default SearchResults;
