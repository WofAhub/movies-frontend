import React from "react";

export default function useForm(initialValues = {}, initialIsValid = false) {
  const [values, setValues] = React.useState(initialValues);
  const [isValid, setIsValid] = React.useState(initialIsValid);

  function handleChange(event) {
    const input = event.target;
    const name = input.name;
    const value = input.type === 'checkbox' ? input.checked : input.value;

    setValues((values) => ({ ...values, [name]: value }));
    setIsValid(input.closest('form').checkValidity());
  }

  return [values, isValid, handleChange];
}