import { regex } from "../regex";

export const makeOrderValidation = (formData) => {
  const errors = {};

  // Full Name
  if (!formData.fullName.trim()) {
    errors.fullName = "Full name is required.";
  } else if (!regex.fullName.test(formData.fullName)) {
    errors.fullName = "Invalid full name.";
  }

  // Phone
  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!regex.phone.test(formData.phone)) {
    errors.phone = "Invalid phone number.";
  }

  // Country
  if (!formData.country.trim()) {
    errors.country = "Country is required.";
  } else if (!regex.country.test(formData.country)) {
    errors.country = "Invalid country.";
  }

  // City
  if (!formData.city.trim()) {
    errors.city = "City is required.";
  } else if (!regex.city.test(formData.city)) {
    errors.city = "Invalid city.";
  }

  // Address
  if (!formData.address.trim()) {
    errors.address = "Address is required.";
  } else if (!regex.address.test(formData.address)) {
    errors.address = "Invalid address.";
  }

  // Postal Code
  if (!formData.postalCode.trim()) {
    errors.postalCode = "Postal code is required.";
  } else if (!regex.postalCode.test(formData.postalCode)) {
    errors.postalCode = "Invalid postal code.";
  }

  return errors;
};
