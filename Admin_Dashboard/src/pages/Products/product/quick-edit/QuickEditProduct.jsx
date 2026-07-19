import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import QuickEditProductForm from "./components/QuickEditProductForm";

const QuickEditProduct = ({ open, onClose, product }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="!w-screen"
      slotProps={{
        paper: {
          className:
            "!rounded-3xl !bg-bg-card !border !border-border !shadow-2xl !max-w-none !w-[90vw] !m-0",
        },
      }}
    >
      {/* Header */}
      <DialogTitle className="!px-6 !py-5 !border-b-2 !border-secondary/9">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 text-primary/75 font-semibold text-lg">
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
              className="lucide lucide-square-pen-icon lucide-square-pen size-5.5"
            >
              <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
            </svg>
            <h3>Edit Product</h3>
          </div>
          <IconButton
            onClick={onClose}
            disableRipple
            className="!text-secondary/80 hover:!text-secondary/100 hover:!bg-bg-hover/50 !transition-all !duration-200"
          >
            <CloseIcon className="!text-[22px]" />
          </IconButton>
        </div>
      </DialogTitle>

      {/* Content */}
      <DialogContent className="!p-0 sm:!p-4 hide-scrollbar">
        <QuickEditProductForm product={product} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(QuickEditProduct);
