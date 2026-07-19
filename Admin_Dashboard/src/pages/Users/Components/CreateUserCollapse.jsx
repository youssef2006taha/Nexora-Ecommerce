import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Password from "../../../components/UI/Password.jsx";
import Input from "../../../components/UI/Input.jsx";
import Label from "../../../components/UI/Label.jsx";
import Button from "../../../components/UI/Button.jsx";

import { addUserThunk } from "../../../features/users/Thunks/AddUserThunk";
import { showToast } from "../../../features/Toast/toastSlice.js";
import { validateNewUser } from "../../../utils/validation/validateNewUser.js";

const CreateUserCollapse = ({ openCollapse, setOpenCollapse }) => {
  const usersDispatch = useDispatch();
  const toastDispatch = useDispatch();

  const initialNewUserData = {
    username: "",
    email: "",
    password: "",
    phone: "",
  };

  // New User Data
  const [newUserData, setNewUserData] = useState(initialNewUserData);

  const [loading, setLoading] = useState(false);

  const initialErrors = { username: "", email: "", password: "", phone: "" };

  // Fields Errors
  const [errors, setErrors] = useState(initialErrors);

  const handleReset = () => {
    setNewUserData(initialNewUserData);
    setErrors(initialErrors);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    const validationErrors = validateNewUser(newUserData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      await usersDispatch(addUserThunk(newUserData)).unwrap();

      toastDispatch(
        showToast({
          message: "User added successfully!",
          severity: "success",
        }),
      );
    } catch (error) {
      toastDispatch(
        showToast({
          message: error || "Failed to add user!",
          severity: "error",
        }),
      );
    } finally {
      setLoading(false);
      handleReset();
    }
  };

  return (
    <Collapse in={openCollapse} timeout={120}>
      <div className="mt-8 bg-bg-card rounded-3xl overflow-hidden border border-border shadow">
        {/* Header */}
        <div className="flex justify-between items-center !bg-gradient-to-r !from-primary-active !via-primary !to-primary-hover py-4 px-5 relative">
          {/* Overlay */}
          <div className="absolute w-full h-full inset-0 bg-white/25 dark:bg-black/20" />

          <div className="flex gap-3 items-center justify-start">
            {/* Icon */}
            <div className="relative z-10 flex items-center justify-center size-10 rounded-xl bg-white/15 backdrop-blur-sm border border-white/10 text-white/95 hover:-rotate-12 hover:scale-105 transition duration-300 will-change-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" x2="19" y1="8" y2="14" />
                <line x1="22" x2="16" y1="11" y2="11" />
              </svg>
            </div>
            {/* Title && Description */}
            <div className="flex flex-col gap-1 relative z-20">
              <h2 className="capitalize text-white/90 font-bold">
                Create New User
              </h2>
              <p className="text-sm text-white/75 dark:text-white/65">
                Fill in the details below to add a new user
              </p>
            </div>
          </div>

          {/* Close Button */}
          <IconButton
            size="small"
            className="!text-white/60 hover:!text-white/80 !transition !duration-150"
            onClick={() => setOpenCollapse(false)}
          >
            <CloseIcon />
          </IconButton>
        </div>

        {/* Body (Form) */}
        <form className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 pt-6 px-6">
            {/* Username */}
            <div className="flex flex-col gap-2">
              <Label required={true} value="username" htmlFor="Username" />
              <Input
                type="text"
                id="Username"
                value={newUserData.username}
                onChange={(e) => {
                  setNewUserData({
                    ...newUserData,
                    username: e.target.value,
                  });
                }}
                placeholder="e.g. john_doe"
              />
              {errors.username && (
                <p className="text-sm text-red-400 min-h-[20px]">
                  {errors.username || ""}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <Label required={true} value="Email" htmlFor="email" />

              <Input
                type="email"
                id="email"
                value={newUserData.email}
                onChange={(e) => {
                  setNewUserData({
                    ...newUserData,
                    email: e.target.value,
                  });
                }}
                placeholder="e.g. john@gmail.com"
              />
              {errors.email && (
                <p className="text-sm text-red-400 min-h-[20px]">
                  {errors.email || ""}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <Label required={true} value="Password" htmlFor="password" />

              <Password
                id="password"
                value={newUserData.password}
                onChange={(e) => {
                  setNewUserData({
                    ...newUserData,
                    password: e.target.value,
                  });
                }}
              />

              {errors.password && (
                <p className="text-sm text-red-400 min-h-[20px]">
                  {errors.password || ""}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <Label required={true} value="Phone" htmlFor="Phone" />

              <Input
                type="text"
                id="Phone"
                value={newUserData.phone}
                onChange={(e) => {
                  setNewUserData({
                    ...newUserData,
                    phone: e.target.value,
                  });
                }}
                placeholder="e.g. +1 023 612 348"
              />
              {errors.phone && (
                <p className="text-sm text-red-400 min-h-[20px]">
                  {errors.phone || ""}
                </p>
              )}
            </div>
          </div>

          <hr className="mx-6 border-0 border-t border-border/80 dark:border-border" />

          {/* Actions */}
          <div className="flex justify-end">
            <div className="flex gap-3 pb-6 px-6">
              <Button
                type="button"
                text="clear"
                variant="secondary"
                onClick={handleReset}
                className="!rounded-xl !border !border-slate-400/30 dark:!border-slate-700/80 !px-3 !py-2 !font-medium !text-slate-500 dark:!text-slate-300 !transition hover:!bg-gray-400/10 dark:hover:!bg-slate-800/60 !capitalize"
              />

              <Button
                type="submit"
                onClick={handleCreateUser}
                loading={loading}
                text="Add"
                loadingText="Adding"
                startIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="!size-5"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" x2="19" y1="8" y2="14" />
                    <line x1="22" x2="16" y1="11" y2="11" />
                  </svg>
                }
              />
            </div>
          </div>
        </form>
      </div>
    </Collapse>
  );
};

export default React.memo(CreateUserCollapse);
