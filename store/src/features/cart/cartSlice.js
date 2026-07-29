import { createSlice } from "@reduxjs/toolkit";
import { AddToCartThunk } from "./Thunks/AddToCartThunk";
import { GetMyCartThunk } from "./Thunks/GetMyCartThunk";
import { UpdateQuantityThunk } from "./Thunks/UpdateQuantityThunk.js";
import { DeleteFromCartThunk } from "./Thunks/DeleteFromCartThunk.js";
import { ApplyCouponThunk } from "./Thunks/ApplyCouponThunk.js";
import { RemoveCouponThunk } from "./Thunks/RemoveCouponThunk.js";
import { ClearCartThunk } from "./Thunks/ClearCartThunk.js";
import { makeOrderThunk } from "./Thunks/makeOrderThunk.js";

// =================== INITIAL STATE ===================
const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
  subTotalPrice: 0,
  discountAmount: 0,
  coupon: null,
  shipping: 0,
  tax: 0,
  orderId: null,
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
        state.coupon = action.payload.coupon;
        state.discountAmount = action.payload.discountAmount;
        state.subTotalPrice = action.payload.subtotal;
        state.totalPrice = action.payload.total;
        state.shipping = action.payload.shipping ? action.payload.shipping : 0;
        state.tax = action.payload.tax
          ? action.payload.tax
          : 0.14 * (state.subTotalPrice - state.discountAmount);
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
        state.shipping = action.payload.shipping ? action.payload.shipping : 0;
        state.tax = action.payload.tax
          ? action.payload.tax
          : 0.14 * (state.subTotalPrice - state.discountAmount);
      })
      .addCase(AddToCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload.message;
      })

      // =================== Update Item Quantity ===================
      .addCase(UpdateQuantityThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(UpdateQuantityThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.cartItems = action.payload.items;
        state.totalQuantity = action.payload.itemCount;
        state.discountAmount = action.payload.discountAmount;
        state.subTotalPrice = action.payload.subtotal;
        state.totalPrice = action.payload.total;
        state.shipping = action.payload.shipping ? action.payload.shipping : 0;
        state.tax = action.payload.tax
          ? action.payload.tax
          : 0.14 * (state.subTotalPrice - state.discountAmount);
      })
      .addCase(UpdateQuantityThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload.message;
      })

      // =================== Delete From Cart ===================
      .addCase(DeleteFromCartThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(DeleteFromCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.cartItems = action.payload.items;
        state.totalQuantity = action.payload.itemCount;
        state.discountAmount = action.payload.discountAmount;
        state.subTotalPrice = action.payload.subtotal;
        state.totalPrice = action.payload.total;
        state.shipping = action.payload.shipping ? action.payload.shipping : 0;
        state.tax = action.payload.tax
          ? action.payload.tax
          : 0.14 * (state.subTotalPrice - state.discountAmount);
      })
      .addCase(DeleteFromCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload.message;
      })

      // =================== Apply Coupon ===================
      .addCase(ApplyCouponThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(ApplyCouponThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.coupon = action.meta.arg.code;
        state.totalQuantity = action.payload.itemCount;
        state.subTotalPrice = action.payload.subtotal;
        state.totalPrice = action.payload.total;
        state.discountAmount = action.payload.discountAmount;
        state.tax = action.payload.tax
          ? action.payload.tax
          : 0.14 * (state.subTotalPrice - state.discountAmount);
      })
      .addCase(ApplyCouponThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload.message;
      })

      // =================== Remove Coupon ===================
      .addCase(RemoveCouponThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(RemoveCouponThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.coupon = null;
        state.totalPrice = action.payload.total;
        state.subTotalPrice = action.payload.subtotal;
        state.discountAmount = 0;
        state.tax = action.payload.tax
          ? action.payload.tax
          : 0.14 * (state.subTotalPrice - state.discountAmount);
      })
      .addCase(RemoveCouponThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload.message;
      })

      // =================== Clear Cart ===================
      .addCase(ClearCartThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(ClearCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.cartItems = action.payload.items;
        state.totalQuantity = action.payload.itemCount;
        state.discountAmount = action.payload.discountAmount;
        state.subTotalPrice = action.payload.subtotal;
        state.totalPrice = action.payload.total;
        state.shipping = action.payload.shipping ? action.payload.shipping : 0;
        state.tax = action.payload.tax
          ? action.payload.tax
          : 0.14 * (state.subTotalPrice - state.discountAmount);
      })
      .addCase(ClearCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload.message;
      })

      // =================== Make Order ===================
      .addCase(makeOrderThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(makeOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.orderId = action.payload.order._id;
        state.cartItems = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
        state.subTotalPrice = 0;
        state.discountAmount = 0;
        state.coupon = null;
        state.shipping = 0;
        state.tax = 0;
      })
      .addCase(makeOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload.message;
      });
  },
});

export default cartSlice.reducer;
