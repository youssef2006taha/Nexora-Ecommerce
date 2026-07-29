import { createSlice } from "@reduxjs/toolkit";
import { GetWishlistThunk } from "./Thunks/GetWishlistThunk";
import { AddToWishlistThunk } from "./Thunks/AddToWishlistThunk";
import { RemoveFromWishlistThunk } from "./Thunks/RemoveFromWishlistThunk";

// =================== INITIAL STATE ===================
const initialState = {
  items: [],
  totalItems: 0,
  loading: false,
  error: null,
  success: false,
};

// =================== SLICE ===================
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  extraReducers: (builder) => {
    builder

      // =================== Get Wishlist ===================
      .addCase(GetWishlistThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(GetWishlistThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.totalItems = action.payload.totalProducts;
        state.items = action.payload.wishlist.products;
      })
      .addCase(GetWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload.message;
      })

      // =================== Add To Wishlist ===================
      .addCase(AddToWishlistThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(AddToWishlistThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.items = action.payload.wishlist.products;
        state.totalItems += 1;
      })
      .addCase(AddToWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // =================== Remove From Wishlist ===================
      .addCase(RemoveFromWishlistThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(RemoveFromWishlistThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.items = action.payload.wishlist.products;
        state.totalItems -= 1;
      })
      .addCase(RemoveFromWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
