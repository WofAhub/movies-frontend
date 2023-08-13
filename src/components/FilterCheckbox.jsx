import React from "react";

function FilterCheckbox({ onChange, checked, name, disabled }) {

  return (
    <label htmlFor='checkboxId' className='filterCheckbox'>
      <input
        name={name}
        id='checkboxId'
        type='checkbox'
        className='filterCheckbox__input'
        onChange={onChange}
        disabled={disabled}
        checked={checked}
      />
      <span className='filterCheckbox__span'>Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;