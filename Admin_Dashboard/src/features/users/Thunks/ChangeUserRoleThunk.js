import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const changeUserRoleThunk = createAsyncThunk(
  "users/changeUserRole",
  async (role, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth;

      const response = await axios.patch(
        "https://e-commerce-api-3wara.vercel.app/auth/change-role",
        role,
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
