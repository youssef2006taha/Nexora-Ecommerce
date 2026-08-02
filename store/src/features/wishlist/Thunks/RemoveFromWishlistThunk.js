import { createAsyncThunk } from "@reduxjs/toolkit";
import { removeFromWishlistApi } from "../../../api/wishlist/wishlistApi";

export const RemoveFromWishlistThunk = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, thunkAPI) => {
    try {
      return await removeFromWishlistApi(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove from wishlist.",
      );
    }
  },
);
