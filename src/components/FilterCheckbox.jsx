import React from "react";

function FilterCheckbox() {
  return (
    <label htmlFor='idCheckbox' className='filterCheckbox'>
      <input id='idCheckbox' type='checkbox' className='filterCheckbox__input'></input>
      <span className='filterCheckbox__span'>Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;