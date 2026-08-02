import { createAsyncThunk } from "@reduxjs/toolkit";
import { applyCouponApi } from "../../../api/cart/cartApi";

export const ApplyCouponThunk = createAsyncThunk(
  "cart/applyCoupon",
  async (coupon, thunkAPI) => {
    try {
      return await applyCouponApi(coupon);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to apply coupon.",
      );
    }
  },
);
