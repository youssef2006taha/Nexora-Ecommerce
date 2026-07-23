import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOTPThunk } from "../../../features/auth/Thunks/SendOTPThunk";
import { verifyResetOTPThunk } from "../../../features/auth/Thunks/verifyResetOTPThunk";
import { verifyOTPValidation } from "../../../utils/validation/verifyOTPValidation.js";
import { showToast } from "../../../features/Toast/toastSlice.js";

import { CircularProgress } from "@mui/material";
import OTPField from "./OTPField.jsx";
import Password from "../../../components/UI/Password.jsx";
import Button from "../../../components/UI/Button.jsx";

const VerifyResetOTPPage = () => {
  const otpLength = 6;
  const [otp, setOtp] = useState(Array(otpLength).fill(""));
  const [formData, setFormData] = useState({ input1: "", input2: "" });
  const [errors, setErrors] = useState({ input1: "", input2: "", otp: "" });
  const { email } = useSelector((store) => store.auth);
  const Navigate = useNavigate();
  const toastDispatch = useDispatch();

  const [timer, setTimer] = useState(0);

  const resendOTPDispatch = useDispatch();
  const verifyOTPDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // check email exist
  useEffect(() => {
    if (!email) {
      Navigate("/login", { replace: true });
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  // resend OTP Timer
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const resendOTPHandler = async () => {
    if (timer > 0 || resendLoading) return;

    try {
      setResendLoading(true);
      await resendOTPDispatch(sendOTPThunk({ email: email })).unwrap();

      setTimer(60);
    } catch (error) {
      console.log(error);
    } finally {
      setResendLoading(false);
    }
  };

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const validationErrors = verifyOTPValidation({ ...formData, otp });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      await verifyOTPDispatch(
        verifyResetOTPThunk({
          email: email.trim(),
          otp: otp.join(""),
          newPassword: formData.input1.trim(),
        }),
      ).unwrap();

      toastDispatch(
        showToast({
          message: "Password reset successfully.",
          severity: "success",
        }),
      );

      Navigate("/login", { replace: true });
    } catch (error) {
      toastDispatch(
        showToast({
          message: error || "Failed to reset password.",
          severity: "error",
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-bg-main overflow-hidden px-6">
      <div className="flex flex-col gap-6 border border-secondary/10 dark:border-secondary/15 bg-bg-card p-8 rounded-4xl shadow">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-active via-primary to-primary-hover bg-clip-text text-transparent">
            Verify OTP
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-text-muted">
            Enter the 6-digit verification code sent to your email and choose a
            new password.
          </p>
        </div>

        {/* OTP */}
        <div>
          <OTPField otp={otp} setOtp={setOtp} />
          {errors.otp && (
            <p className="text-[12px] text-red-400 min-h-[20px] !mt-2">
              {errors.otp || ""}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <Password
            placeholder="New Password"
            value={formData.input1}
            onChange={(e) =>
              setFormData({ ...formData, input1: e.target.value })
            }
          />
          {errors.input1 && (
            <p className="text-[12px] text-red-400 min-h-[20px] !mt-2">
              {errors.input1 || ""}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <Password
            placeholder="Confirm Password"
            value={formData.input2}
            onChange={(e) =>
              setFormData({ ...formData, input2: e.target.value })
            }
          />
          {errors.input2 && (
            <p className="text-[12px] text-red-400 min-h-[20px] !mt-2">
              {errors.input2 || ""}
            </p>
          )}
        </div>

        {/* Button */}
        <Button
          type="submit"
          text="Reset Password"
          loadingText="Resetting"
          variant="primary"
          disabled={loading}
          loading={loading}
          onClick={resetPasswordHandler}
        />

        {/* Resend */}
        <div className="text-center text-xs sm:text-sm text-text-muted">
          Didn't receive the code?{" "}
          <button
            disabled={timer > 0 || resendLoading}
            className={`font-medium transition-colors ${
              timer > 0 || resendLoading
                ? "text-text-muted cursor-not-allowed"
                : "text-primary hover:text-primary-hover cursor-pointer"
            }`}
            onClick={resendOTPHandler}
          >
            {resendLoading ? (
              <span className="inline-flex items-center gap-2">
                <CircularProgress size={14} className="!text-primary !ml-1.5" />
                Sending...
              </span>
            ) : timer > 0 ? (
              `Resend OTP in ${timer}s`
            ) : (
              "Resend OTP"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(VerifyResetOTPPage);
