import { createAsyncThunk } from "@reduxjs/toolkit";
import { addUserApi } from "../../../api/users/usersApi";

export const addUserThunk = createAsyncThunk(
  "users/addUser",
  async (userData, thunkAPI) => {
    try {
      return await addUserApi(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
