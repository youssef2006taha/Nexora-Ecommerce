import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateProductApi } from "../../../api/products/productsApi";

export const updateProductThunk = createAsyncThunk(
  "products/updateProduct",
  async ({ productData, id }, thunkAPI) => {
    try {
      const formData = new FormData();

      formData.append("name", productData?.name?.trim());
      formData.append(
        "shortDescription",
        productData?.shortDescription?.trim(),
      );
      formData.append("description", productData?.description?.trim());
      formData.append("price", String(productData?.price));
      formData.append("discountPrice", String(productData?.discountPrice || 0));
      formData.append("stock", String(productData?.stock));
      formData.append("sku", productData?.sku?.trim());
      formData.append("category", productData?.category);
      formData.append("subcategory", productData?.subcategory?.trim());
      formData.append("brand", productData?.brand?.trim());

      formData.append("featured", String(productData?.featured));
      formData.append("isActive", String(productData?.isActive));

      productData.tags.forEach((tag) => {
        formData.append("tags", tag);
      });

      productData.images
        .filter((image) => image?.isNew)
        .forEach((image) => {
          formData.append("images", image.file);
        });

      formData.append(
        "deletedImages",
        JSON.stringify(productData?.deletedImages || []),
      );

      return await updateProductApi(id, formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);
