import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

// Layout
import Layout from "./components/Layout/Layout";

// Pages
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ViewProduct from "./pages/Products/product/ViewProduct";
import UsersPage from "./pages/Users/UsersPage";
import ProductsPage from "./pages/Products/ProductsPage";
import AddProductPage from "./pages/Products/product/add-product/addProductPage";
import EditProductPage from "./pages/Products/product/edit-product/EditProductPage";
import OrdersPage from "./pages/Orders/OrdersPage";
import CartsPage from "./pages/Carts/CartsPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import LoginPage from "./pages/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPasswordPage from "./pages/login/ForgotPasswordPage";
import VerifyResetOTPPage from "./pages/login/VerifyResetOTPPage";

// Toast
import Toast from "../src/components/UI/toast/Toast";

import { setTheme } from "./features/theme/themeSlice";

function App() {
  const themeDispatch = useDispatch();
  const { open, message, severity } = useSelector((store) => store.toast);
  const { theme } = useSelector((store) => store.theme);

  useEffect(() => {
    themeDispatch(setTheme(theme));
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<VerifyResetOTPPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/add" element={<AddProductPage />} />
            <Route path="products/edit/:id" element={<EditProductPage />} />
            <Route path="/products/view/:id" element={<ViewProduct />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="carts" element={<CartsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      <Toast open={open} message={message} severity={severity} />
    </>
  );
}

export default App;

// <ball color={var}  opc={0-1}  bl={1-4}  pos={t}  size={1-4} />

// import { Routes, Route, Navigate } from "react-router-dom";
// import Layout from "./components/Layout/Layout";
// import ViewProduct from "./pages/Products/product/ViewProduct";
// import EditProduct from "./pages/Products/product/EditProduct";
// import AddProductPage from "./pages/Products/AddProductPage/AddProductPage";
// import DashboardPage from "./pages/Dashboard/DashboardPage";
// import UsersPage from "./pages/Users/UsersPage";
// import ProductsPage from "./pages/Products/ProductsPage";
// import OrdersPage from "./pages/Orders/OrdersPage";
// import CartsPage from "./pages/Carts/CartsPage";
// import SettingsPage from "./pages/Settings/SettingsPage";
// import LoginPage from "./pages/login/Login";

// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <Routes>
//       <Route path="/login" element={<LoginPage />} />

//       {/* Protected Routes */}
//       <Route element={<ProtectedRoute />}>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Navigate to="/dashboard" replace />} />
//           <Route path="dashboard" element={<DashboardPage />} />
//           <Route path="users" element={<UsersPage />} />
//           <Route path="products" element={<ProductsPage />} />
//           <Route path="products/add" element={<AddProductPage />} />
//           <Route path="/products/view/:id" element={<ViewProduct />} />
//           <Route path="products/edit/:id" element={<EditProduct />}/>

//           <Route path="orders" element={<OrdersPage />} />
//           <Route path="carts" element={<CartsPage />} />
//           <Route path="settings" element={<SettingsPage />} />
//         </Route>
//       </Route>

//       <Route path="*" element={<Navigate to="/dashboard" replace />} />
//     </Routes>
//   );
// }

// export default App;
