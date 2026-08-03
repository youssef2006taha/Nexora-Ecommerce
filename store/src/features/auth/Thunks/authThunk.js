import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../../api/auth/authApi";

export const login = createAsyncThunk(
  "auth/login",
  async (loginData, thunkAPI) => {
    try {
      const { user, token } = await loginApi(loginData);

      localStorage.setItem("token", token);

      return {
        user,
        token,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed.",
      );
    }
  },
);
