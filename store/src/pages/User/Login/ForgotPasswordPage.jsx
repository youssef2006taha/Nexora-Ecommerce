import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOTPThunk } from "../../../features/auth/Thunks/SendOTPThunk";
import { useNavigate } from "react-router-dom";

import Label from "../../../components/UI/Label";
import Input from "../../../components/UI/Input";
import Button from "../../../components/UI/Button";

import { forgotPasswordValidation } from "../../../utils/validation/forgotPasswordValidation";

const ForgotPasswordPage = () => {
  const resetPasswordDispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { loading } = useSelector((store) => store.auth);
  const Navigate = useNavigate();
  const [emailValidationError, setEmailValidationError] = useState("");
  const [emailExistError, setEmailExistError] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const validationErrors = forgotPasswordValidation(email);

    setEmailValidationError(validationErrors);

    if (validationErrors) return;

    try {
      await resetPasswordDispatch(sendOTPThunk({ email })).unwrap();

      Navigate("/reset-password", { replace: true });
    } catch (error) {
      if (error === "User not found") {
        setEmailExistError(error);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-bg-main overflow-hidden px-6">
      <div className="flex flex-col gap-6 border border-secondary/10 dark:border-secondary/15 bg-bg-card px-5 py-8 sm:p-10 rounded-4xl shadow min-w-[320px] sm:min-w-[400px]">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex justify-center items-center size-14 rounded-xl border border-secondary/15 dark:border-secondary/40 shadow shadow-secondary/15 dark:shadow-secondary/65">
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
              className="!size-7 text-text-primary/80"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary bg-gradient-to-r from-primary-active via-primary to-primary-hover bg-clip-text text-transparent">
            Forgot Password?
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-text-muted">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        {/* Form */}
        <form>
          <div className="flex flex-col gap-3 !mt-2">
            <Label value="Email" htmlFor="email" />

            <div className="mb-4 relative">
              <Input
                type="text"
                id="email"
                required={true}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  emailValidationError && setEmailValidationError("");
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

              {emailValidationError && (
                <p className="absolute -bottom-6 text-[12px] text-red-400 mt-1.5 min-h-[20px]">
                  {emailValidationError || ""}
                </p>
              )}

              {emailExistError && (
                <p className="absolute -bottom-6 text-[12px] text-red-400 mt-1.5 min-h-[20px]">
                  {emailExistError || ""}
                </p>
              )}
            </div>

            {/* Button */}
            <Button
              variant="primary"
              type="submit"
              loading={loading}
              disabled={loading}
              text="Reset Password"
              loadingText="Sending"
              onClick={resetPasswordHandler}
            />
          </div>
        </form>

        {/* Footer */}
        <div className="text-center text-xs sm:text-sm text-text-muted">
          Remember your password?{" "}
          <button
            onClick={() => Navigate("/login", { replace: true })}
            className="text-primary hover:text-primary-hover font-medium transition-colors cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ForgotPasswordPage);
