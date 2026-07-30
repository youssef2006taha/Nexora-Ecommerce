import React from "react";
import { Chip, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomChip = ({ label, onDelete }) => {
  return (
    <Chip
      label={label}
      className="!w-fit !bg-primary/5 !text-primary/80 !capitalize !font-semibold !border !border-primary/15"
      deleteIcon={
        <IconButton className="!flex !items-center !justify-center !bg-primary/12 hover:!bg-primary/20 !size-3 sm:!size-4.75">
          <CloseIcon className="!text-[11px] sm:!text-[13px] !text-primary" />
        </IconButton>
      }
      onDelete={onDelete}
    />
  );
};

export default React.memo(CustomChip);
