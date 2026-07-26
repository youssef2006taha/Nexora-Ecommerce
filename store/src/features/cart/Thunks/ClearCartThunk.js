import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const ClearCartThunk = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;

    try {
      const res = await axios.delete(
        "https://e-commerce-api-3wara.vercel.app/carts/clear",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to clear cart."
      );
    }
  }
);