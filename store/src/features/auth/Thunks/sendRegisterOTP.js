import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRegisterOTPApi } from "../../../api/auth/authApi";

export const sendRegisterOTP = createAsyncThunk(
  "auth/sendRegisterOTP",
  async (registerData, thunkAPI) => {
    try {
      const result = await sendRegisterOTPApi(registerData);

      return {
        ...result,
        data: registerData,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to send verification code.",
      );
    }
  },
);
