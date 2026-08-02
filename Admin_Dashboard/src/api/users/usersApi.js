import api from "../axios";

export const addUserApi = (userData) => api.post("/users/add", userData);

export const changeUserRoleApi = (role) => api.patch("/auth/change-role", role);

export const deleteUserApi = (id) => api.delete(`/users/${id}`);

export const editUserApi = (id, formData) =>
  api.patch(`/users/${id}`, formData);

export const getAllUsersApi = () => api.get("/users/all");
