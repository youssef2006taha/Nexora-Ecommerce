import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyCartApi } from "../../../api/cart/cartApi";

export const GetMyCartThunk = createAsyncThunk(
  "cart/getMyCart",
  async (_, thunkAPI) => {
    try {
      return await getMyCartApi();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to get cart.",
      );
    }
  },
);
