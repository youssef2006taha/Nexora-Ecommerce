import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsersApi } from "../../../api/users/usersApi";

export const getAllUsersThunk = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkAPI) => {
    try {
      return await getAllUsersApi();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
