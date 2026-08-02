import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteUserApi } from "../../../api/users/usersApi";

export const deleteUserThunk = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    try {
      const data = await deleteUserApi(id);

      return {
        data,
        _id: id,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
