import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Label from "../../../components/UI/Label";
import Input from "../../../components/UI/Input";
import Password from "../../../components/UI/Password";
import Button from "../../../components/UI/Button";

import { registerValidation } from "../../../utils/validation/registerValidation";
import { sendRegisterOTP } from "../../../features/auth/Thunks/sendRegisterOTP";
import { showToast } from "../../../features/Toast/toastSlice";

export default function Register() {
  const authDispatch = useDispatch();
  const toastDispatch = useDispatch();

  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const registerHandler = async (e) => {
    e.preventDefault();

    const validationErrors = registerValidation(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await authDispatch(
        sendRegisterOTP({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      ).unwrap();

      navigate("/verify-otp");
    } catch (error) {
      if (error === "Email already exists") {
        setErrors((prev) => ({
          ...prev,
          general: "Email already exists.",
        }));
      } else {
        toastDispatch(
          showToast({
            message: error || "Failed to create account.",
            severity: "error",
          }),
        );
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-6">
      <form
        onSubmit={registerHandler}
        className="w-full max-w-[36rem] rounded-2xl border border-border bg-bg-card p-8 shadow"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-active via-primary to-primary-hover bg-clip-text text-transparent">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-text-muted/90">
            Create your account to start shopping.
          </p>
        </div>

        {/* Full Name */}
        <div className="flex flex-col gap-2 mb-5">
          <Label value="Full Name" htmlFor="name" required />

          <div className="relative">
            <Input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });

                (errors.username || errors.general) &&
                  setErrors({
                    ...errors,
                    username: "",
                    general: "",
                  });
              }}
              placeholder="Enter your full name"
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
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              }
            />

            {errors.username && (
              <p className="absolute right-0 mt-1.5 min-h-[20px] text-xs text-red-400">
                {errors.username}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2 mb-5">
          <Label value="Email" htmlFor="email" required />

          <div className="relative">
            <Input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });

                (errors.email || errors.general) &&
                  setErrors({
                    ...errors,
                    email: "",
                    general: "",
                  });
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
              <p className="absolute right-0 mt-1.5 min-h-[20px] text-xs text-red-400">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2 mb-5">
          <Label value="Phone" htmlFor="phone" required />

          <div className="relative">
            <Input
              type="text"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });

                (errors.phone || errors.general) &&
                  setErrors({
                    ...errors,
                    phone: "",
                    general: "",
                  });
              }}
              placeholder="Enter your phone number"
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
                  className="lucide lucide-phone-icon lucide-phone size-5"
                >
                  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                </svg>
              }
            />

            {errors.phone && (
              <p className="absolute right-0 mt-1.5 min-h-[20px] text-xs text-red-400">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2 mb-5">
          <Label value="Password" htmlFor="password" required />

          <div className="relative">
            <Password
              id="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  password: e.target.value,
                });

                (errors.password || errors.general) &&
                  setErrors({
                    ...errors,
                    password: "",
                    general: "",
                  });
              }}
              placeholder="Enter your password"
              startIcon
            />

            {errors.password && (
              <p className="absolute right-0 mt-1.5 min-h-[20px] text-xs text-red-400">
                {errors.password}
              </p>
            )}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <Label value="Confirm Password" htmlFor="confirmPassword" required />

          <div className="relative">
            <Password
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                });

                (errors.confirmPassword || errors.general) &&
                  setErrors({
                    ...errors,
                    confirmPassword: "",
                    general: "",
                  });
              }}
              placeholder="Confirm your password"
              startIcon
            />

            {errors.confirmPassword && (
              <p className="absolute right-0 mt-1.5 min-h-[20px] text-xs text-red-400">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        {/* General Error */}
        <div className="mt-5 flex items-center justify-end min-h-[20px]">
          {errors.general && (
            <p className="text-xs text-red-400">{errors.general}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-2">
          <Button
            type="submit"
            text="Create Account"
            loading={loading}
            loadingText="Creating Account"
            variant="primary"
            className="!w-full"
            onClick={registerHandler}
          />
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-border" />

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-text-muted">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
