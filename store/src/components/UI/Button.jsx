import React from "react";
import { Button, CircularProgress } from "@mui/material";

const CustomButton = ({
  type = "button",
  onClick,
  loading,
  text,
  loadingText,
  startIcon,
  endIcon,
  variant = "primary",
  className,
}) => {
  const variants = {
    primary:
      "!text-white !bg-gradient-to-r !from-primary-active !via-primary !to-primary-hover",

    secondary:
      "!text-text-secondary !bg-transparent !border !border-border hover:!bg-bg-hover dark:hover:!bg-white/5 !shadow-none",
  };

  return (
    <Button
      variant="contained"
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`relative py-2.5 sm:!py-3 !px-6 !rounded-xl !capitalize !font-semibold !text-md !transition-all !duration-300 overflow-hidden group ${variants[variant]} ${className}`}

      startIcon={
        loading ? (
          <CircularProgress size={18} className="!text-white/95" />
        ) : (
          startIcon
        )
      }
      endIcon={!loading ? endIcon : null}
    >
      {/* Overlay */}
      {variant === "primary" && (
        <div className="absolute inset-0 bg-white/25 dark:bg-black/10 group-hover:bg-white/7 transition-all duration-300" />
      )}

      <span
        className={`relative z-10 flex items-center justify-center gap-2 ${
          variant === "primary" ? "text-white/90" : "text-text-secondary"
        }`}
      >
        {loading ? (loadingText ? `${loadingText}...` : text) : text}
      </span>
    </Button>
  );
};

export default React.memo(CustomButton);
