import { regex } from "../regex";

export const forgotPasswordValidation = (email) => {
  let errors = "";

  if (!regex.email.test(email)) {
    errors = "Invalid email.";
  }

  return errors;
};
