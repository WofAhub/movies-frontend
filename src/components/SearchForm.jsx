import React from 'react';
import FilterCheckbox from './FilterCheckbox';

function SearchForm() {
  return (
    <section className='searchForm'>
      <form novalidate className='searchForm__form'>
        <button type='submit' className='searchForm__submit-btn'>Поиск</button>
        <input type='search' className='searchForm__input' placeholder='Фильм'></input>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;