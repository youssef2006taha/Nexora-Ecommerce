import { createAsyncThunk } from "@reduxjs/toolkit";
import { verifyResetOTPApi } from "../../../api/auth/authApi";

export const verifyResetOTPThunk = createAsyncThunk(
  "auth/verifyResetOTP",
  async ({ email, otp, newPassword }, thunkAPI) => {
    try {
      return await verifyResetOTPApi({
        email,
        otp,
        newPassword,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to reset password.",
      );
    }
  },
);
