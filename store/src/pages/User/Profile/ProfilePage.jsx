import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/UI/Button";
import { LogOut } from "lucide-react";

import { logout } from "../../../features/auth/authSlice";

import ProfileOverview from "./Components/ProfileOverview";
import Address from "./Components/Address";
import ChangePassword from "./Components/ChangePassword";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());

    navigate("/login", {
      state: {
        from: "/home",
      },
    });
  };

  return (
    <div className="py-8">
      <div className="mx-auto flex flex-col gap-6 w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[65vw] xl:w-[60vw]">
        <ProfileOverview />
        <Address />
        <ChangePassword />
        <Button
          text="Logout"
          variant="outlined"
          startIcon={<LogOut className="size-4.5" />}
          className="!bg-red-500 !text-white hover:!bg-red-600 dark:hover:!bg-red-600 !h-12 !mt-3"
          onClick={logoutHandler}
        />
      </div>
    </div>
  );
};

export default React.memo(ProfilePage);
