import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteFromCartApi } from "../../../api/cart/cartApi";

export const DeleteFromCartThunk = createAsyncThunk(
  "cart/deleteProduct",
  async (id, thunkAPI) => {
    try {
      return await deleteFromCartApi(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove product from cart.",
      );
    }
  },
);
