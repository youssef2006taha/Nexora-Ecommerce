import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendRegisterOTP } from "../../../features/auth/Thunks/sendRegisterOTP.js";
// import { verifyResetOTPThunk } from "../../../features/auth/Thunks/verifyResetOTPThunk";
import { verifyRegisterOTPValidation } from "../../../utils/validation/verifyRegisterOTPValidation.js";
import { showToast } from "../../../features/Toast/toastSlice.js";

import { CircularProgress } from "@mui/material";
import OTPField from "./OTPField.jsx";
import Button from "../../../components/UI/Button.jsx";

const VerifyResetOTPPage = () => {
  const otpLength = 6;
  const [otp, setOtp] = useState(Array(otpLength).fill(""));
  const { newUserData } = useSelector((store) => store.auth);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const toastDispatch = useDispatch();

  const [timer, setTimer] = useState(0);

  const resendOTPDispatch = useDispatch();
  // const verifyOTPDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  console.log("newUserData", newUserData);
  // check user data
  useEffect(() => {
    if (
      !newUserData.username ||
      !newUserData.email ||
      !newUserData.phone ||
      !newUserData.password
    ) {
      navigate("/login", { replace: true });
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
      await resendOTPDispatch(sendRegisterOTP(newUserData)).unwrap();

      setTimer(60);
    } catch (error) {
      console.log(error);
    } finally {
      setResendLoading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const validationErrors = verifyRegisterOTPValidation(otp);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      toastDispatch(
        showToast({
          message: "Account created successfully.",
          severity: "success",
        }),
      );

      navigate("/login", { replace: true });
    } catch (error) {
      toastDispatch(
        showToast({
          message: error || "Failed to create account.",
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
        <div className="mb-2">
          <OTPField otp={otp} setOtp={setOtp} />
          {errors.otp && (
            <p className="text-[12px] text-red-400 min-h-[20px] !mt-2">
              {errors.otp || ""}
            </p>
          )}
        </div>

        {/* Button */}
        <Button
          type="submit"
          text="Verify Account"
          loadingText="Verifying"
          variant="primary"
          disabled={loading}
          loading={loading}
          onClick={submitHandler}
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
