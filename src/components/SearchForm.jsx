// база
import { React, useState, useEffect } from 'react';
import FilterCheckbox from './FilterCheckbox';
import useForm from '../hooks/useForm';

function SearchForm({
  onSubmit,
  toggleCheckbox,
  defaultSearchQuery,
  defaultMoviesSelected
}) {

  const valuesDefault = {
    searchQuery: defaultSearchQuery,
    isShortMoviesSelected: defaultMoviesSelected,
  }
  const [searchErrorMessage, setSearchErrorMessage] = useState('')

  const [values, isValid, handleChange] = useForm(
    valuesDefault,
    !!defaultSearchQuery,
  )

  useEffect(() => {
    if (values.isShortMoviesSelected !== defaultMoviesSelected) {
      toggleCheckbox(values.isShortMoviesSelected)
    }
  }, [values.isShortMoviesSelected, toggleCheckbox, defaultMoviesSelected])

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
  }

  return (
    <>
      <form onSubmit={submit} noValidate className='searchForm'>
        <fieldset className='searchForm__form'>
          <button type='submit' className='searchForm__submit-btn'>Поиск</button>
          <input
            className='searchForm__input'
            name='searchQuery'
            value={values.searchQuery}
            type='search'
            placeholder='Фильм'
            onChange={handleChange}
            required
          >
          </input>
        </fieldset>
        <FilterCheckbox
          name='isShortMoviesSelected'
          checked={values.isShortMoviesSelected}
          onChange={handleChange}
        />
        <span className='searchForm__span'>{searchErrorMessage}</span>
      </form>
    </>
  );
}

export default SearchForm;