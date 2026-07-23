import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RegisterForm from "./RegisterForm";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 lg:p-12 overflow-hidden">
      <div className="w-full lg:max-w-6xl rounded-2xl overflow-hidden shadow grid grid-cols-1 md:grid-cols-[1fr_1.2fr] lg:grid-cols-2 max-sm:gap-6 shadow-[0_0_4px] shadow-primary-hover/20 border border-border">
        {/* Left Side */}
        <div className="min-h-[92vh] md:h-full relative flex flex-col p-6 md:p-8 bg-gradient-to-br from-primary/10 via-transparent to-transparent">
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

          {/* Background Blur */}
          <div className="absolute -top-28 -right-24 size-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 size-80 rounded-full bg-primary/10 blur-3xl" />

          {/* Content */}
          <div className="relative z-10 flex flex-col grow">
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

            <div className="min-h-36 my-8 bg-[url('/public/signup.png')] bg-contain bg-center bg-no-repeat grow" />
          </div>

          {/* Stats */}
          <div className="relative z-10 grid max-xs:grid-cols-2 xs:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 justify-items-stretch gap-2 sm:gap-4">
            <div className="rounded-2xl bg-bg-card hover:bg-primary/1 border border-border p-3 text-center shadow">
              <div className="mb-3 mx-auto flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-package-icon lucide-package size-4"
                >
                  <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
                  <path d="M12 22V12" />
                  <polyline points="3.29 7 12 12 20.71 7" />
                  <path d="m7.5 4.27 9 5.15" />
                </svg>
              </div>

              <h4 className="text-sm font-bold">15K+</h4>

              <p className="mt-1 text-[9px] text-text-muted">Products</p>
            </div>

            <div className="rounded-2xl bg-bg-card hover:bg-primary/1 border border-border p-3 text-center shadow">
              <div className="mb-3 mx-auto flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-star-icon lucide-star size-4"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                </svg>
              </div>

              <h4 className="text-sm font-bold">4.9</h4>

              <p className="mt-1 text-[9px] text-text-muted">Rating</p>
            </div>

            <div className="rounded-2xl bg-bg-card hover:bg-primary/1 border border-border p-3 text-center shadow">
              <div className="mb-3 mx-auto flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-truck-icon lucide-truck size-4"
                >
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                  <path d="M15 18H9" />
                  <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                  <circle cx="17" cy="18" r="2" />
                  <circle cx="7" cy="18" r="2" />
                </svg>
              </div>

              <h4 className="text-sm font-bold">Fast</h4>

              <p className="mt-1 text-[9px] text-text-muted">Delivery</p>
            </div>

            <div className="rounded-2xl bg-bg-card hover:bg-primary/1 border border-border p-3 text-center shadow">
              <div className="mb-3 mx-auto flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-shield-half-icon lucide-shield-half size-4"
                >
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                  <path d="M12 22V2" />
                </svg>
              </div>

              <h4 className="text-sm font-bold">100%</h4>

              <p className="mt-1 text-[9px] text-text-muted">Secure</p>
            </div>
          </div>
        </div>

        {/* Form Side */}
       <div className="relative z-10">
         <RegisterForm />
       </div>
      </div>
    </div>
  );
};

export default React.memo(Register);
