import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendOTPApi } from "../../../api/auth/authApi";

export const sendOTPThunk = createAsyncThunk(
  "auth/forgot-password/send-otp",
  async (email, thunkAPI) => {
    try {
      const result = await sendOTPApi(email);

      return {
        result,
        email: email.email,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to send OTP.",
      );
    }
  },
);
