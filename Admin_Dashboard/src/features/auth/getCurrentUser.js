import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUserApi } from "../../api/auth/authApi";

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const { user } = await getCurrentUserApi();

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to get current user.",
      );
    }
  },
);
