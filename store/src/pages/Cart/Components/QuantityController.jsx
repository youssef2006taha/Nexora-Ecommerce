import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, CircularProgress } from "@mui/material";

import { UpdateQuantityThunk } from "../../../features/cart/Thunks/UpdateQuantityThunk";

import { Minus, Plus } from "lucide-react";

const QuantityController = ({ item }) => {
  const dispatch = useDispatch();
  const [loadingButton, setLoadingButton] = useState(null);

  const quantityChangeHandler = async (id, change) => {
    const newQuantity = item.quantity + change;

    if (newQuantity < 1) return;

    setLoadingButton(change > 0 ? "plus" : "minus");

    try {
      await dispatch(
        UpdateQuantityThunk({
          productId: id,
          quantity: newQuantity,
        }),
      ).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingButton(null);
    }
  };

  return (
    <div className="flex w-fit items-center sm:gap-1 leading-none">
      <Button
        onClick={() => quantityChangeHandler(item.product, -1)}
        disabled={loadingButton !== null || item.quantity === 1}
        className="!flex !justify-center !items-center !min-w-0 !size-7 sm:!size-8 !rounded-sm sm:!rounded-md !text-text-primary !border !border-secondary/15 hover:!bg-primary/10"
      >
        {loadingButton === "minus" ? (
          <CircularProgress thickness={6} className="!size-2.5 sm:!size-3 !text-primary" />
        ) : (
          <Minus className="!size-3 sm:!size-4" />
        )}
      </Button>

      <span className="min-w-8 text-center text-sm font-bold text-text-primary">
        {item.quantity}
      </span>

      <Button
        onClick={() => quantityChangeHandler(item.product, 1)}
        disabled={loadingButton !== null}
        className="!min-w-0 !size-7 sm:!size-8 !rounded-sm sm:!rounded-md !text-text-primary !border !border-secondary/15 hover:!bg-primary/10"
      >
        {loadingButton === "plus" ? (
          <CircularProgress thickness={6} className="!size-2.5 sm:!size-3 !text-primary" />
        ) : (
          <Plus className="!size-3 sm:!size-4" />
        )}
      </Button>
    </div>
  );
};

export default React.memo(QuantityController);
