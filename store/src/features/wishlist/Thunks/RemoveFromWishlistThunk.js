import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axios";

export const RemoveFromWishlistThunk = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/wishlists/remove/${productId}`);
      return productId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove item from wishlist"
      );
    }
  }
);