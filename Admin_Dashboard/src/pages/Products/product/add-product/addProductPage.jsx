import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { validateProduct } from "../../../../utils/validation/validateProduct.js";
import ProductForm from "../components/ProductForm.jsx";
import CreateProductPage from "../components/ProductCard.jsx";

// Thunks
import { addProductThunk } from "../../../../features/products/Thunks/AddProductThunk.js";
import { showToast } from "../../../../features/Toast/toastSlice.js";

const AddProductPage = () => {
  const createProductDispatch = useDispatch();
  const toastDispatch = useDispatch();

  // Loading Indicator
  const [loading, setLoading] = useState(false);

  // Form Fields Validation Errors
  const [errors, setErrors] = useState({
    name: "",
    shortDescription: "",
    description: "",
    price: "",
    discountPrice: "",
    stock: "",
    sku: "",
    category: "",
    subcategory: "",
    brand: "",
    tags: "",
    images: "",
  });

  // Initial Values
  const FormDataInitial = {
    name: "",
    shortDescription: "",
    description: "",
    price: 0,
    discountPrice: 0,
    stock: 0,
    sku: "",
    category: "",
    subcategory: "",
    brand: "",
    tags: [],
    featured: false,
    isActive: false,
    images: [],
  };

  // Form State
  const [formData, setFormData] = useState(FormDataInitial);

  const formDataChange = (newValue) => {
    setFormData(newValue);
  };

  const errorsChange = (newValue) => {
    setErrors(newValue);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const validationErrors = validateProduct(formData, false);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      await createProductDispatch(addProductThunk(formData)).unwrap();
      setFormData(FormDataInitial);

      toastDispatch(
        showToast({
          message: "Product Added Successfully",
          severity: "success",
        }),
      );
    } catch (error) {
      if (error?.message?.includes("duplicate key")) {
        toastDispatch(
          showToast({
            message: "This product already exists",
            severity: "error",
          }),
        );
      } else if (error?.errors?.includes('"tags" must be an array')) {
        toastDispatch(
          showToast({
            message: "Please add at least 2 tags.",
            severity: "error",
          }),
        );
      } else {
        toastDispatch(
          showToast({
            message: error?.message || "Something went wrong",
            severity: "error",
          }),
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <CreateProductPage />

      <ProductForm
        loading={loading}
        errors={errors}
        errorsChange={errorsChange}
        formData={formData}
        formDataChange={formDataChange}
        submitHandler={submitHandler}
        mode="add"
      />
    </div>
  );
};

export default React.memo(AddProductPage);
