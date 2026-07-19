import React from "react";
import { useState } from "react";
import { InputBase, InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";

const Password = ({
  id,
  value,
  onChange,
  placeholder,
  startIcon = false,
  required = true,
}) => {
  // Control Password Visibility
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputBase
      id={id}
      type={showPassword ? "text" : "password"}
      required={required}
      value={value}
      onChange={onChange}
      placeholder={placeholder || "Min. 6 characters"}
      startAdornment={
        startIcon && (
          <InputAdornment position="start">
            <LockIcon className="!text-text-muted/45 !text-[20px]" />
          </InputAdornment>
        )
      }
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            onClick={() => setShowPassword((prev) => !prev)}
            edge="end"
            disableRipple
            className="!text-text-muted hover:!text-text-primary !bg-transparent"
          >
            {showPassword ? (
              <VisibilityIcon className="!text-[20px] !text-text-muted/50 hover:!text-text-muted/70" />
            ) : (
              <VisibilityOffIcon className="!text-[20px] !text-text-muted/50 hover:!text-text-muted/70" />
            )}
          </IconButton>
        </InputAdornment>
      }
      className="!w-full !h-10.5 !bg-primary/4 !px-3 !pr-5 !py-2.5 !border !border-primary/7 !rounded-md focus-within:!ring-2 focus-within:!ring-primary/30 dark:focus-within:!ring-primary/70 !transition-all !duration-200"
      inputProps={{
        className:
          "!p-0 !text-sm !text-text-primary placeholder:!text-text-muted",
      }}
    />
  );
};

export default React.memo(Password);
