import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setFiltersProducts } from "../../../features/products/productsSlice";

import { Button } from "@mui/material";
import Chip from "../../../components/UI/Chip";

const ActiveFilters = () => {
  const { filters } = useSelector((store) => store.products);
  const dispatch = useDispatch();

  return (
    <div className="flex gap-2 items-center flex-wrap">
      {filters.category !== "All Categories" && (
        <Chip
          label={filters.category}
          onDelete={() =>
            dispatch(
              setFiltersProducts({
                ...filters,
                category: "All Categories",
              }),
            )
          }
        />
      )}

      {filters.minPrice !== "" && (
        <Chip
          label={`Min: ${filters.minPrice}`}
          onDelete={() =>
            dispatch(
              setFiltersProducts({
                ...filters,
                minPrice: "",
              }),
            )
          }
        />
      )}

      {filters.maxPrice !== "" && (
        <Chip
          label={`Max: ${filters.maxPrice}`}
          onDelete={() =>
            dispatch(
              setFiltersProducts({
                ...filters,
                maxPrice: "",
              }),
            )
          }
        />
      )}

      {filters.sortedBy !== "Default" && (
        <Chip
          label={filters.sortedBy}
          onDelete={() =>
            dispatch(
              setFiltersProducts({
                ...filters,
                sortedBy: "Default",
              }),
            )
          }
        />
      )}

      {(filters.category !== "All Categories" ||
        filters.minPrice !== "" ||
        filters.maxPrice !== "" ||
        filters.sortedBy !== "Default") && (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() =>
            dispatch(
              setFiltersProducts({
                inputSearch: "",
                category: "All Categories",
                minPrice: "",
                maxPrice: "",
                sortedBy: "Default",
              }),
            )
          }
          className="!rounded-full !px-4 !normal-case"
        >
          Clear All
        </Button>
      )}
    </div>
  );
};

export default React.memo(ActiveFilters);
