import React from "react";
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

const RegisterForm = () => {
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
    <div className="w-full flex items-center justify-center">
      <form
        onSubmit={registerHandler}
        className="w-full rounded-2xl lg:border border-border bg-bg-card p-6 sm:p-8 max-md:border-t md:border-l shadow"
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-active via-primary to-primary-hover bg-clip-text text-transparent">
            Create Account
          </h1>

          <p className="mt-2 text-xs md:text-sm text-text-muted">
            Create your account to start shopping.
          </p>
        </div>

        {/* Full Name */}
        <div className="relative flex flex-col gap-2 mb-6">
          <Label value="Full Name" htmlFor="name" required />

          <Input
            type="text"
            id="name"
            required
            value={formData.username}
            onChange={(e) => {
              setFormData({
                ...formData,
                username: e.target.value,
              });

              if (errors.username || errors.general) {
                setErrors({
                  ...errors,
                  username: "",
                  general: "",
                });
              }
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
            <p className="absolute right-0 -bottom-6 text-xs text-red-400">
              {errors.username}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="relative flex flex-col gap-2 mb-6">
          <Label value="Email" htmlFor="email" required />

          <Input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => {
              setFormData({
                ...formData,
                email: e.target.value,
              });

              if (errors.email || errors.general) {
                setErrors({
                  ...errors,
                  email: "",
                  general: "",
                });
              }
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
            <p className="absolute right-0 -bottom-6 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="relative flex flex-col gap-2 mb-6">
          <Label value="Phone" htmlFor="phone" required />

          <Input
            type="text"
            id="phone"
            required
            value={formData.phone}
            onChange={(e) => {
              setFormData({
                ...formData,
                phone: e.target.value,
              });

              if (errors.phone || errors.general) {
                setErrors({
                  ...errors,
                  phone: "",
                  general: "",
                });
              }
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
                className="size-5"
              >
                <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
              </svg>
            }
          />

          {errors.phone && (
            <p className="absolute right-0 -bottom-6 text-xs text-red-400">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="relative flex flex-col gap-2 mb-6">
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

              if (errors.password || errors.general) {
                setErrors({
                  ...errors,
                  password: "",
                  general: "",
                });
              }
            }}
          />

          {errors.password && (
            <p className="absolute right-0 -bottom-6 text-xs text-red-400">
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative flex flex-col gap-2">
          <Label value="Confirm Password" htmlFor="confirmPassword" required />

          <Password
            id="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm your password"
            startIcon
            onChange={(e) => {
              setFormData({
                ...formData,
                confirmPassword: e.target.value,
              });

              if (errors.confirmPassword || errors.general) {
                setErrors({
                  ...errors,
                  confirmPassword: "",
                  general: "",
                });
              }
            }}
          />

          {errors.confirmPassword && (
            <p className="absolute right-0 -bottom-6 text-xs text-red-400">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* General Error */}
        <div className="my-2 flex justify-end items-center min-h-5">
          {errors.general && (
            <p className="text-xs text-red-400">{errors.general}</p>
          )}
        </div>

        {/* Button */}
        <Button
          type="submit"
          text="Create Account"
          loading={loading}
          loadingText="Creating Account"
          variant="primary"
          className="!w-full"
          onClick={registerHandler}
        />

        {/* Divider */}
        <div className="my-6 h-px bg-border" />

        {/* Footer */}
        <p className="text-center text-xs md:text-sm text-text-muted">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary hover:text-primary-hover"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default React.memo(RegisterForm);
