import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { CircularProgress } from "@mui/material";

import { ShoppingCart, Trash2 } from "lucide-react";

import { ClearCartThunk } from "../../../features/cart/Thunks/ClearCartThunk";

const CartPageHeader = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleClearCart = async () => {
    try {
      setLoading(true);
      await dispatch(ClearCartThunk());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-bg-card p-6 rounded-3xl border border-border shadow">
      <div className="flex items-center gap-3">
        <div className="shrink-0 flex size-9 sm:size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ShoppingCart className="!size-4 sm:!size-5.5" />
        </div>

        <div>
          <h1 className="text-base sm:text-2xl font-bold text-text-primary">
            Shopping Cart
          </h1>

          <p className="mt-1 text-[11px] sm:text-[13px] text-text-muted">
            Review your items before proceeding to checkout.
          </p>
        </div>
      </div>

      <Button
        variant="outlined"
        color="error"
        disabled={loading}
        startIcon={
          loading ? (
            <CircularProgress thickness={4} className="!size-3.5 sm:!size-4 !text-danger" />
          ) : (
            <Trash2 className="!size-3.5 sm:!size-4" />
          )
        }
        className="!rounded-xl !text-[11px] sm:!text-xs !bg-danger/3 !border-danger/20 !px-5 !py-2 sm:!py-2.5 !font-semibold hover:!border-error hover:!bg-danger/7 dark:hover:!bg-danger/12"
        onClick={handleClearCart}
      >
        Clear Cart
      </Button>
    </div>
  );
};

export default React.memo(CartPageHeader);
