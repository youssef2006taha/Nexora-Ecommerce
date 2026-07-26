import React from "react";
import { useSelector } from "react-redux";

import CartPageHeader from "./Components/CartPageHeader";
import CartItemCard from "./Components/CartItemCard";
import CartSummary from "./components/CartSummary";
import Coupon from "./Components/Coupon";
import EmptyCart from "./Components/EmptyCart";

const CartPage = () => {
  const { cartItems } = useSelector((store) => store.cart);

  return (
    <div className="py-8 px-6 sm:px-16">
      {cartItems?.length > 0 ? (
        <div>
          <CartPageHeader />

          <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] items-start gap-8">
            {/* Cart Items */}
            <div className="flex flex-col gap-6">
              <div className="border border-border rounded-lg overflow-hidden shadow">
                {cartItems?.map((item, index, arr) => (
                  <div
                    key={item.product}
                    className={`${
                      index < arr.length - 1 ? "border-b border-border/50" : ""
                    }`}
                  >
                    <CartItemCard item={item} />
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <Coupon />
            </div>

            {/* Cart Summary */}
            <CartSummary />
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default React.memo(CartPage);
