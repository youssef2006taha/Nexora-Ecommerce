import { regex } from "../regex";

export const loginValidation = (formData) => {
  const errors = {};

  if (!regex.email.test(formData.email)) {
    errors.email = "Invalid email.";
  }

  if (!regex.password.test(formData.password)) {
    errors.password = "Min. 6 characters.";
  }

  return errors;
};
