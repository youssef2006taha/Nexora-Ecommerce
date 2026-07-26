import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const AddToCartThunk = createAsyncThunk(
  "cart/addProduct",
  async ({ id, quantity = 1 }, thunkAPI) => {
    // const { token } = thunkAPI.getState().auth;
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "https://e-commerce-api-3wara.vercel.app/carts/items",
        {
          productId: id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add product to cart.",
      );
    }
  },
);
