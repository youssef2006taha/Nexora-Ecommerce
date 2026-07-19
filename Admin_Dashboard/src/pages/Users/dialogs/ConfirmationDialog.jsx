import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonColor = "!bg-blue-500",
}) => {
  const [loading, setLoading] = useState(false);

  const confirmHandler = async () => {
    try {
      setLoading(true);
      await onConfirm?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={!loading ? onClose : undefined}
      slotProps={{
        backdrop: {
          className: "!bg-black/75 dark:!bg-black/60",
        },

        paper: {
          className:
            "!bg-gray-200 dark:!bg-slate-800 !border !border-slate-700/90 !rounded-2xl !max-h-[80vh] !w-screen sm:!w-[35vw]",
        },
      }}
      disableScrollLock
    >
      <DialogTitle className="!text-black dark:!text-white/95 !pb-2 !font-semibold">
        {title}
      </DialogTitle>

      <DialogContent>
        <DialogContentText className="!text-gray-900 dark:!text-white/70 !text-sm">
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions className="!px-4 !pb-4">
        <Button
          onClick={onClose}
          disabled={loading}
          variant="text"
          className="!text-black dark:!text-white/80 hover:!bg-transparent"
        >
          {cancelText}
        </Button>

        <Button
          loading={loading}
          variant="contained"
          onClick={confirmHandler}
          className={`${confirmButtonColor} !font-semibold !rounded-md`}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
