import { useState } from 'react';

export default function useForm(initialValues = {}, initialIsValid = false) {
  const [values, setValues] = useState(initialValues);
  const [isValid, setIsValid] = useState(initialIsValid);

  function handleChange(evt) {
    const input = evt.target;
    const name = input.name;
    const value = input.type === 'checkbox' ? input.checked : input.value;

    setValues((values) => ({ ...values, [name]: value }));
    setIsValid(input.closest('form').checkValidity());
  }

  return [values, isValid, handleChange];
}