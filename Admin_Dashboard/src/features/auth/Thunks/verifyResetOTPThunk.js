import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const verifyResetOTPThunk = createAsyncThunk(
  "auth/verifyResetOTP",
  async ({ email, otp, newPassword }, thunkAPI) => {
    console.log({ email, otp, newPassword })
    try {
      const response = await axios.post(
        "https://e-commerce-api-3wara.vercel.app/auth/forgot-password/verify-otp",
        {
          email,
          otp,
          newPassword,
        },  
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to reset password.",
      );
    }
  },
);
