// база
import React from 'react';
import FilterCheckbox from './FilterCheckbox';

function SearchForm({ values, setValues }) {

  return (
    <section className='searchForm'>
      <form noValidate className='searchForm__form'>
        <button type='submit' className='searchForm__submit-btn'>Поиск</button>
        <input
          type='search'
          className='searchForm__input'
          placeholder='Фильм'
          value={values}
          onChange={(evt) => setValues(evt.target.value)}
        >
        </input>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;