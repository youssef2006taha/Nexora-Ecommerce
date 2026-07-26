import { regex } from "../regex";

export const addressValidation = (formData) => {
  const errors = {};

  if (!formData?.country?.trim()) {
    errors.country = "Country is required.";
  } else if (!regex?.country?.test(formData?.country)) {
    errors.country = "Invalid country.";
  }

  if (!formData?.city?.trim()) {
    errors.city = "City is required.";
  } else if (!regex?.city?.test(formData?.city)) {
    errors.city = "Invalid city.";
  }

  if (!formData?.street?.trim()) {
    errors.street = "Street is required.";
  } else if (!regex?.street?.test(formData?.street)) {
    errors.street = "Invalid street.";
  }

  if (!formData?.building?.trim()) {
    errors.building = "Building is required.";
  } else if (!regex?.building?.test(formData?.building)) {
    errors.building = "Invalid building.";
  }

  if (!formData?.postalCode?.trim()) {
    errors.postalCode = "Postal code is required.";
  } else if (!regex?.postalCode?.test(formData?.postalCode)) {
    errors.postalCode = "Invalid postal code.";
  }

  return errors;
};
