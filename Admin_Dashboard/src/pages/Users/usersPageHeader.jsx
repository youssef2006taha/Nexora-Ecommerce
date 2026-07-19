import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserThunk } from "../../features/users/Thunks/AddUserThunk";
import { showToast } from "../../features/Toast/toastSlice.js";
import {
  IconButton,
  Button,
  InputBase,
  InputLabel,
  InputAdornment,
  Collapse,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";

const ProductsPageHeader = ({ inputSearch, handleSearch }) => {
  const initialNewUserData = {
    username: "",
    email: "",
    password: "",
    phone: "",
  };

  const initialErrors = { username: "", email: "", password: "", phone: "" };
  const usersDispatch = useDispatch();
  const toastDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openCollapse, setOpenCollapse] = useState(false);

  // Control Password Visibility
  const [showPassword, setShowPassword] = useState(false);

  // New User Data
  const [newUserData, setNewUserData] = useState(initialNewUserData);

  // Fields Errors
  const [errors, setErrors] = useState(initialErrors);

  const handleReset = () => {
    setNewUserData(initialNewUserData);
    setErrors(initialErrors);
  };

  const regex = {
    username: /^[a-zA-Z0-9_\p{L}\s]{3,30}$/u,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^\S{6,}$/,
    phone: /^01[0125]\d{8}$/,
  };

  const validate = () => {
    const newErrors = {};

    if (!regex.username.test(newUserData.username.trim())) {
      newErrors.username = "Invalid username.";
    }

    if (!regex.email.test(newUserData.email.trim())) {
      newErrors.email = "Invalid email.";
    }

    if (!regex.password.test(newUserData.password)) {
      newErrors.password = "Min. 6 characters.";
    }

    if (!regex.phone.test(newUserData.phone.trim())) {
      newErrors.phone = "Invalid phone number.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      await usersDispatch(addUserThunk(newUserData)).unwrap();

      toastDispatch(
        showToast({
          message: "User added successfully!",
          severity: "success",
        })
      );
      handleReset();
    } catch (error) {
      toastDispatch(
        showToast({
          message: error || "Failed to add user!",
          severity: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        {/* Main Header Card */}
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-8 items-stretch justify-start sm:items-center sm:justify-between lg:items-stretch lg:justify-start xl:items-center xl:justify-between p-6 bg-[var(--bg-card)] rounded-[var(--radius-xl-value)] border border-[var(--border)] shadow-sm transition-all duration-300">
          <div className="flex flex-col gap-2">
            <h2 className="uppercase tracking-[0.2rem] font-bold text-xs text-[var(--primary)]">
              User Management
            </h2>
            <h2 className="font-semibold text-3xl text-[var(--text-primary)]">
              Manage Users
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            {/* Search Input */}
            <InputBase
              placeholder="Search users..."
              value={inputSearch}
              onChange={(e) => handleSearch(e.target.value)}
              className="!h-12 !min-w-64 !grow lg:!grow xl:!grow-0 !rounded-[var(--radius-md-value)] !border !border-[var(--border)] !bg-[var(--bg-hover)] !transition-all !duration-200 focus-within:!ring-2 focus-within:!ring-[var(--border-focus)]/50"
              slotProps={{
                input: {
                  className:
                    "!h-full !w-full !pr-4 !text-sm !text-[var(--text-primary)] !outline-none placeholder:!text-[var(--text-muted)]",
                },
              }}
              startAdornment={
                <InputAdornment className="flex justify-center !h-12 !w-13 !py-3 !text-[var(--text-muted)]">
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
                    <path d="m21 21-4.34-4.34" />
                    <circle cx="11" cy="11" r="8" />
                  </svg>
                </InputAdornment>
              }
            />

            {/* Add User Toggle Button */}
            <Button
              className="flex gap-2 !px-5 !py-1.5 !bg-[var(--primary)] hover:!bg-[var(--primary-hover)] !transition !duration-250 shadow-sm !rounded-[var(--radius-md-value)] !text-white"
              onClick={() => {
                setOpenCollapse(!openCollapse);
              }}
            >
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

              <span className="font-semibold capitalize">Add User</span>

              {openCollapse ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </Button>
          </div>
        </div>

        {/* Collapse Form */}
        <Collapse in={openCollapse} timeout={300}>
          {/* خلفية الكارت الخارجي للفورم أصبحت الـ البركاني السطحي المتناسق */}
          <div className="mt-8 bg-[var(--bg-surface)] rounded-[var(--radius-xl-value)] overflow-hidden border border-[var(--border)] shadow-md transition-all duration-300">
            
            {/* Form Header */}
            {/* الهيدر أخذ خلفية الـ Hover لفصله بمظهر ناعم وجميل */}
            <div className="flex justify-between items-center bg-[var(--bg-hover)] p-5 border-b border-[var(--border)]">
              <div className="flex gap-3 items-center justify-start">
                {/* Icon Wrapper - البنفسجي المات المريح والشفاف في الخلفية */}
                <div className="flex items-center justify-center size-10 rounded-[var(--radius-md-value)] bg-[var(--primary-light)] text-[var(--primary)] hover:-rotate-12 transition duration-250 will-change-transform">
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
                </div>
                {/* Title && Description */}
                <div className="flex flex-col gap-1">
                  <h2 className="capitalize text-[var(--text-primary)] font-bold">
                    Create New User
                  </h2>
                  <p className="text-sm text-[var(--text-muted)]">
                    Fill in the details below to add a new user
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <IconButton
                size="small"
                className="!text-[var(--text-muted)] hover:!text-[var(--text-primary)] !transition !duration-150"
                onClick={() => setOpenCollapse(false)}
              >
                <CloseIcon />
              </IconButton>
            </div>

            {/* Body (Form) */}
            <form className="flex flex-col gap-6" onSubmit={handleCreateUser}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 pt-6 px-6">
                
                {/* Username */}
                <div className="flex flex-col gap-2">
                  <InputLabel
                    required
                    className="!uppercase !text-[var(--text-muted)] !text-xs [&_.MuiFormLabel-asterisk]:!text-[var(--danger)]"
                  >
                    Username
                  </InputLabel>
                  <InputBase
                    type="text"
                    placeholder="e.g.john_doe"
                    value={newUserData.username}
                    onChange={(e) => {
                      setNewUserData({
                        ...newUserData,
                        username: e.target.value,
                      });
                    }}
                    className="!h-10 !px-4 !rounded-[var(--radius-md-value)] !border !border-[var(--border)] !bg-[var(--bg-main)] !text-[var(--text-primary)] transition-all duration-200 [&.Mui-focused]:!ring-2 [&.Mui-focused]:!ring-[var(--border-focus)]/50 [&_input::placeholder]:!text-[var(--text-muted)] [&_input::placeholder]:!text-sm !text-sm"
                  />
                  {errors.username && (
                    <p className="text-xs text-[var(--danger)] min-h-[20px] mt-1">
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <InputLabel
                    required
                    className="!uppercase !text-[var(--text-muted)] !text-xs [&_.MuiFormLabel-asterisk]:!text-[var(--danger)]"
                  >
                    Email
                  </InputLabel>
                  <InputBase
                    type="email"
                    value={newUserData.email}
                    onChange={(e) => {
                      setNewUserData({
                        ...newUserData,
                        email: e.target.value,
                      });
                    }}
                    placeholder="e.g. john@gmail.com"
                    className="!h-10 !px-4 !rounded-[var(--radius-md-value)] !border !border-[var(--border)] !bg-[var(--bg-main)] !text-[var(--text-primary)] transition-all duration-200 [&.Mui-focused]:!ring-2 [&.Mui-focused]:!ring-[var(--border-focus)]/50 [&_input::placeholder]:!text-[var(--text-muted)] [&_input::placeholder]:!text-sm !text-sm"
                  />
                  {errors.email && (
                    <p className="text-xs text-[var(--danger)] min-h-[20px] mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                  <InputLabel
                    required
                    className="!uppercase !text-[var(--text-muted)] !text-xs [&_.MuiFormLabel-asterisk]:!text-[var(--danger)]"
                  >
                    Password
                  </InputLabel>
                  <InputBase
                    type={showPassword ? "text" : "password"}
                    value={newUserData.password}
                    onChange={(e) => {
                      setNewUserData({
                        ...newUserData,
                        password: e.target.value,
                      });
                    }}
                    placeholder="Min. 6 characters"
                    className="!h-10 !px-4 !rounded-[var(--radius-md-value)] !border !border-[var(--border)] !bg-[var(--bg-main)] !text-[var(--text-primary)] transition-all duration-200 [&.Mui-focused]:!ring-2 [&.Mui-focused]:!ring-[var(--border-focus)]/50 [&_input::placeholder]:!text-[var(--text-muted)] [&_input::placeholder]:!text-sm !text-sm"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                          disableRipple
                          className="!text-[var(--text-muted)] hover:!text-[var(--text-primary)] !bg-transparent !transition !duration-100"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon fontSize="small" />
                          ) : (
                            <VisibilityIcon fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {errors.password && (
                    <p className="text-xs text-[var(--danger)] min-h-[20px] mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <InputLabel
                    required
                    className="!uppercase !text-[var(--text-muted)] !text-xs [&_.MuiFormLabel-asterisk]:!text-[var(--danger)]"
                  >
                    Phone
                  </InputLabel>
                  <InputBase
                    type="text"
                    value={newUserData.phone}
                    onChange={(e) => {
                      setNewUserData({
                        ...newUserData,
                        phone: e.target.value,
                      });
                    }}
                    placeholder="e.g. +1 023 612 348"
                    className="!h-10 !px-4 !rounded-[var(--radius-md-value)] !border !border-[var(--border)] !bg-[var(--bg-main)] !text-[var(--text-primary)] transition-all duration-200 [&.Mui-focused]:!ring-2 [&.Mui-focused]:!ring-[var(--border-focus)]/50 [&_input::placeholder]:!text-[var(--text-muted)] [&_input::placeholder]:!text-sm !text-sm"
                  />
                  {errors.phone && (
                    <p className="text-xs text-[var(--danger)] min-h-[20px] mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
              
              <hr className="mx-6 border-0 border-t border-[var(--border)]" />

              {/* Actions Footer */}
              <div className="flex justify-end">
                <div className="flex gap-3 pb-6 px-6">
                  {/* Clear Button */}
                  <Button
                    type="button"
                    onClick={handleReset}
                    className="!rounded-[var(--radius-md-value)] !border !border-[var(--border)] !px-4 !py-2 !font-medium !text-[var(--text-secondary)] !transition hover:!bg-[var(--bg-hover)] !capitalize"
                  >
                    Clear
                  </Button>

                  {/* Add Submit Button */}
                  <Button
                    type="submit"
                    loadingPosition="start"
                    disabled={loading}
                    className="!px-5 !py-2 !bg-[var(--primary)] hover:!bg-[var(--primary-hover)] !transition !duration-250 shadow-sm !rounded-[var(--radius-md-value)] !text-white !font-semibold !capitalize"
                    startIcon={
                      loading && (
                        <CircularProgress
                          size={16}
                          className="!text-white"
                        />
                      )
                    }
                  >
                    <span className="flex items-center gap-1.5">
                      {!loading && (
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
                          className="!size-4.5"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <line x1="19" x2="19" y1="8" y2="14" />
                          <line x1="22" x2="16" y1="11" y2="11" />
                        </svg>
                      )}
                      Add
                    </span>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default React.memo(ProductsPageHeader);