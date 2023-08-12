// база
import { React, useState, useEffect } from 'react';
import FilterCheckbox from './FilterCheckbox';
import useForm from '../hooks/useForm';

function SearchForm({ onSubmit, toggleCheckbox, searchQuery, isShortSelected }) {

  const valuesDefault = {
    query: searchQuery,
    shortMovies: isShortSelected,
  }

  const [values, isValid, handleChange] = useForm(
    valuesDefault,
    !!searchQuery,
  );

  const [searchErrorMessage, setSearchErrorMessage] = useState('')

  useEffect(() => {
    if (values.shortMovies !== isShortSelected) {
      toggleCheckbox(values.shortMovies)
    }
  }, [values.shortMovies, toggleCheckbox, isShortSelected])

  useEffect(() => {
    if (isValid) {
      setSearchErrorMessage('')
    }
  }, [isValid]);

  function submit(evt) {
    evt.preventDefault();
    if (!isValid) {
      setSearchErrorMessage('Необходимо ввести название фильма')
      return;
    }
    onSubmit(values);
    console.log('yes')
  }

  return (
    <form onSubmit={submit} noValidate className='searchForm'>
      <fieldset className='searchForm__form'>
        <button type='submit' className='searchForm__submit-btn'>Поиск</button>
        <input
          className='searchForm__input'
          name='query'
          value={values.query}
          type='search'
          placeholder='Фильм'
          onChange={handleChange}
          required
        >
        </input>
        <FilterCheckbox
          name='checkboxFilter'
          checked={values.shortMovies}
          onChange={handleChange}
        />
      </fieldset>
      <span className='searchForm__span'>{searchErrorMessage}</span>
    </form>
  );
}

export default SearchForm;