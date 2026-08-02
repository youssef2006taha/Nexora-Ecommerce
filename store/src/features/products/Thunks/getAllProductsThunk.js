import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsApi } from "../../../api/cart/cartApi";

export const getProductsThunk = createAsyncThunk(
  "products/getProducts",
  async (productsPerPage, { rejectWithValue }) => {
    try {
      const result = await getProductsApi({
        page: 1,
        limit: 500,
      });

      return {
        ...result,
        productsPerPage,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
