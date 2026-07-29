import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const makeOrderThunk = createAsyncThunk(
  "orders/makeOrder",
  async (formData, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;

    try {
      const response = await axios.post(
        "https://e-commerce-api-3wara.vercel.app/orders",
        {
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
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.log(error.response?.data?.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to place order.",
      );
    }
  },
);
