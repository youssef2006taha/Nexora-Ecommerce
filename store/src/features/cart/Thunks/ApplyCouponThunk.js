import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const ApplyCouponThunk = createAsyncThunk(
  "cart/applyCoupon",
  async (coupon, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;

    try {
      const res = await axios.post(
        "https://e-commerce-api-3wara.vercel.app/carts/coupon",
        coupon,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to apply coupon.",
      );
    }
  },
);
