import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignInForm from "./SignInForm";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen lg:h-screen flex items-center justify-center px-6 py-10 lg:p-12 overflow-hidden">
      <div className="w-full lg:max-w-6xl rounded-2xl overflow-hidden shadow grid grid-cols-1 md:grid-cols-[1fr_1.2fr] lg:grid-cols-2 max-sm:gap-6 shadow-[0_0_4px] shadow-primary-hover/20 border border-border">
        {/* Left Side */}
        <div className="h-auto md:h-full relative flex flex-col justify-center p-6 max-md:py-18 md:p-8 bg-gradient-to-br from-primary/10 via-transparent to-transparent relative">
          <button
            type="button"
            onClick={() =>
              location.state?.from
                ? navigate(location.state.from)
                : navigate("/")
            }
            className="group absolute top-6 left-6 z-20 inline-flex items-center gap-2 cursor-pointer text-text-primary hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3.5 md:size-4 transition-transform duration-200 group-hover:-translate-x-1"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>

            <span className="text-[12px] md:text-sm">Back</span>
          </button>

          <span className="w-fit px-2 py-1 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-[12px] lg:text-xs font-semibold text-primary bg-primary/10 border border-primary/20">
            Easy shopping starts here
          </span>

          <h2 className="mt-8 text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-text-primary">
            Shop smarter,
            <br />
            <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
              live better.
            </span>
          </h2>

          <p className="mt-4 md:mt-6 text-[13px] md:text-sm lg:text-base leading-relaxed text-text-muted bg">
            Discover thousands of products with a smooth and secure shopping
            experience built for you.
          </p>

          <div className="mt-8 md:mt-10 flex gap-3">
            <div className="size-10 lg:size-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
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
                className="lucide lucide-shopping-cart-icon lucide-shopping-cart size-4.5 lg:size-5"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>

            <div>
              <p className="font-semibold text-text-primary text-[14px] md:text-sm lg:text-base">
                Fast & Easy Shopping
              </p>
              <p className="text-[12px] md:text-xs lg:text-sm mt-1 lg:mt-0 text-text-muted">
                Everything you need in one place
              </p>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <SignInForm />
      </div>
    </div>
  );
};

export default React.memo(Login);
