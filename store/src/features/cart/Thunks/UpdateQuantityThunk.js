import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateQuantityApi } from "../../../api/cart/cartApi";

export const UpdateQuantityThunk = createAsyncThunk(
  "cart/updateQuantity",
  async (cartItem, thunkAPI) => {
    try {
      return await updateQuantityApi(cartItem);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update cart.",
      );
    }
  },
);
