import React from "react";

function FilterCheckbox({ checked, onChange, name }) {

  return (
    <label htmlFor='checkbox' className='filterCheckbox'>
      <input
        name={name}
        checked={checked}
        id='checkbox'
        type='checkbox'
        className='filterCheckbox__input'
        onChange={onChange}
      />
      <span className='filterCheckbox__span'>Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;