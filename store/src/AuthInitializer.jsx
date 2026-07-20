import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { getCurrentUser } from "./features/auth/Thunks/getCurrentUserThunk";
import AuthLoader from "./components/UI/AuthLoader";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      try {
        await dispatch(getCurrentUser()).unwrap();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (token && !user) {
      fetchUser();
    }
  }, [token, user, dispatch]);

  if (loading) {
    return <AuthLoader />;
  }

  return <Outlet />;
}
