import { createSlice } from "@reduxjs/toolkit";
import { AddToCartThunk } from "./Thunks/AddToCartThunk";
import { GetMyCartThunk } from "./Thunks/GetMyCartThunk";

// =================== INITIAL STATE ===================
const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
  subTotalPrice: 0,
  discountAmount: 0,
  loading: false,
  error: null,
  success: false,
};

// =================== SLICE ===================
const cartSlice = createSlice({
  name: "cart",
  initialState,

  extraReducers: (builder) => {
    builder

      // =================== Get My Cart ===================
      .addCase(GetMyCartThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(GetMyCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.cartItems = action.payload.items;
        state.totalQuantity = action.payload.itemCount;
        state.discountAmount = action.payload.discountAmount;
        state.subTotalPrice = action.payload.subtotal;
        state.totalPrice = action.payload.total;
      })
      .addCase(GetMyCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload.message;
      })

      // =================== Add To Cart ===================
      .addCase(AddToCartThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(AddToCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.cartItems = action.payload.items;
        state.totalQuantity = action.payload.itemCount;
        state.discountAmount = action.payload.discountAmount;
        state.subTotalPrice = action.payload.subtotal;
        state.totalPrice = action.payload.total;
      })
      .addCase(AddToCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload.message;
      });
  },
});

export default cartSlice.reducer;
