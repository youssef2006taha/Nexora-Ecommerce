import React from "react";
import { InputLabel } from "@mui/material";

const Label = ({ value, required = false, htmlFor }) => {
  return (
    <InputLabel
      required={required}
      htmlFor={htmlFor}
      className="!uppercase !text-secondary/70 dark:!text-secondary/80 !text-xs [&_.MuiFormLabel-asterisk]:!text-red-500"
    >
      {value}
    </InputLabel>
  );
};

export default React.memo(Label);
