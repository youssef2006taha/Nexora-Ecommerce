import React from "react";
import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { CheckCircle2, Package, ShoppingBag } from "lucide-react";

import Button from "../../components/UI/Button";
import SectionWithCircles from "../../components/UI/SectionWithCircles";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  const { id: orderId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SectionWithCircles className="flex items-center justify-center bg-bg-card px-4 py-16">
      <div className="flex flex-col items-center text-center">
        {/* Success Icon */}
        <div className="mb-7 flex size-16 sm:size-20 items-center justify-center rounded-full bg-success/8 border border-success/8">
          <CheckCircle2 className="size-9 sm:size-11 text-success" />
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-3xl font-bold text-text-primary">
          Order Placed Successfully!
        </h1>

        <p className="mt-3 text-[12.5px] sm:text-[14px] tracking-[0.03rem] text-text-muted">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {/* Order ID */}
        {orderId && (
          <p className="mt-3 text-[12px] sm:text-sm text-text-muted">
            Order ID: <span className="font-bold text-primary">#{orderId}</span>
          </p>
        )}

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outlined"
            text="Track My Order"
            startIcon={<Package className="size-4 sm:size-5" />}
            className="!h-10 sm:!h-11 !px-5 max-sm:!text-[12.5px]"
            onClick={() => navigate("/orders", { replace: true })}
          />

          <Button
            variant="primary"
            text="Continue Shopping"
            startIcon={<ShoppingBag className="size-4 sm:size-5" />}
            className="!h-10 sm:!h-11 !px-5 max-sm:!text-[12.5px]"
            onClick={() => navigate("/shop", { replace: true })}
          />
        </div>
      </div>
    </SectionWithCircles>
  );
};

export default React.memo(OrderSuccessPage);
