import React, { useState } from "react";
import { Button, CircularProgress, InputBase } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { sendOTPThunk } from "../../features/auth/Thunks/SendOTPThunk";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const resetPasswordDispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { loading } = useSelector((store) => store.auth);
  const Navigate = useNavigate();
  const [emailError, setEmailError] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    try {
      await resetPasswordDispatch(sendOTPThunk({ email })).unwrap();

      Navigate("/reset-password", { replace: true });
    } catch (error) {
      if (error === "User not found") {
        setEmailError(error);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-bg-main overflow-hidden px-6">
      <div className="flex flex-col gap-6 border border-secondary/10 dark:border-secondary/15 bg-bg-card px-5 py-8 sm:p-10 rounded-4xl shadow-lg shadow-secondary/10 dark:shadow-secondary/30 min-w-[320px] sm:min-w-[400px]">
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
        <form onSubmit={resetPasswordHandler}>
          <div className="flex flex-col gap-3 !mt-2">
            <label
              htmlFor="email"
              className="text-text-primary/90 text-xs sm:text-[13px] font-semibold"
            >
              Email
            </label>

            <div>
              <InputBase
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="w-full !bg-primary/4 !py-2.5 !px-4 !text-text-primary !border !border-border !rounded-xl focus-within:!ring-2 focus-within:!ring-primary/40"
                inputProps={{
                  className:
                    "!text-sm !text-text-primary/90 placeholder:!text-text-muted",
                }}
              />
              {emailError && (
                <p className="text-sm text-red-400 mt-1.5 min-h-[20px]">
                  {emailError || ""}
                </p>
              )}
            </div>

            {/* Button */}
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              className="relative !mt-3 !py-2.5 lg:!py-3 !mt-1 !rounded-xl !capitalize !font-semibold !text-md !text-white !bg-gradient-to-r !from-primary-active !via-primary !to-primary-hover hover:!opacity-90 !transition-all !duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
              {loading ? (
                <div className="flex items-center gap-2">
                  <CircularProgress
                    size={18}
                    thickness={5}
                    className="!text-white"
                  />
                  <span className="text-white/90 relative z-10">
                    Sending...
                  </span>
                </div>
              ) : (
                <span className="text-white/90 relative z-10">
                  Reset Password
                </span>
              )}
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center text-xs sm:text-sm text-text-muted">
          Remember your password?{" "}
          <button
            onClick={() => Navigate("/login", { replace: true })}
            className="text-primary hover:text-primary-hover font-medium transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ForgotPasswordPage);
