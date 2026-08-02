import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToWishlistApi } from "../../../api/wishlist/wishlistApi";

export const AddToWishlistThunk = createAsyncThunk(
  "wishlist/addWishlist",
  async (id, thunkAPI) => {
    try {
      return await addToWishlistApi(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add product to wishlist.",
      );
    }
  },
);
