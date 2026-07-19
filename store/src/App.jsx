import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/layout";
import HomePage from "./pages/Home/HomePage";
import ShopPage from "./pages/Shop/ShopPage";
import OrdersPage from "./pages/Orders/OrdersPage";
import WishlistPage from "./pages/Wishlist/WishlistPage";
import ProfilePage from "./pages/User/Profile/ProfilePage";
import LoginPage from "./pages/User/Login/LoginPage";
import RegisterPage from "./pages/User/Register/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;









