import { createAsyncThunk } from "@reduxjs/toolkit";
import { removeCouponApi } from "../../../api/cart/cartApi";

export const RemoveCouponThunk = createAsyncThunk(
  "cart/removeCoupon",
  async (_, thunkAPI) => {
    try {
      return await removeCouponApi();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove coupon.",
      );
    }
  },
);
