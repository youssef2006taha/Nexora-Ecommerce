import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { getCurrentUser } from "./features/auth/Thunks/getCurrentUserThunk";
import { GetMyCartThunk } from "./features/cart/Thunks/GetMyCartThunk";
import AuthLoader from "./components/UI/AuthLoader";

export default function AuthInitializer() {
  const dispatch = useDispatch();
  const cartDispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      try {
        await dispatch(getCurrentUser()).unwrap();
        await cartDispatch(GetMyCartThunk()).unwrap();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (token && !user) {
      fetchUser();
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  if (loading) {
    return <AuthLoader />;
  }

  return <Outlet />;
}
