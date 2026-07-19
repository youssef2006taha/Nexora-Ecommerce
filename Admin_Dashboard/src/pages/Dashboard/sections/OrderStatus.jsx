import React from "react";

function OrderStatusCard({ dashboard }) {
  const statuses = [
    {
      label: "PENDING",
      count: dashboard?.orders?.pending ?? 0,
      bg: "bg-amber-500/10 dark:bg-amber-900/20",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-500/20 dark:border-amber-900/30",
    },
    {
      label: "PROCESSING",
      count: dashboard?.orders?.processing ?? 0,
      bg: "bg-sky-500/10 dark:bg-sky-900/20",
      text: "text-sky-600 dark:text-sky-400",
      border: "border-sky-500/20 dark:border-sky-900/30",
    },
    {
      label: "CONFIRMED",
      count: dashboard?.orders?.confirmed ?? 0,
      bg: "bg-emerald-500/10 dark:bg-emerald-900/20",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-500/20 dark:border-emerald-900/30",
    },
    {
      label: "SHIPPED",
      count: dashboard?.orders?.shipped ?? 0,
      bg: "bg-purple-500/10 dark:bg-purple-900/20",
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-500/20 dark:border-purple-900/30",
    },
    {
      label: "DELIVERED",
      count: dashboard?.orders?.delivered ?? 0,
      bg: "bg-teal-500/10 dark:bg-teal-900/20",
      text: "text-teal-600 dark:text-teal-400",
      border: "border-teal-500/20 dark:border-teal-900/30",
    },
    {
      label: "CANCELLED",
      count: dashboard?.orders?.cancelled ?? 0,
      bg: "bg-rose-500/10 dark:bg-rose-900/20",
      text: "text-rose-600 dark:text-rose-400",
      border: "border-rose-500/20 dark:border-rose-900/30",
    },
  ];

  return (
    <div
      className="
        bg-bg-card/65
        backdrop-blur-md
        border border-border
        rounded-xl
        p-6 md:p-8
        shadow-sm
        w-full
        transition-all
        duration-300
      "
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] uppercase tracking-widest text-accent font-bold">
          Order Status
        </span>

        <span className="
          text-[10px]
          font-bold
          px-2.5 py-1
          bg-success-bg
          text-success
          rounded-md
        ">
          Updated from API
        </span>
      </div>

      <h2 className="text-[22px] font-bold text-text-primary mb-6">
        Live fulfillment breakdown
      </h2>

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {statuses.map((status) => (
          <div
            key={status.label}
            className={`
              p-4
              rounded-lg
              border
              ${status.border}
              ${status.bg}

              flex flex-col justify-between
              min-h-[105px]

              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-md
              hover:bg-opacity-20
            `}
          >
            <span
              className={`
                text-[10px]
                font-bold
                tracking-widest
                uppercase
                opacity-90
                ${status.text}
              `}
            >
              {status.label}
            </span>

            <span
              className={`
                text-[32px]
                font-bold
                tracking-tight
                leading-none
                ${status.text}
              `}
            >
              {status.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(OrderStatusCard);