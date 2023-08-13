import { useState } from 'react';

export default function useForm(value = {}, valid = false) {
  const [values, setValues] = useState(value);
  const [isValid, setIsValid] = useState(valid);

  function handleChange(evt) {
    const input = evt.target;
    const name = input.name;
    const value = input.type === 'checkbox' ? input.checked : input.value;

    setValues((values) => ({ ...values, [name]: value }));
    setIsValid(evt.target.closest('form').checkValidity());
  }

  return [values, isValid, handleChange];
}