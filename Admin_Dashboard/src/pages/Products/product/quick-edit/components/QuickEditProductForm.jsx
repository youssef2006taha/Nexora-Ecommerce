import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import ProductForm from "../../components/ProductForm.jsx";
import { validateProduct } from "../../../../../utils/validation/validateProduct.js";

// Thunks
import { updateProductThunk } from "../../../../../features/products/Thunks/UpdateProductThunk.js";
import { showToast } from "../../../../../features/Toast/toastSlice.js";

const QuickEditProductDialog = ({ product, onClose }) => {
  const saveProductChangeDispatch = useDispatch();
  const toastDispatch = useDispatch();

  // Loading Indicator
  const [loading, setLoading] = useState(false);

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

  // Change Form State
  const formDataChange = (newValue) => {
    setFormData(newValue);
  };

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

  // Change Form Fields Validation Errors
  const errorsChange = (newValue) => {
    setErrors(newValue);
  };

  // contain public_ids for Deleted Image
  const removedImages = useRef([]);

  useEffect(() => {
    const setProductData = (productData) => {
      setFormData({
        name: productData.name,
        shortDescription: productData.shortDescription,
        description: productData.description,
        price: productData.price,
        discountPrice: productData.discountPrice,
        stock: productData.stock,
        sku: productData.sku,
        category: productData.category,
        subcategory: productData.subcategory,
        brand: productData.brand,
        tags: productData.tags,
        featured: productData.featured,
        isActive: productData.isActive,
        images: productData.images.map((image) => ({
          ...image,
          id: uuidv4(),
          isNew: false,
        })),
      });
    };

    setProductData(product);

    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const validationErrors = validateProduct(formData, false);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      await saveProductChangeDispatch(
        updateProductThunk({
          productData: {
            ...formData,
            deletedImages: removedImages.current,
          },
          id: product._id,
        }),
      ).unwrap();

      toastDispatch(
        showToast({
          message: "Product Updated Successfully",
          severity: "success",
        }),
      );

      onClose();
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
    <ProductForm
      loading={loading}
      errors={errors}
      errorsChange={errorsChange}
      formData={formData}
      formDataChange={formDataChange}
      submitHandler={submitHandler}
      removedImages={removedImages}
      mode="quick-edit"
      onClose={onClose}
    />
  );
};

export default React.memo(QuickEditProductDialog);
