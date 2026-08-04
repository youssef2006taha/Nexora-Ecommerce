import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../features/auth/getCurrentUser";
import { useEffect } from "react";
import AuthLoader from "../components/UI/AuthLoader";
import { logout } from "../features/auth/authSlice";

export default function ProtectedRoute() {
  const dispatch = useDispatch();

  const { token, user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      if (token && !user) {
        try {
          await dispatch(getCurrentUser()).unwrap();
        } catch (error) {
          console.log(error);
          dispatch(logout());
        }
      }
    };

    fetchUser();
  }, [token, user, dispatch]);

  if (loading) {
    return <AuthLoader />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
