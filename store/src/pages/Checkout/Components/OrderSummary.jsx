import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { makeOrderValidation } from "../../../utils/validation/makeOrderValidation";
import { formatCurrency } from "../../../utils/formatCurrency";
import { makeOrderThunk } from "../../../features/cart/Thunks/makeOrderThunk";
import { showToast } from "../../../features/Toast/toastSlice";

import Button from "../../../components/UI/Button";

const OrderSummary = ({ formData, setErrors }) => {
  const {
    cartItems,
    subTotalPrice,
    totalPrice,
    shipping,
    tax,
    discountAmount,
  } = useSelector((store) => store.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  const submitOrderHandler = async (e) => {
    e.preventDefault();

    const validationErrors = makeOrderValidation(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      const res = await dispatch(makeOrderThunk(formData)).unwrap();
      navigate(`/order-success/${res.order._id}`, { replace: true });
    } catch (error) {
      console.log(error);

      if (
        typeof error === "string" &&
        error.startsWith("Only 0 units left for")
      ) {
        const productName = error.match(/"(.*)"/)?.[1];

        dispatch(
          showToast({
            message: `${productName || "Product"} is out of stock.`,
            severity: "error",
          }),
        );

        return;
      }

      dispatch(
        showToast({
          message: error || "Failed to place order.",
          severity: "error",
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sticky top-0 flex flex-col gap-3 p-6 rounded-3xl bg-bg-card border border-border shadow">
      <h2 className="font-semibold text-text-primary text-[14px] xs:text-[16px]">
        Order Summary
      </h2>

      <div className="flex flex-col">
        {cartItems?.map((item) => (
          <div
            className="flex items-center justify-between gap-4 py-3 border-b border-border/70 dark:border-border group"
            key={item.product}
          >
            <div className="flex gap-3 items-center">
              <div className="size-9 xs:size-10 p-0.5 border border-primary/40 rounded overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover rounded group-hover:scale-105 transition will-change-transform"
                />
              </div>

              <div className="flex flex-col justify-between !h-full gap-1">
                <h2 className="leading-none text-[12px] xs:text-[13.5px] text-text-primary/80 font-semibold">
                  {item.name}
                </h2>
                <p className="text-text-muted text-xs xs:text-sm">
                  x{item.quantity}
                </p>
              </div>
            </div>

            <h3 className="font-semibold text-[12px] xs:text-[13px]">
              {formatCurrency(item.price * item.quantity)}
            </h3>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 mt-1.5">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <h3 className="text-text-muted text-[12.5px] xs:text-[14px] leading-none">
            Subtotal
          </h3>
          <h3 className="text-text-primary font-extrabold text-[11.5px] xs:text-[12.5px] leading-none">
            {formatCurrency(subTotalPrice)}
          </h3>
        </div>

        {/* Discount Amount */}
        {discountAmount > 0 && (
          <div className="flex items-center justify-between">
            <h3 className="text-[12.5px] xs:text-[14px] leading-none text-success">
              Discount
            </h3>
            <h3 className="text-success font-extrabold text-[11.5px] xs:text-[12.5px] leading-none">
              -{formatCurrency(discountAmount)}
            </h3>
          </div>
        )}

        {/* Shipping */}
        <div className="flex items-center justify-between">
          <h3 className="text-text-muted text-[12.5px] xs:text-[14px] leading-none">
            Shipping
          </h3>
          <h3
            className={`${shipping ? "text-text-primary" : "text-success"} font-extrabold text-[11.5px] xs:text-[12.5px] leading-none`}
          >
            {shipping ? formatCurrency(shipping) : "Free"}
          </h3>
        </div>

        {/* Tax */}
        <div className="flex items-center justify-between">
          <h3 className="text-text-muted text-[12.5px] xs:text-[14px] leading-none">
            Tax (14%)
          </h3>
          <h3 className="text-text-primary font-extrabold text-[11.5px] xs:text-[12.5px] leading-none">
            {formatCurrency(tax)}
          </h3>
        </div>

        {/* divider */}
        <div className="mt-1 border-b border-border/70 dark:border-border" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <h3 className="text-text-primary text-[11px] xs:text-[12px] leading-none font-extrabold">
            Total
          </h3>
          <h3 className="text-primary font-extrabold text-[13.5px] xs:text-[15.5px] leading-none">
            {formatCurrency(totalPrice + tax + shipping)}
          </h3>
        </div>

        <Button
          text="Place Order"
          loading={loading}
          className="!h-9.5 xs:!h-10.5 max-xs:!text-[13px] !mt-2"
          onClick={submitOrderHandler}
        />
      </div>
    </div>
  );
};

export default React.memo(OrderSummary);
