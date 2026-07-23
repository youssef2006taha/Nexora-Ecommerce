import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import toastReducer from "../features/Toast/toastSlice";
import themeReducer from "../features/theme/themeSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    theme: themeReducer,
    cart: cartReducer,
  },
});
