import React from "react";
import { Select, MenuItem } from "@mui/material";

const SelectComponent = ({
  id,
  value,
  onChange,
  menuItems = [],
  classNames,
}) => {
  return (
    <Select
      id={id}
      displayEmpty
      value={value}
      onChange={onChange}
      className={`!w-full !h-10.5 !bg-primary/4 !text-sm !text-text-primary !rounded-md !outline-0 !transition-all !duration-200 [&_.MuiOutlinedInput-notchedOutline]:!border-1 [&_.MuiOutlinedInput-notchedOutline]:!border-border [&.Mui-focused_.MuiOutlinedInput-notchedOutline]:!border-0 [&.Mui-focused_.MuiOutlinedInput-notchedOutline]:!ring-2 [&.Mui-focused_.MuiOutlinedInput-notchedOutline]:!ring-primary/30 dark:[&.Mui-focused_.MuiOutlinedInput-notchedOutline]:!ring-primary/70 [&_.MuiSelect-icon]:!text-text-primary/60 ${classNames}`}
      MenuProps={{
        slotProps: {
          paper: {
            className:
              "!bg-bg-card !text-text-primary !border !border-border !rounded-lg",
          },
        },
      }}
    >
      {menuItems.map((category) => (
        <MenuItem
          value={category}
          key={category}
          className="!text-sm !py-2 !transition !duration-100 hover:!bg-bg-hover [&.Mui-selected]:!bg-primary/25 [&.Mui-selected:hover]:!bg-primary/25 dark:[&.Mui-selected]:!bg-primary/50"
        >
          {category}
        </MenuItem>
      ))}
    </Select>
  );
};

export default React.memo(SelectComponent);
