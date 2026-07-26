import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ApplyCouponThunk } from "../../../features/cart/Thunks/ApplyCouponThunk.js";
import { RemoveCouponThunk } from "../../../features/cart/Thunks/RemoveCouponThunk.js";

import Input from "../../../components/UI/Input";
import Button from "../../../components/UI/Button";
import { CircularProgress } from "@mui/material";

import { IconButton } from "@mui/material";
import { CheckCircle2, X } from "lucide-react";

const Coupon = () => {
  const { cartItems, coupon } = useSelector((store) => store.cart);
  const [couponInput, setCouponInput] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const applyCouponHandler = async (code) => {
    if (!code) return;
    try {
      setLoading(true);
      await dispatch(ApplyCouponThunk({ code }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeCouponHandler = async () => {
    try {
      setLoading(true);
      await dispatch(RemoveCouponThunk());
    } catch (error) {
      console.log(error);
    } finally {
      setCouponInput("");
      setLoading(false);
    }
  };

  return (
    <div>
      {cartItems?.length > 0 && (
        <div className="p-6 bg-bg-card border border-border rounded-lg overflow-hidden shadow">
          {/* Header */}
          <div className="flex gap-2 items-center mb-4">
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
              className="lucide lucide-tag-icon lucide-tag size-4"
            >
              <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
              <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
            </svg>

            <span className="font-semibold text-sm">Coupon Code</span>
          </div>

          {coupon === null ? (
            <div className="flex flex-col xs:flex-row gap-4 items-center">
              <div className="grow w-full">
                <Input
                  id="coupon"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Enter Coupon Code"
                />
              </div>
              <Button
                text="Apply"
                loading={loading}
                onClick={() => applyCouponHandler(couponInput)}
                className="!h-9 max-xs:!w-full"
              />
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-lg border border-primary/15 bg-primary/6 p-4 text-primary">
              <CheckCircle2 className="size-4 sm:size-5 shrink-0" />

              <div className="flex justify-between items-center leading-none grow">
                <p className="font-semibold text-[12px] sm:text-sm">
                  Coupon <span className="font-bold">"{coupon}"</span> applied
                </p>
                <IconButton
                  size="small"
                  onClick={removeCouponHandler}
                  disabled={loading}
                  className="!text-primary hover:!bg-primary/10"
                >
                  {loading ? (
                    <CircularProgress
                      thickness={6}
                      className="!size-4 !text-primary"
                    />
                  ) : (
                    <X size={18} />
                  )}
                </IconButton>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(Coupon);
