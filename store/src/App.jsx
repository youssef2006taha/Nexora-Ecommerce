import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTheme } from "./features/theme/themeSlice";

// Pages
import Layout from "./components/Layout/layout";
import AuthInitializer from "./AuthInitializer";
import HomePage from "./pages/Home/HomePage";
import ShopPage from "./pages/Shop/ShopPage";
import OrdersPage from "./pages/Orders/OrdersPage";
import WishlistPage from "./pages/Wishlist/WishlistPage";
import ProfilePage from "./pages/User/Profile/ProfilePage";
import LoginPage from "./pages/User/Login/LoginPage";
import ForgotPasswordPage from "./pages/User/Login/ForgotPasswordPage";
import VerifyResetOTPPage from "./pages/User/Login/VerifyResetOTPPage";
import RegisterPage from "./pages/User/Register/RegisterPage";

// Toast
import Toast from "../src/components/UI/toast/Toast";

function App() {
  const { theme } = useSelector((store) => store.theme);
  const { open, message, severity } = useSelector((store) => store.toast);
  const themeDispatch = useDispatch();

  useEffect(() => {
    themeDispatch(setTheme(theme));
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    <>
      <Routes>
        <Route element={<AuthInitializer />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<HomePage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<VerifyResetOTPPage />} />
          </Route>
        </Route>

        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

      <Toast open={open} message={message} severity={severity} />
    </>
  );
}

export default App;
