import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendOTPThunk = createAsyncThunk(
  "auth/forgot-password/send-otp",
  async (email, thunkAPI) => {
    console.log();
    try {
      const res = await axios.post(
        "https://e-commerce-api-3wara.vercel.app/auth/forgot-password/send-otp",
        email,
      );

      return { result: res.data, email: email.email };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);
