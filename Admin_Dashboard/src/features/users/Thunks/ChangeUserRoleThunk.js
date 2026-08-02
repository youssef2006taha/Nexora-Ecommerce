import { createAsyncThunk } from "@reduxjs/toolkit";
import { changeUserRoleApi } from "../../../api/users/usersApi";

export const changeUserRoleThunk = createAsyncThunk(
  "users/changeUserRole",
  async (role, thunkAPI) => {
    try {
      return await changeUserRoleApi(role);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
