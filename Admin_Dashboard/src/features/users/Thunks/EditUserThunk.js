import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const editUserThunk = createAsyncThunk(
  "users/editUser",
  async ({ id, formData }, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth;

      const response = await axios.patch(
        `https://e-commerce-api-3wara.vercel.app/users/${id}`,
        formData,
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
