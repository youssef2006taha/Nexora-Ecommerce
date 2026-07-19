import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { hideToast } from "../../../features/Toast/toastSlice.js";
import { useDispatch } from "react-redux";

const Toast = ({ open, message, severity }) => {
  const toastDispatch = useDispatch();

  const closeHandler = () => {
    toastDispatch(hideToast());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={closeHandler}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      className="z-toast"
    >
      <Alert
        onClose={closeHandler}
        severity={severity}
        variant="filled"
        className={`!border shadow-lg font-medium rounded-[var(--radius-md-value)] 
          !text-text-primary !bg-bg-surface
          ${
            severity === "success"
              ? "!border-success/30 [&_.MuiAlert-icon]:!text-[var(--success)]"
              : "!border-danger/30 [&_.MuiAlert-icon]:!text-[var(--danger)]"
          }`}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default React.memo(Toast);