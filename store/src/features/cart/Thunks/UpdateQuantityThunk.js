import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const UpdateQuantityThunk = createAsyncThunk(
  "cart/updateQuantity",
  async (cartItem, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    console.log(cartItem);
    try {
      const res = await axios.patch(
        "https://e-commerce-api-3wara.vercel.app/carts/items",
        cartItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update cart.",
      );
    }
  },
);
