import api from "../axios";

export const addProductApi = (formData) =>
  api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteProductApi = (id) => api.delete(`/products/${id}`);

export const getProductByIdApi = (id) => api.get(`/products/${id}`);

export const updateProductApi = (id, formData) =>
  api.patch(`/products/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
