import { createAsyncThunk } from "@reduxjs/toolkit";
import { editUserApi } from "../../../api/users/usersApi";

export const editUserThunk = createAsyncThunk(
  "users/editUser",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await editUserApi(id, formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
