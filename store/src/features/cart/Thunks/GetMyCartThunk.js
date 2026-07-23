import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetMyCartThunk = createAsyncThunk(
  "cart/getMyCart",
  async (_, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;

    try {
      const res = await axios.get(
        "https://e-commerce-api-3wara.vercel.app/carts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(res.data);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to get cart.",
      );
    }
  },
);
