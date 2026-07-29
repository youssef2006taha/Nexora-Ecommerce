import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const RemoveFromWishlistThunk = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;

    try {
      const res = await axios.delete(
        `https://e-commerce-api-3wara.vercel.app/wishlists/remove/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove from wishlist.",
      );
    }
  },
);
