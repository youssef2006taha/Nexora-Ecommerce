import React from "react";

import { CreditCard } from "lucide-react";

const PaymentMethod = () => {
  return (
    <div className="flex flex-col gap-5 p-6 rounded-3xl bg-bg-card border border-border shadow">
      {/* Header */}
      <div className="flex gap-3 items-center">
        <CreditCard className="size-4.5 xs:size-5.5 text-primary" />
        <span className="font-semibold text-text-primary text-[14px] xs:text-[16px]">
          Payment Method
        </span>
      </div>

      <div className="p-3 xs:p-4 ring-2 ring-primary/35 bg-primary/5 rounded-lg">
        <div className="flex gap-4 items-center">
          <div className="flex items-center justify-center border border-primary/10 size-8 xs:size-10 bg-primary/8 rounded-full">
            <CreditCard className="size-4 xs:size-5 text-primary" />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="leading-none text-text-primary text-[12px] xs:text-[14px] font-semibold">
              Cash on Delivery
            </h2>
            <p className="text-text-muted text-[10.5px] xs:text-[12px] tracking-[0.04rem]">
              Pay when you receive your order
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PaymentMethod);
