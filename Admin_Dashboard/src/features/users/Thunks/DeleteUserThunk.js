import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteUserThunk = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth;

      const response = await axios.delete(
        `https://e-commerce-api-3wara.vercel.app/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return { date: response.data, _id: id };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
