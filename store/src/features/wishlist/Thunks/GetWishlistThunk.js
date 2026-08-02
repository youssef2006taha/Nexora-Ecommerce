import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWishlistApi } from "../../../api/wishlist/wishlistApi";

export const GetWishlistThunk = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, thunkAPI) => {
    try {
      return await getWishlistApi();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to get wishlist.",
      );
    }
  },
);
