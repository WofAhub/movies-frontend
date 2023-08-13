import React from "react";

function FilterCheckbox({ checked, onChange, name }) {

  return (
    <label htmlFor='checkboxId' className='filterCheckbox'>
      <input
        checked={checked}
        onChange={onChange}
        name={name}
        id='checkboxId'
        type='checkbox'
        className='filterCheckbox__input'
      />
      <span className='filterCheckbox__span'>Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;