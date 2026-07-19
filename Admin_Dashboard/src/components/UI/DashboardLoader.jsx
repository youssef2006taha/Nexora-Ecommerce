import React from "react";
import logo2 from "../../assets/logo2.png";
import BackgroundCircle from "./BackgroundCircle";

function DashboardLoader() {
  return (
    <div className="space-y-8">
      
      <div className="flex flex-col items-center justify-center py-16">
        <div className="relative w-28 h-28 flex items-center justify-center">

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-40 dark:opacity-50 animate-pulse">
            <BackgroundCircle
              size={110}
              color="var(--primary)"
              blur={35}
              animate={false}
              className="relative"
            />
          </div>

          <div className="absolute inset-0 rounded-full border-4 border-border-light dark:border-border z-10"></div>

          <div
            className="absolute inset-0 rounded-full border-4 border-transparent animate-spin z-10"
            style={{
              borderTopColor: "var(--primary)",
              borderRightColor: "var(--primary)",
            }}
          ></div>

          <div className="absolute animate-pulse z-20">
            <img
              src={logo2}
              alt="Logo"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>

        <h2 className="mt-8 text-4xl font-bold text-text-primary">
          Koda Dashboard
        </h2>

        <p className="mt-2 text-text-muted">
          Loading admin overview...
        </p>
      </div>

      <div
        className="bg-bg-card rounded-[var(--radius-lg-value)] p-8 border border-border-light dark:border-border"
        style={{ boxShadow: "var(--shadow-sm-value)" }}
      >
        <div className="h-4 w-40 rounded bg-bg-hover mb-6"></div>
        <div className="h-8 w-72 rounded bg-bg-active mb-5"></div>
        <div className="h-4 w-56 rounded bg-bg-hover"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-bg-card rounded-[var(--radius-lg-value)] p-6 border border-border-light dark:border-border"
            style={{ boxShadow: "var(--shadow-sm-value)" }}
          >
            <div className="h-4 w-28 rounded bg-bg-hover mb-6"></div>
            <div className="h-10 w-32 rounded bg-bg-active mb-6"></div>
            <div className="h-4 w-36 rounded bg-bg-hover"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardLoader;