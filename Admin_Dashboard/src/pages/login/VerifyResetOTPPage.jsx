import React from "react";
import {
  Button,
  InputBase,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOTPThunk } from "../../features/auth/Thunks/SendOTPThunk";
import { verifyResetOTPThunk } from "../../features/auth/Thunks/verifyResetOTPThunk";
import { showToast } from "../../features/Toast/toastSlice.js";

// icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const VerifyResetOTPPage = () => {
  const length = 6;
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [formData, setFormData] = useState({ input1: "", input2: "" });
  const [errors, setErrors] = useState({ input1: "", input2: "", otp: "" });
  const { email } = useSelector((store) => store.auth);
  const inputRefs = useRef([]);
  const Navigate = useNavigate();
  const toastDispatch = useDispatch();

  // Control Password Visibility
  const [showPassword, setShowPassword] = useState({
    input1: false,
    input2: false,
  });

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

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value[0];

    setOtp(newOtp);

    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      return;
    }

    if (e.key !== "Backspace") return;

    const newOtp = [...otp];

    if (newOtp[index]) {
      newOtp[index] = "";
      setOtp(newOtp);
    } else if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pasted) return;

    const newOtp = Array(length).fill("");

    pasted.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const lastIndex = Math.min(pasted.length - 1, length - 1);
    inputRefs.current[lastIndex]?.focus();
  };

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

  const validate = () => {
    const newErrors = {};

    if (otp.includes("")) {
      newErrors.otp = "Please enter the complete 6-digit verification code.";
    }

    if (!formData.input1.trim()) {
      newErrors.input1 = "Password is required.";
    } else if (formData.input1.length < 6) {
      newErrors.input1 = "Password must be at least 6 characters.";
    }

    if (!formData.input2.trim()) {
      newErrors.input2 = "Confirm password is required.";
    } else if (formData.input1 !== formData.input2) {
      newErrors.input2 = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    if (!validate()) return;

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
    <div className="flex justify-center items-center w-screen h-screen bg-bg-main overflow-hidden px-6">
      <div className="flex flex-col gap-6 border border-secondary/10 dark:border-secondary/15 bg-bg-card p-8 rounded-4xl shadow-lg shadow-secondary/10 dark:shadow-secondary/30">
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
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <InputBase
                key={index}
                value={digit}
                inputRef={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                inputProps={{
                  maxLength: 1,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  className:
                    "!text-center !text-[22px] !font-bold !text-text-primary",
                }}
                className="!size-8 sm:!size-12 !rounded-xl !border !border-primary/15 dark:!border-primary/30 !bg-primary/4 focus-within:!ring-2 focus-within:!ring-primary/40"
              />
            ))}
          </div>
          {errors.otp && (
            <p className="text-[12px] text-red-400 min-h-[20px] !mt-2">
              {errors.otp || ""}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <InputBase
            type={showPassword.input1 ? "text" : "password"}
            placeholder="New Password"
            value={formData.input1}
            onChange={(e) =>
              setFormData({ ...formData, input1: e.target.value })
            }
            className="w-full !text-sm !bg-primary/4 !py-2 sm:!py-2.5 !px-4 !text-text-primary !border !border-border !rounded-xl focus-within:!ring-2 focus-within:!ring-primary/40"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      input1: !prev.input1,
                    }))
                  }
                  edge="end"
                  disableRipple
                  className="!text-slate-400/60 hover:!text-slate-400/75 !bg-transparent dark:!text-slate-500 dark:hover:!text-slate-400 !transition !duration-100"
                >
                  {!showPassword.input1 ? (
                    <VisibilityOffIcon className="!size-5" />
                  ) : (
                    <VisibilityIcon className="!size-5" />
                  )}
                </IconButton>
              </InputAdornment>
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
          <InputBase
            type={showPassword.input2 ? "text" : "password"}
            placeholder="Confirm Password"
            value={formData.input2}
            onChange={(e) =>
              setFormData({ ...formData, input2: e.target.value })
            }
            className="w-full !text-sm !bg-primary/4 !py-2 sm:!py-2.5 !px-4 !text-text-primary !border !border-border !rounded-xl focus-within:!ring-2 focus-within:!ring-primary/40"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      input2: !prev.input2,
                    }))
                  }
                  edge="end"
                  disableRipple
                  className="!text-slate-400/60 hover:!text-slate-400/75 !bg-transparent dark:!text-slate-500 dark:hover:!text-slate-400 !transition !duration-100"
                >
                  {!showPassword.input2 ? (
                    <VisibilityOffIcon className="!size-5" />
                  ) : (
                    <VisibilityIcon className="!size-5" />
                  )}
                </IconButton>
              </InputAdornment>
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
          variant="contained"
          disabled={loading}
          onClick={resetPasswordHandler}
          className="relative !py-2.5 lg:!py-3 !mt-1 !rounded-xl !capitalize !font-semibold !text-md !text-white !bg-gradient-to-r !from-primary-active !via-primary !to-primary-hover hover:!opacity-90 !transition-all !duration-300 overflow-hidden"
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
          {loading ? (
            <div className="flex items-center gap-2">
              <CircularProgress
                size={18}
                thickness={5}
                className="!text-white"
              />
              <span className="text-white/90 relative z-10">Resetting...</span>
            </div>
          ) : (
            <span className="text-white/90 relative z-10">Reset Password</span>
          )}
        </Button>

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
