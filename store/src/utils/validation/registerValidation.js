import { regex } from "../regex";

export const registerValidation = (formData) => {
  const errors = {};

  if (!formData?.username?.trim()) {
    errors.username = "Username is required.";
  } else if (!regex.username.test(formData.username)) {
    errors.username =
      "Username must be 3-20 characters and can contain letters, numbers, '.' or '_'.";
  }

  if (!formData?.email?.trim()) {
    errors.email = "Email is required.";
  } else if (!regex.email.test(formData.email)) {
    errors.email = "Invalid email address.";
  }

  if (!formData?.phone?.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!regex.phone.test(formData.phone)) {
    errors.phone = "Invalid phone number.";
  }

  if (!formData.password) {
    errors.password = "Password is required.";
  } else if (!regex.password.test(formData.password)) {
    errors.password = "Password must be at least 6 characters.";
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};
