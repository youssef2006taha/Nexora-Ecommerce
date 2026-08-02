import { createAsyncThunk } from "@reduxjs/toolkit";
import { addProductApi } from "../../../api/products/productsApi";

export const addProductThunk = createAsyncThunk(
  "products/addProduct",
  async (productData, thunkAPI) => {
    try {
      const formData = new FormData();

      formData.append("name", productData.name.trim());
      formData.append("shortDescription", productData.shortDescription.trim());
      formData.append("description", productData.description.trim());
      formData.append("price", String(productData.price));
      formData.append("discountPrice", String(productData.discountPrice || 0));
      formData.append("stock", String(productData.stock));
      formData.append("sku", productData.sku.trim());
      formData.append("category", productData.category);
      formData.append("subcategory", productData.subcategory.trim());
      formData.append("brand", productData.brand.trim());

      formData.append("featured", String(productData.featured));
      formData.append("isActive", String(productData.isActive));

      productData.tags.forEach((tag) => {
        formData.append("tags", tag);
      });

      productData.images.forEach((image) => {
        formData.append("images", image.file);
      });

      return await addProductApi(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);
