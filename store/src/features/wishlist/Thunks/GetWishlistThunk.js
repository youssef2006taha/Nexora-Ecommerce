import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetWishlistThunk = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;

    try {
      const res = await axios.get(
        "https://e-commerce-api-3wara.vercel.app/wishlists/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to get wishlist.",
      );
    }
  },
);
