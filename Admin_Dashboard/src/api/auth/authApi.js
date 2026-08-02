import api from "../axios";

export const sendOTPApi = (email) =>
  api.post("/auth/forgot-password/send-otp", email);

export const verifyResetOTPApi = (data) =>
  api.post("/auth/forgot-password/verify-otp", data);

export const loginApi = (loginData) => api.post("/auth/login", loginData);

export const getCurrentUserApi = () => api.get("/auth/me");
