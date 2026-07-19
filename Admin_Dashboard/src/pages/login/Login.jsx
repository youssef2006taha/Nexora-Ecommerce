// import React from "react";
import { CheckCircle } from "lucide-react";
import {
  Button,
  InputBase,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authThunk";
import { showToast } from "../../features/Toast/toastSlice.js";
import { Link } from "react-router-dom";

import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const loginDispatch = useDispatch();
  const toastDispatch = useDispatch();

  const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^\S{6,}$/,
  };

  const validate = () => {
    const newErrors = {};

    if (!regex.email.test(formData.email)) {
      newErrors.email = "Invalid email.";
    }

    if (!regex.password.test(formData.password)) {
      newErrors.password = "Min. 6 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await loginDispatch(login(formData)).unwrap();

      toastDispatch(
        showToast({
          message: "Signed in successfully.",
          severity: "success",
        }),
      );

      navigate("/dashboard", { replace: true });
    } catch (error) {
      if (error === "Invalid email or password") {
        setErrors((prev) => ({
          ...prev,
          general: "Invalid email or password.",
        }));
      } else {
        toastDispatch(
          showToast({
            message: error || "Failed to sign in.",
            severity: "error",
          }),
        );
      }
    }
  };

  return (
    <div className="min-h-screen lg:h-screen flex items-center justify-center md:!p-12 overflow-hidden">
      <div className="w-full max-w-6xl md:rounded-2xl overflow-hidden shadow-2xl grid md:grid-cols-2 shadow-[0_0_4px] shadow-primary-hover">
        {/* Left Side */}
        <div className="h-screen md:h-auto lg:h-full relative overflow-hidden bg-gradient-to-br from-primary-active via-primary to-primary-hover p-8 md:p-10 text-white flex flex-col justify-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/10 dark:bg-black/30" />

          {/* Content */}
          <div className="h-full flex flex-col gap-8 md:gap-6 justify-center md:justify-start lg:justify-between relative z-10">
            <h3 className="text-[15px] flex items-center gap-2 text-lg font-semibold text-white/90">
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
                className="lucide lucide-shopping-bag-icon lucide-shopping-bag !size-5"
              >
                <path d="M16 10a4 4 0 0 1-8 0" />
                <path d="M3.103 6.034h17.794" />
                <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
              </svg>{" "}
              Koda Commerce
            </h3>

            <h1 className="text-[26px] md:text-[28px] lg:text-[36px] font-bold leading-tight tracking-tight">
              Manage Your Store
              <br />
              Like a Pro
            </h1>

            <p className="text-[13px] sm:text-[15px] lg:text-base text-white/80 leading-relaxed">
              Control products, orders, users, carts and analytics from a modern
              dashboard experience.
            </p>

            <div className="space-y-4">
              <div className="text-[14px] lg:text-base bg-white/10 text-white/95 backdrop-blur-md border border-white/20 rounded-xl py-3 px-4 lg:p-4 flex items-center gap-3 transition-all duration-300 hover:bg-white/20">
                <CheckCircle className="!size-4.5 lg:!size-5.5" />
                <span className="font-medium">Product Management</span>
              </div>

              <div className="text-[14px] lg:text-base bg-white/10 text-white/95 backdrop-blur-md border border-white/20 rounded-xl py-3 px-4 lg:p-4 flex items-center gap-3 transition-all duration-300 hover:bg-white/20">
                <CheckCircle className="!size-4.5 lg:!size-5.5" />
                <span className="font-medium">Order Tracking</span>
              </div>

              <div className="text-[14px] lg:text-base bg-white/10 text-white/95 backdrop-blur-md border border-white/20 rounded-xl py-3 px-4 lg:p-4 flex items-center gap-3 transition-all duration-300 hover:bg-white/20">
                <CheckCircle className="!size-4.5 lg:!size-5.5" />
                <span className="font-medium">User Analytics</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full bg-transparent dark:bg-bg-card overflow-hidden p-10 flex flex-col justify-between items-start gap-8 lg:gap-5">
          <div>
            <h2 className="text-[26px] md:text-[28px] lg:text-[36px] lg:text-4xl font-bold bg-gradient-to-r from-primary-active via-primary to-primary-hover bg-clip-text text-transparent">
              Welcome Back
            </h2>

            <p className="text-xs lg:text-base text-gray-400 mt-1 lg:mt-2">
              Sign in to your admin dashboard
            </p>
          </div>

          <form className="flex flex-col gap-4 w-full">
            {/* Email */}
            <div className="flex flex-col gap-2 relative">
              <label
                htmlFor="Email"
                className="text-text-primary/60 dark:text-text-primary/90 text-sm font-semibold"
              >
                Email
              </label>
              <div>
                <InputBase
                  type="email"
                  required
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    errors.email && setErrors({ ...errors, email: "" });
                    errors.general && setErrors({ ...errors, general: "" });
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <MailIcon className="!text-text-muted/45 !text-[20px]" />
                    </InputAdornment>
                  }
                  className="!w-full !h-10.5 !bg-primary/4 !px-3 !py-2.5 !border !border-primary/7 !rounded-md focus-within:!ring-2 focus-within:!ring-primary/30 dark:focus-within:!ring-primary/70 !transition-all !duration-200"
                  inputProps={{
                    className:
                      "!p-0 !text-sm !text-text-primary placeholder:!text-text-muted",
                  }}
                />
                {errors.email && (
                  <p className="absolute right-0 text-xs text-red-400 min-h-[20px] mt-1.5">
                    {errors.email || ""}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2 relative">
              <label
                htmlFor="Password"
                className="text-text-primary/60 dark:text-text-primary/90 text-sm font-semibold"
              >
                Password
              </label>
              <div>
                <InputBase
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    errors.password && setErrors({ ...errors, password: "" });
                    errors.general && setErrors({ ...errors, general: "" });
                  }}
                  placeholder="Enter Your Password"
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon className="!text-text-muted/45 !text-[20px]" />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        disableRipple
                        className="!text-text-muted hover:!text-text-primary !bg-transparent"
                      >
                        {showPassword ? (
                          <VisibilityIcon className="!text-[20px] !text-text-muted/50 hover:!text-text-muted/70" />
                        ) : (
                          <VisibilityOffIcon className="!text-[20px] !text-text-muted/50 hover:!text-text-muted/70" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  className="!w-full !h-10.5 !bg-primary/4 !px-3 !pr-5 !py-2.5 !border !border-primary/7 !rounded-md focus-within:!ring-2 focus-within:!ring-primary/30 dark:focus-within:!ring-primary/70 !transition-all !duration-200"
                  inputProps={{
                    className:
                      "!p-0 !text-sm !text-text-primary placeholder:!text-text-muted",
                  }}
                />
                {errors.password && (
                  <p className="absolute right-0 text-xs text-red-400 min-h-[20px] mt-1.5">
                    {errors.password || ""}
                  </p>
                )}
              </div>
              <div className="flex justify-between items-center mt-1.5">
                <Link
                  to="/forgot-password"
                  className="text-xs lg:text-sm w-fit font-medium text-primary/70 hover:text-primary/60 transition-colors duration-200"
                >
                  Forgot Password?
                </Link>

                {errors.general && (
                  <p className="text-xs text-danger">{errors.general}</p>
                )}
              </div>
            </div>

            <Button
              variant="contained"
              type="submit"
              onClick={submitHandler}
              disabled={loading}
              className="relative !py-2.5 lg:!py-3 !mt-1 !rounded-xl !capitalize !font-semibold !text-md !text-white !bg-gradient-to-r !from-primary-active !via-primary !to-primary-hover hover:!opacity-90 !transition-all !duration-300 overflow-hidden"
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />

              <span className="relative z-10 flex items-center justify-center gap-2 text-white/90">
                {loading && (
                  <CircularProgress
                    size={18}
                    thickness={5}
                    className="!text-white"
                  />
                )}

                {loading ? "Signing In..." : "Sign In"}
              </span>
            </Button>

            <div className="my-1 flex items-center">
              <div className="h-[1px] flex-1 bg-secondary/15 dark:bg-secondary/40"></div>
              <span className="px-4 text-sm text-secondary/50 text-primary/50">
                OR
              </span>
              <div className="h-[1px] flex-1 bg-secondary/15 dark:bg-secondary/40"></div>
            </div>

            <Button className="!flex !w-full !items-center !justify-center !gap-3 !rounded-xl !border !border-slate-200 !bg-white !py-2.5 lg:!py-3 !font-medium !transition-all duration-200 hover:!bg-slate-50 dark:!border-border dark:!bg-white/5 dark:hover:!bg-white/7 !cursor-pointer !text-text-primary !capitalize">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="h-5 w-5"
              />
              Continue with Google
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
