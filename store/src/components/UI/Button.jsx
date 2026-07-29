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
      "!text-white !rounded-xl !bg-gradient-to-r !from-primary-active !via-primary !to-primary-hover",

    secondary:
      "!text-secondary/80 !rounded-xl !bg-transparent !border !border-border hover:!bg-bg-hover dark:hover:!bg-white/5 !shadow-none",

    outlined:
      "!bg-primary/5 !rounded-lg !border-2 !border-primary/20 !text-primary/80 hover:!bg-primary/10 dark:hover:!bg-primary dark:hover:!text-white !shadow-none",
  };

  return (
    <Button
      variant="contained"
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`relative !capitalize !font-semibold !text-md !transition-all !duration-300 overflow-hidden group ${variants[variant]} ${className}`}
      startIcon={
        loading ? (
          <CircularProgress
            size={16}
            thickness={4}
            className={
              variant === "primary" ? "!text-white/95" : "!text-primary"
            }
          />
        ) : (
          startIcon
        )
      }
      endIcon={!loading ? endIcon : null}
    >
      {variant === "primary" && (
        <div className="absolute inset-0 bg-white/25 dark:bg-black/10 group-hover:bg-white/7 transition-all duration-300" />
      )}

      <span className={`relative z-10 flex items-center justify-center gap-2 `}>
        {loading ? (loadingText ? `${loadingText}...` : text) : text}
      </span>
    </Button>
  );
};

export default React.memo(CustomButton);
