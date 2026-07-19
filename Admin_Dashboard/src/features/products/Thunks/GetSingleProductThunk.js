import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductByIdThunk = createAsyncThunk(
  "products/getProductById",
  async (id, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth;

      const response = await axios.get(
        `https://e-commerce-api-3wara.vercel.app/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);