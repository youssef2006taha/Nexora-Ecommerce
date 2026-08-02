import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductByIdApi } from "../../../api/products/productsApi";

export const getProductByIdThunk = createAsyncThunk(
  "products/getProductById",
  async (id, thunkAPI) => {
    try {
      return await getProductByIdApi(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
