import React from "react";
import { Pagination, PaginationItem } from "@mui/material";

const PaginationComponent = ({
  totalPages,
  currentPage,
  paginationHandler,
}) => {
  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={paginationHandler}
      siblingCount={1}
      boundaryCount={0}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          className={`!rounded-lg !border !border-secondary/20 !text-text-primary/90  dark:!border-secondary/20 ${item.selected ? "!bg-primary/85 !text-white !border-primary hover:!bg-primary" : "hover:!bg-secondary/10"}`}
        />
      )}
    />
  );
};

export default React.memo(PaginationComponent);
