import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import usersReducer from "../features/users/usersSlice";
import toastReducer from "../features/Toast/toastSlice";
import themeReducer from "../features/theme/themeSlice";
import productsReducer from "../features/products/productsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    users: usersReducer,
    toast: toastReducer,
    theme: themeReducer,
  },
});
