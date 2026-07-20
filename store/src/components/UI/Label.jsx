import React from "react";
import { InputLabel } from "@mui/material";

const Label = ({ value, required = true, htmlFor, asterisk = false }) => {
  return (
    <InputLabel
      required={required}
      htmlFor={htmlFor}
      className={`!capitalize !font-bold !text-secondary/85 !text-xs ${asterisk ? "[&_.MuiFormLabel-asterisk]:!text-red-500" : "[&_.MuiFormLabel-asterisk]:!text-transparent"}`}
    >
      {value}
    </InputLabel>
  );
};

export default React.memo(Label);
