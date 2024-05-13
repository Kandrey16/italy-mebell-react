import { useState } from "react";
// Кастомный хук для валидации формы
const useFormValidation = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  // Функция для обновления значений и сброса ошибок
  const handleChange = (field, value) => {
    setValues({ ...values, [field]: value });
    // при изменении значения поля сразу убираем сообщение об ошибке
    setErrors({ ...errors, [field]: value.trim() ? "" : errors[field] });
  };
  // Функция для валидации полей, возвращающая признак успешности валидации
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;
    // проверка каждого поля в values
    for (const [field, value] of Object.entries(values)) {
      if (!value.trim()) {
        newErrors[field] = "Это поле не может быть пустым.";
        isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  };
  // Функция для сброса формы к исходным значениям
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    validateForm,
    resetForm,
  };
};

export default useFormValidation;