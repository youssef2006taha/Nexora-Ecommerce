import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteProductApi } from "../../../api/products/productsApi";

export const deleteProductThunk = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    try {
      const result = await deleteProductApi(id);

      return {
        id,
        ...result,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
