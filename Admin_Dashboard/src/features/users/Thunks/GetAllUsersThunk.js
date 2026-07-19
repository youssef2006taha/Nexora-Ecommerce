import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsersThunk = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth;

      const response = await axios.get(
        "https://e-commerce-api-3wara.vercel.app/users/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
