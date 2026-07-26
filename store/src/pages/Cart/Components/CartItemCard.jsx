import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DeleteFromCartThunk } from "../../../features/cart/Thunks/DeleteFromCartThunk";

import { Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import QuantityController from "./QuantityController";

import { formatCurrency } from "../../../utils/formatCurrency";
import { Trash2 } from "lucide-react";

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const deleteHandler = async (id) => {
    try {
      setLoading(true);
      await dispatch(DeleteFromCartThunk(id)).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group flex items-center gap-4 bg-bg-card p-5">
      {/* Product Image */}
      <div className="relative size-16 p-0.5 sm:size-23 shrink-0 overflow-hidden rounded-md sm:rounded-xl bg-bg-secondary ring-2 ring-primary/25 group-hover:ring-primary/45 dark:group-hover:ring-primary/90 trabsition duration-300">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover rounded-md sm:rounded-xl transition-transform duration-500 group-hover:scale-110"
        />

        {/* Quantity Badge */}
        <span className="absolute top-2 left-2 flex size-5 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold shadow">
          {item.quantity}
        </span>
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col gap-2.5 w-full h-full justify-between">
        <h3 className="text-[13px] sm:text-[15px] font-bold text-text-primary line-clamp-1 leading-none">
          {item.name}
        </h3>

        <div className="flex items-center items-center gap-2">
          <span className="text-[12px] sm:text-[14px] font-extrabold text-primary leading-none">
            {formatCurrency(item.price)}
          </span>

          <span className="text-[11px] sm:text-xs text-text-secondary leading-none">
            / item
          </span>
        </div>

        {/* Quantity Controller */}
        <QuantityController item={item} />
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end justify-between gap-5">
        {/* Delete */}
        <Button
          disabled={loading}
          onClick={() => deleteHandler(item.product)}
          className="!min-w-0 !flex !size-7 sm:!size-8 !items-center !justify-center !rounded-full !text-danger !border !border-danger/10 !bg-danger/5 !transition-all hover:!bg-danger/15 hover:text-white"
        >
          {loading ? (
            <CircularProgress thickness={6} className="!size-3 !text-danger" />
          ) : (
            <Trash2 className="size-3 sm:size-4" />
          )}
        </Button>

        {/* Total */}
        <div className="text-right">
          <p className="text-[11px] sm:text-xs text-text-secondary">Total</p>

          <p className="text-[12px] sm:text-[14px] font-extrabold text-text-primary">
            {formatCurrency(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CartItemCard);
