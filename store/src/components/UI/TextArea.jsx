import React from "react";
import { InputBase } from "@mui/material";

const TextArea = ({
  id,
  value,
  onChange,
  placeholder,
  rows = 4,
  className = "",
  ...props
}) => {
  return (
    <InputBase
      multiline
      rows={rows}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
      className={`!w-full !bg-primary/4 !px-3 !py-2.5 !border !border-primary/7 !rounded-md focus-within:!ring-2 focus-within:!ring-primary/30 dark:focus-within:!ring-primary/70 !transition-all !duration-200 ${className}`}
      inputProps={{
        className:
          "!p-0 !text-sm !text-text-primary placeholder:!text-text-muted !resize-none",
      }}
    />
  );
};

export default React.memo(TextArea);
