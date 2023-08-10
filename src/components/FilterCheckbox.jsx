import React from "react";

function FilterCheckbox({ onCheckbox, handleFilterState, handleFilterStateSavedMovies }) {

  return (
    <label checked={handleFilterState || handleFilterStateSavedMovies} htmlFor='idCheckbox' className='filterCheckbox'>
      <input onChange={() => onCheckbox()} id='idCheckbox' type='checkbox' className='filterCheckbox__input'></input>
      <span className='filterCheckbox__span'>Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;