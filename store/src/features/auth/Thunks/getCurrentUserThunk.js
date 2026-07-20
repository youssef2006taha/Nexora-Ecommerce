import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (!token) {
        return thunkAPI.rejectWithValue("No token");
      }

      const response = await axios.get(
        "https://e-commerce-api-3wara.vercel.app/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
