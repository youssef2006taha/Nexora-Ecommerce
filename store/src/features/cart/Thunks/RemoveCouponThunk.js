import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const RemoveCouponThunk = createAsyncThunk(
  "cart/removeCoupon",
  async (_, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;

    try {
      const res = await axios.delete(
        "https://e-commerce-api-3wara.vercel.app/carts/coupon",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove coupon.",
      );
    }
  },
);
