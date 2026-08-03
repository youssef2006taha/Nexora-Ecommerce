import { createAsyncThunk } from "@reduxjs/toolkit";
import { verifyRegisterOTPApi } from "../../../api/auth/authApi";

export const verifyRegisterOTPThunk = createAsyncThunk(
  "auth/verifyRegisterOTP",
  async ({ email, otp }, thunkAPI) => {
    try {
      return await verifyRegisterOTPApi({
        email,
        otp,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to verify registration OTP.",
      );
    }
  },
);
