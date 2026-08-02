import api from "../axios";

export const addToCartApi = ({ id, quantity = 1 }) =>
  api.post("/carts/items", {
    productId: id,
    quantity,
  });

export const applyCouponApi = (coupon) => api.post("/carts/coupon", coupon);

export const clearCartApi = () => api.delete("/carts/clear");

export const deleteFromCartApi = (id) => api.delete(`/carts/items/${id}`);

export const getMyCartApi = () => api.get("/carts");

export const makeOrderApi = (data) => api.post("/orders", data);

export const removeCouponApi = () => api.delete("/carts/coupon");

export const updateQuantityApi = (cartItem) =>
  api.patch("/carts/items", cartItem);

export const getProductsApi = (params) => api.get("/products", { params });
