// база
import { React, useState, useEffect } from 'react';
import FilterCheckbox from './FilterCheckbox';
import useForm from '../hooks/useForm';

function SearchForm({ onSubmit, toggleCheckbox, searchQuery, isShortSelected }) {

  const valuesDefault = {
    query: searchQuery,
    checkbox: isShortSelected,
  }
  const [searchErrorMessage, setSearchErrorMessage] = useState('')

  const [values, isValid, handleChange] = useForm(
    valuesDefault,
    !!searchQuery,
  )

  useEffect(() => {
    if (values.checkbox !== isShortSelected) {
      toggleCheckbox(values.checkbox)
    }
  }, [values.checkbox, toggleCheckbox, isShortSelected])



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
    } else {
      onSubmit(values);
    }
  }

  return (
    <>
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
        </fieldset>
        <FilterCheckbox
          name='filterCheckbox'
          checked={values.checkbox}
          onChange={handleChange}
        />
        <span className='searchForm__span'>{searchErrorMessage}</span>
      </form>
    </>
  );
}

export default SearchForm;