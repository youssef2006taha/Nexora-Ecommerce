import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/UI/Button";
import { LogOut } from "lucide-react";

import { logout } from "../../../features/auth/authSlice";

import ProfileOverview from "./Components/ProfileOverview";
import Address from "./Components/Address";
import ChangePassword from "./Components/ChangePassword";
import SectionWithCircles from "../../../components/UI/SectionWithCircles";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const logoutHandler = () => {
    dispatch(logout());

    navigate("/login", {
      state: {
        from: "/home",
      },
    });
  };

  return (
    <SectionWithCircles className="py-8">
      <div className="mx-auto flex flex-col gap-6 w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[65vw] xl:w-[60vw]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-bg-card p-6 rounded-3xl border border-border shadow">
          {/* Title */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-text-primary">My Profile</h1>
            <p className="mt-1 text-[12px] sm:text-[13px] text-text-muted">
              Manage your personal information and account settings.
            </p>
          </div>

          {/* Logout Button */}
          <Button
            text="Logout"
            variant="contained"
            startIcon={<LogOut className="size-4.5" />}
            className="!bg-red-500 !text-white hover:!bg-red-600 dark:hover:!bg-red-600 !h-11 sm:w-auto !rounded-lg !border-2 !border-red-600/50"
            onClick={logoutHandler}
          />
        </div>
        <ProfileOverview />
        <Address />
        <ChangePassword />
      </div>
    </SectionWithCircles>
  );
};

export default React.memo(ProfilePage);
