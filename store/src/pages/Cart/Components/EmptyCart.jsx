import React from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-[50vh] items-center justify-center px-6">
      <div className="flex flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-5 flex size-16 sm:size-20 items-center justify-center rounded-full bg-primary/5 dark:bg-primary/9 text-primary">
          <ShoppingCart className="size-8 sm:size-10 text-primary/50" />
        </div>

        {/* Content */}
        <h2 className="mb-2 text-base sm:text-xl font-bold text-text-primary">
          Your cart is empty
        </h2>

        <p className="mb-6 text-xs sm:text-sm leading-6 text-text-muted">
          Looks like you haven't added anything to your cart yet.
          <br />
          Start shopping and find something you love!
        </p>

        {/* Button */}
        <Button
          onClick={() => navigate("/shop")}
          className="!rounded-lg !bg-primary !px-6 !py-2 sm:!py-2.5 !text-xs sm:!text-sm !font-semibold !text-white hover:!bg-primary-hover"
        >
          Start Shopping
        </Button>
      </div>
    </div>
  );
};

export default React.memo(EmptyCart);
