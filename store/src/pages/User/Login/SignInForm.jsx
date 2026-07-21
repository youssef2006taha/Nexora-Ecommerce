import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginValidation } from "../../../utils/validation/loginValidation";
import { login } from "../../../features/auth/Thunks/authThunk.js";
import { showToast } from "../../../features/Toast/toastSlice.js";

import Label from "../../../components/UI/Label";
import Input from "../../../components/UI/Input";
import Password from "../../../components/UI/Password";
import Button from "../../../components/UI/Button";

const SignInForm = () => {
  const loginDispatch = useDispatch();
  const toastDispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const loginHandler = async (e) => {
    e.preventDefault();

    const validationErrors = loginValidation(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await loginDispatch(login(formData)).unwrap();

      toastDispatch(
        showToast({
          message: "Signed in successfully.",
          severity: "success",
        }),
      );

      const from = location.state?.from || "/";

      navigate(from, { replace: true });
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
    <div className="w-full flex items-center justify-center">
      <form className="w-full rounded-2xl lg:border border-border bg-bg-card p-6 sm:p-8 max-md:border-t md:border-l border-border shadow">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-active via-primary to-primary-hover bg-clip-text text-transparent">
            Sign In
          </h1>

          <p className="mt-2 text-xs md:text-sm text-text-muted">
            Sign in to continue to your account
          </p>
        </div>

        {/* Email */}
        <div className="relative flex flex-col gap-2 mb-6">
          <Label value="Email" htmlFor="email" required />

          <Input
            type="email"
            id="email"
            value={formData.email}
            placeholder="Enter your email"
            icon
            startIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-5"
              >
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
            }
            onChange={(e) => {
              setFormData({
                ...formData,
                email: e.target.value,
              });

              if (errors.email || errors.general)
                setErrors({
                  ...errors,
                  email: "",
                  general: "",
                });
            }}
          />

          {errors.email && (
            <p className="absolute right-0 -bottom-6 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2 relative">
          <Label value="Password" htmlFor="password" required />

          <Password
            id="password"
            value={formData.password}
            placeholder="Enter your password"
            startIcon
            onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value,
              });

              if (errors.password || errors.general)
                setErrors({
                  ...errors,
                  password: "",
                  general: "",
                });
            }}
          />

          {errors.password && (
            <p className="absolute right-0 -bottom-6 text-xs text-red-400">
              {errors.password}
            </p>
          )}
        </div>

        {/* Forgot */}
        <div className="my-5 flex justify-between items-center">
          <Link
            to="/forgot-password"
            className="text-xs md:text-sm font-medium text-primary hover:text-primary-hover"
          >
            Forgot Password?
          </Link>

          {errors.general && (
            <p className="text-xs text-red-400">{errors.general}</p>
          )}
        </div>

        {/* Button */}
        <Button
          type="submit"
          text="Sign In"
          loading={loading}
          loadingText="Signing In"
          variant="primary"
          className="!w-full mt-6"
          onClick={loginHandler}
        />

        <div className="my-6 h-px bg-border" />

        <p className="text-center text-xs md:text-sm text-text-muted">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-primary hover:text-primary-hover"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default React.memo(SignInForm);
