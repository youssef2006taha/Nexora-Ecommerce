import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination, PaginationItem } from "@mui/material";
import { setPage } from "../../../features/users/usersSlice";

const FooterPagination = () => {
  const { currentPage, totalPages } = useSelector((store) => store.users);
  const dispatch = useDispatch();

  const paginationHandler = (_, value) => {
    dispatch(setPage(value));
  };
  return (
    <div className="flex justify-between items-center">
      <p className="text-xs text-text-primary/80">{`Page ${currentPage} of ${totalPages}`}</p>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={paginationHandler}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            className={`!rounded-lg !border !border-secondary/20 !text-text-primary/90  dark:!border-secondary/20 ${item.selected ? "!bg-primary/85 !text-white !border-primary hover:!bg-primary" : "hover:!bg-secondary/10"}`}
          />
        )}
      />
    </div>
  );
};

export default React.memo(FooterPagination);
