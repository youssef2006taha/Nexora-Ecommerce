import api from "../axios";

export const addToWishlistApi = (id) => api.post(`/wishlists/add/${id}`, {});

export const getWishlistApi = () => api.get("/wishlists/my");

export const removeFromWishlistApi = (productId) =>
  api.delete(`/wishlists/remove/${productId}`);
