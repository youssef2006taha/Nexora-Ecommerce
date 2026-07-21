import { createSlice } from "@reduxjs/toolkit";
import { login } from "./Thunks/authThunk";
import { getCurrentUser } from "./Thunks/getCurrentUserThunk";
import { sendOTPThunk } from "./Thunks/SendOTPThunk";
import { verifyResetOTPThunk } from "./Thunks/verifyResetOTPThunk";
import { sendRegisterOTP } from "./Thunks/sendRegisterOTP.js";

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
  email: "",
  message: "",
  isAuthenticated: false,
  newUserData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      state.email = "";
      state.message = "";
      state.isAuthenticated = false;

      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder

      // ================= Login =================
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.email = action.payload.user.email;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= Auth / Me =================
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.email = action.payload.email;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // ================= Forgot Password - Send OTP =================
      .addCase(sendOTPThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOTPThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload.email;
      })
      .addCase(sendOTPThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // ================= Verify Reset OTP =================
      .addCase(verifyResetOTPThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyResetOTPThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyResetOTPThunk.rejected, (state) => {
        state.loading = false;
      })

      // ================= Register - Send OTP =================
      .addCase(sendRegisterOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendRegisterOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.newUserData = action.payload.data;
      })
      .addCase(sendRegisterOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
