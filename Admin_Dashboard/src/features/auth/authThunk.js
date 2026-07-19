import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async (loginData, thunkAPI) => {
    try {
      const res = await axios.post(
        "https://e-commerce-api-3wara.vercel.app/auth/login",
        loginData,
      );

      const { user, token } = res.data;

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
