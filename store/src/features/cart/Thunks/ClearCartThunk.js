import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearCartApi } from "../../../api/cart/cartApi";

export const ClearCartThunk = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    try {
      return await clearCartApi();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to clear cart.",
      );
    }
  },
);
