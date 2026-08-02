import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../../api/auth/authApi";

export const login = createAsyncThunk(
  "auth/login",
  async (loginData, thunkAPI) => {
    try {
      const { user, token } = await loginApi(loginData);

      if (user.role !== "admin") {
        return thunkAPI.rejectWithValue(
          "Access denied. This dashboard is available for administrators only.",
        );
      }

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
