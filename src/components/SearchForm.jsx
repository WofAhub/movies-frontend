// база
import { React, useState } from 'react';
import FilterCheckbox from './FilterCheckbox';

function SearchForm() {

  const [seach, setSeach] = useState('');

  return (
    <section className='searchForm'>
      <form noValidate className='searchForm__form'>
        <button type='submit' className='searchForm__submit-btn'>Поиск</button>
        <input
          type='search'
          className='searchForm__input'
          placeholder='Фильм'
          value={seach}
          onChange={(e) => setSeach(e.target.value)}
        >
        </input>
      </form>
      <FilterCheckbox />
      <span className='searchForm__span'></span>
    </section>
  );
}

export default SearchForm;