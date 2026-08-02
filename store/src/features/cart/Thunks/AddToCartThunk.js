import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToCartApi } from "../../../api/cart/cartApi";

export const AddToCartThunk = createAsyncThunk(
  "cart/addProduct",
  async ({ id, quantity = 1 }, thunkAPI) => {
    try {
      return await addToCartApi({ id, quantity });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add product to cart.",
      );
    }
  },
);
