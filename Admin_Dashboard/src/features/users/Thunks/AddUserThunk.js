import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addUserThunk = createAsyncThunk(
  "users/addUser",
  async (userData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth;

      const response = await axios.post(
        "https://e-commerce-api-3wara.vercel.app/users/add",
        userData,
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