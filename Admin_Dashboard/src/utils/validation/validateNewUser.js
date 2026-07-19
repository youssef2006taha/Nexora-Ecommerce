import { regex } from "../regex";

export const validateNewUser = (newUserData) => {
  const errors = {};

  if (!regex.username.test(newUserData?.username?.trim())) {
    errors.username = "Invalid username.";
  }

  if (!regex.email.test(newUserData?.email?.trim())) {
    errors.email = "Invalid email.";
  }

  if (!regex.password.test(newUserData?.password)) {
    errors.password = "Min. 6 characters.";
  }

  if (!regex.phone.test(newUserData?.phone?.trim())) {
    errors.phone = "Invalid phone number.";
  }

  return errors;
};
