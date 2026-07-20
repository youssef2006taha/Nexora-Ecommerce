import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Label from "../../../components/UI/Label";
import Input from "../../../components/UI/Input";
import Password from "../../../components/UI/Password";
import Button from "../../../components/UI/Button";

import { loginValidation } from "../../../utils/validation/loginValidation";
import { login } from "../../../features/auth/Thunks/authThunk.js";
import { showToast } from "../../../features/Toast/toastSlice.js";

export default function Login() {
  const loginDispatch = useDispatch();
  const toastDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
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
    <div className="!h-[calc(100vh-64px)] flex items-center justify-center px-4 py-0 overflow-hidden">
      <form className="w-full max-w-[36rem] rounded-2xl border border-border bg-bg-card p-8 shadow">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-active via-primary to-primary-hover bg-clip-text text-transparent">
            Welcome Back
          </h1>

          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-text-muted/90">
            Sign in to continue to your account.
          </p>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2 mb-5">
          <Label value="Email" htmlFor="email" required />

          <div className="relative">
            <Input
              type="text"
              id="email"
              required={true}
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                (errors.email || errors.general) &&
                  setErrors({ ...errors, email: "", general: "" });
              }}
              placeholder="Enter your email"
              icon
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
                  className="size-5"
                >
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
              }
            />
            {errors.email && (
              <p className="absolute right-0 text-xs text-red-400 min-h-[20px] mt-1.5">
                {errors.email || ""}
              </p>
            )}
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <Label value="Password" htmlFor="password" required />

          <div className="relative">
            <Password
              id="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                (errors.password || errors.general) &&
                  setErrors({ ...errors, password: "", general: "" });
              }}
              placeholder="Enter your password"
              startIcon
            />
            {errors.password && (
              <p className="absolute right-0 text-xs text-red-400 min-h-[20px] mt-1.5">
                {errors.password || ""}
              </p>
            )}
          </div>
        </div>

        {/* Forgot Password */}
        <div className="mt-5 flex items-center relative">
          <Link
            to="/forgot-password"
            className="text-xs sm:text-sm font-medium text-primary transition-colors hover:text-primary-hover"
          >
            Forgot Password?
          </Link>
          {errors.general && (
            <p className="absolute right-0 text-xs text-red-400 min-h-[20px] mt-1.5">
              {errors.general || ""}
            </p>
          )}
        </div>

        {/* Button */}
        <div className="mt-5">
          <Button
            type="submit"
            text="Sign In"
            loading={loading}
            loadingText="Signing In"
            variant="primary"
            className="!w-full"
            onClick={loginHandler}
          />
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-border" />

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-text-muted">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
