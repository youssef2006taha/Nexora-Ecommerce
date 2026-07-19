import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteProductThunk = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth;

      const response = await axios.delete(
        `https://e-commerce-api-3wara.vercel.app/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return {
        id,
        ...response.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
