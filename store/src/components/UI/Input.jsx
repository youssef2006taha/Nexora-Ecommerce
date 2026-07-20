import React from "react";
import { InputBase, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Input = ({
  type = "text",
  id,
  value,
  onChange,
  placeholder,
  icon = false,
  startIcon,
  className = "",
  ...props
}) => {
  return (
    <InputBase
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
      className={`!w-full !h-10.5 !bg-primary/4 !px-3 !pr-5 !py-2.5 !border !border-primary/7 !rounded-md focus-within:!ring-2 focus-within:!ring-primary/30 dark:focus-within:!ring-primary/70 !transition-all !duration-200 ${className}`}
      inputProps={{
        className:
          "!p-0 !text-sm !text-text-primary placeholder:!text-text-muted",
      }}
      startAdornment={
        (icon || startIcon) && (
          <InputAdornment position="start">
            {<div className="!text-text-muted/45">{startIcon}</div> || <SearchIcon className="!text-text-muted !text-xl" />}
          </InputAdornment>
        )
      }
    />
  );
};

export default React.memo(Input);
