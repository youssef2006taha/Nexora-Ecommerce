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
      <div
        className="p-5 rounded-2xl mb-5 flex items-center gap-3 border transition-colors"
        style={{
          backgroundColor: "var(--danger-light)",
          borderColor: "var(--danger)",
          color: "var(--danger)",
        }}
      >
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
      <div
        className="p-5 rounded-2xl mb-5 flex items-center gap-3 border transition-colors"
        style={{
          backgroundColor: "var(--warning-light)",
          borderColor: "var(--warning)",
          color: "var(--warning)",
        }}
      >
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
  
  // حساب النسبة المئوية الدقيقة للخط المكتمل
  const progressPercent = (activeIdx / (STEPS.length - 1)) * 100;

  const stepper = (
    <div className="relative flex items-start justify-between">
      {/* Background Track Line: Starts at center of 1st step (10%) & ends at center of last step (90%) */}
      <div
        className="absolute top-3.5 -translate-y-1/2 h-0.5"
        style={{
          left: `${100 / (STEPS.length * 2)}%`,
          right: `${100 / (STEPS.length * 2)}%`,
          backgroundColor: "var(--border-light)",
        }}
      />

      {/* Active Progress Line: Fills precisely to the center of active step */}
      <div
        className="absolute top-3.5 -translate-y-1/2 h-0.5 transition-all duration-300"
        style={{
          left: `${100 / (STEPS.length * 2)}%`,
          backgroundColor: "var(--primary)",
          width: `calc(${progressPercent}% * ${(STEPS.length - 1) / STEPS.length})`,
        }}
      />

      {STEPS.map((step, idx) => {
        const done = idx <= activeIdx;
        const isCur = idx === activeIdx;
        return (
          <div key={step.key} className="relative z-10 flex flex-col items-center" style={{ flex: 1 }}>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all shrink-0"
              style={{
                backgroundColor: done ? "var(--primary)" : "var(--bg-hover)",
                color: done ? "#ffffff" : "var(--text-muted)",
                border: done ? "none" : "1px solid var(--border)",
              }}
            >
              {done ? (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "var(--text-muted)" }}
                />
              )}
            </div>
            <span
              className={`mt-2 text-xs text-center transition-colors ${
                isCur || done ? "font-bold" : "font-semibold"
              }`}
              style={{
                color: done ? "var(--primary)" : "var(--text-muted)",
              }}
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
    <div
      className="border rounded-2xl p-6 mb-5 transition-colors"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
        boxShadow: "var(--shadow-xs-value)",
      }}
    >
      <h3
        className="text-base font-bold mb-7"
        style={{ color: "var(--text-primary)" }}
      >
        Order Progress
      </h3>
      {stepper}
    </div>
  );
};

export default React.memo(OrderProgressStepper);