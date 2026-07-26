import React from "react";

const STEPS = [
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "processing", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

const OrderProgressStepper = ({ status, embedded = false }) => {
  const cur = (status || "").toLowerCase();

  if (cur === "cancelled") {
    return (
      <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 p-5 rounded-2xl mb-5 flex items-center gap-3">
        <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        <div>
          <span className="font-bold block text-sm">Order Cancelled</span>
          <span className="text-xs opacity-90">This order has been cancelled.</span>
        </div>
      </div>
    );
  }

  if (cur === "returned") {
    return (
      <div className="bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900 text-orange-700 dark:text-orange-300 p-5 rounded-2xl mb-5 flex items-center gap-3">
        <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        <div>
          <span className="font-bold block text-sm">Order Returned</span>
          <span className="text-xs opacity-90">This order has been returned.</span>
        </div>
      </div>
    );
  }

  const activeIdx = Math.max(0, STEPS.findIndex((s) => s.key === cur));

  const stepper = (
    <div className="relative flex items-start justify-between">
      {/* Gray background line */}
      <div
        className="absolute top-3.5 h-0.5 bg-slate-300 dark:bg-slate-700"
        style={{ left: "14px", right: "14px" }}
      />
      {/* Indigo active line */}
      <div
        className="absolute top-3.5 h-0.5 bg-indigo-600 dark:bg-indigo-500 transition-all duration-300"
        style={{
          left: "14px",
          width: activeIdx === 0 ? "0px" : `calc(${(activeIdx / (STEPS.length - 1)) * 100}% - 14px)`,
        }}
      />

      {STEPS.map((step, idx) => {
        const done = idx <= activeIdx;
        const isCur = idx === activeIdx;
        return (
          <div key={step.key} className="relative z-10 flex flex-col items-center" style={{ flex: 1 }}>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                done
                  ? "bg-indigo-600 dark:bg-indigo-500 text-white"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
              }`}
            >
              {done ? (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600" />
              )}
            </div>
            <span
              className={`mt-2 text-xs font-semibold text-center ${
                isCur
                  ? "text-indigo-600 dark:text-indigo-400 font-bold"
                  : done
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-slate-400 dark:text-slate-500"
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );

  if (embedded) return stepper;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 mb-5 shadow-xs">
      <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-7">Order Progress</h3>
      {stepper}
    </div>
  );
};

export default React.memo(OrderProgressStepper);
