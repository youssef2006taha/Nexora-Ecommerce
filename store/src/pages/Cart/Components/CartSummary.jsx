import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { formatCurrency } from "../../../utils/formatCurrency";

import Button from "../../../components/UI/Button";

const CartSummary = () => {
  const { totalPrice, subTotalPrice, discountAmount, tax, shipping } =
    useSelector((store) => store.cart);

  const navigate = useNavigate();

  return (
    <div className="sticky top-24 self-start">
      <div className="rounded-xl border border-border bg-bg-card p-6 shadow">
        {/* Title */}
        <h2 className="mb-6 text-base sm:text-xl font-bold text-text-primary">
          Order Summary
        </h2>

        {/* Details */}
        <div className="space-y-4">
          {/* Subtotal */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Subtotal</span>

            <span className="text-[13px] sm:text-sm text-text-primary font-semibold">
              {formatCurrency(subTotalPrice)}
            </span>
          </div>

          {/* Discount */}
          {discountAmount > 0 && (
            <div className="flex items-center justify-between text-success">
              <span className="text-sm">Discount</span>

              <span className="text-[13px] sm:text-sm font-semibold">
                -{formatCurrency(discountAmount)}
              </span>
            </div>
          )}

          {/* Shipping */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Shipping</span>

            {shipping ? (
              <span className="text-[13px] sm:text-sm font-semibold text-text-primary">
                {formatCurrency(shipping)}
              </span>
            ) : (
              <span className="text-sm font-semibold text-success">Free</span>
            )}
          </div>

          {/* Tax */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Tax (14%)</span>

            <span className="text-[13px] sm:text-sm font-semibold text-text-primary">
              {formatCurrency(tax)}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-border" />

        {/* Total */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm font-bold text-text-primary">Total</span>

          <span className="text-[14px] sm:text-lg font-extrabold text-primary">
            {formatCurrency(totalPrice + tax)}
          </span>
        </div>

        {/* Checkout Button */}
        <Button
          text="Proceed to Checkout"
          variant="primary"
          className="!w-full"
          onClick={() => navigate("/checkout")}
        />

        {/* Continue Shopping */}
        <Link
          to="/shop"
          className="mt-4 block text-center text-xs sm:text-sm font-medium text-primary transition hover:underline"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default React.memo(CartSummary);
