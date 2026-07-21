import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendRegisterOTP = createAsyncThunk(
  "auth/sendRegisterOTP",
  async (registerData, thunkAPI) => {
    try {
      const res = await axios.post(
        "https://e-commerce-api-3wara.vercel.app/auth/register/send-otp",
        registerData,
      );

      return { ...res.data, data: registerData };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to send verification code.",
      );
    }
  },
);
