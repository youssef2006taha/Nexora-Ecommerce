import { productRegex as regex } from "./productRegex";

export const validateProduct = (formData, isEditMode = false) => {
  const errors = {};

  if (!regex.name.test(formData.name.trim())) {
    errors.name = "Product name must be 3-100 valid characters.";
  }

  if (!regex.shortDescription.test(formData.shortDescription.trim())) {
    errors.shortDescription =
      "Short description must be 10-200 characters.";
  }

  if (!regex.description.test(formData.description.trim())) {
    errors.description = "Description must be 20-5000 characters.";
  }

  if (!regex.price.test(formData.price.toString().trim())) {
    errors.price = "Please enter a valid price.";
  } else if (+formData.price <= 0) {
    errors.price = "Price must be greater than 0.";
  }

  if (formData.discountPrice) {
    if (!regex.discountPrice.test(formData.discountPrice.toString().trim())) {
      errors.discountPrice = "Please enter a valid discount price.";
    } else if (+formData.discountPrice >= +formData.price) {
      errors.discountPrice = "Discount price must be less than price.";
    }
  }

  if (!regex.stock.test(formData.stock.toString().trim())) {
    errors.stock = "Please enter a valid stock quantity.";
  }

  if (!regex.sku.test(formData.sku.trim())) {
    errors.sku = "SKU must be 3-50 letters, numbers, _ or -.";
  }

  if (!regex.category.test(formData.category.trim())) {
    errors.category = "Please enter a valid category.";
  }

  if (!regex.subcategory.test(formData.subcategory.trim())) {
    errors.subcategory = "Please enter a valid subcategory.";
  }

  if (!regex.brand.test(formData.brand.trim())) {
    errors.brand = "Please enter a valid brand.";
  }

  if (
    !Array.isArray(formData.tags) ||
    formData.tags.length === 0 ||
    formData.tags.some((tag) => !regex.tags.test(tag.trim()))
  ) {
    errors.tags = "Tags must contain valid values.";
  }

  if (
    !isEditMode &&
    (!Array.isArray(formData.images) || formData.images.length === 0)
  ) {
    errors.images = "Please upload at least one image.";
  }

  return errors;
};