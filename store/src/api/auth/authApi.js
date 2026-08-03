import api from "../axios";

export const loginApi = async (loginData) => {
  return await api.post("/auth/login", loginData);
};

export const getCurrentUserApi = () => {
  return api.get("/auth/me");
};

export const sendOTPApi = (email) => {
  return api.post("/auth/forgot-password/send-otp", email);
};

export const sendRegisterOTPApi = (registerData) => {
  return api.post("/auth/register/send-otp", registerData);
};

export const updateUserProfileApi = (id, data) => {
  return api.patch(`/users/${id}`, data);
};

export const verifyResetOTPApi = (data) =>
  api.post("/auth/forgot-password/verify-otp", data);

export const verifyRegisterOTPApi = (data) =>
  api.post("/auth/register/verify-otp", data);
