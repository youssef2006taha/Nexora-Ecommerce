import React from "react";
import { useState, useEffect } from "react";

import ShippingAddress from "./Components/ShippingAddress";
import PaymentMethod from "./Components/PaymentMethod";
import OrderNotes from "./Components/OrderNotes";
import OrderSummary from "./Components/OrderSummary";
import SectionWithCircles from "../../components/UI/SectionWithCircles";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    customerNote: "",
    paymentMethod: "cash",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SectionWithCircles className="py-8 px-6 sm:px-16">
      <form className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] items-start gap-8">
        <div className="flex flex-col gap-6">
          <ShippingAddress
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />

          <PaymentMethod />

          <OrderNotes formData={formData} setFormData={setFormData} />
        </div>

        <OrderSummary formData={formData} setErrors={setErrors} />
      </form>
    </SectionWithCircles>
  );
};

export default React.memo(CheckoutPage);
