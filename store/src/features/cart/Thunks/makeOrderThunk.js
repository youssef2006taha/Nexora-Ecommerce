import { createAsyncThunk } from "@reduxjs/toolkit";
import { makeOrderApi } from "../../../api/cart/cartApi";

export const makeOrderThunk = createAsyncThunk(
  "orders/makeOrder",
  async (formData, thunkAPI) => {
    try {
      const payload = {
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          country: formData.country,
          city: formData.city,
          address: formData.address,
          postalCode: formData.postalCode,
        },
        paymentMethod: formData.paymentMethod,
        customerNote: formData.customerNote,
      };

      return await makeOrderApi(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to place order.",
      );
    }
  },
);
