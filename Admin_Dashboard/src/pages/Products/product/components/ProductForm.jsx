import React from "react";

// Components
import ProductGallerySection from "./ProductGallerySection";
import ProductFormDetails from "./productFormDetails";

const ProductForm = ({
  loading,
  errors,
  errorsChange,
  submitHandler,
  formData,
  formDataChange,
  removedImages,
  mode,
  onClose,
}) => {
  return (
    <div
      className={`flex flex-col ${mode === "quick-edit" ? "p-4" : "p-4 sm:p-8"} text-text-primary`}
    >
      <form
        className={`grid grid-cols-1 ${
          mode === "quick-edit" ? "lg:grid-cols-2" : "md:grid-cols-2"
        } items-start gap-8`}
      >
        <ProductGallerySection
          formData={formData}
          errors={errors}
          errorsChange={errorsChange}
          formDataChange={formDataChange}
          removedImages={removedImages}
          mode={mode}
        />

        <ProductFormDetails
          loading={loading}
          errors={errors}
          errorsChange={errorsChange}
          submitHandler={submitHandler}
          formData={formData}
          formDataChange={formDataChange}
          mode={mode}
          onClose={onClose}
        />
      </form>
    </div>
  );
};

export default React.memo(ProductForm);
