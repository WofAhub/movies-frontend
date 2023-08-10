// база
import { React, useState, useRef, useEffect } from 'react';
import FilterCheckbox from './FilterCheckbox';

function SearchForm({ onSearch, onCheckbox, handleFilterState }) {

  const [seachQuery, setSeachQuery] = useState('');
  const [searchErrorMessage, setSearchErrorMessage] = useState('')
  const [isValid, setIsValid] = useState(false);

  const handleMovieSearch = (evt) => {
    setSeachQuery(evt.target.value);
    if (evt.target.value.length < 1) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!isValid) {
      setSearchErrorMessage('Нужно ввести ключевое слово');
    }
    else {
      setSearchErrorMessage('');
      onSearch(seachQuery);
      localStorage.setItem('searchQuery', seachQuery)
    }
  }

  const localStorageSearchQuery = localStorage.getItem('searchQuery') || ''
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.value = localStorageSearchQuery || '';
  }, [localStorageSearchQuery]);

  return (
    <section className='searchForm'>
      <form id='search-form' onSubmit={handleSubmit} noValidate className='searchForm__form'>
        <button type='submit' className='searchForm__submit-btn'>Поиск</button>
        <input
          id='search-input'
          ref={inputRef}
          type='search'
          className='searchForm__input'
          placeholder='Фильм'
          name="movie"
          onChange={(evt) => handleMovieSearch(evt)}
        >
        </input>
      </form>
      <FilterCheckbox
        onCheckbox={onCheckbox}
        handleFilterState={handleFilterState}
      />
      <span className='searchForm__span'>{searchErrorMessage}</span>
    </section>
  );
}

export default SearchForm;