import React from "react";

function RecentOrders({ dashboard = {} }) {
  const orders = Array.isArray(dashboard.recentOrders) ? dashboard.recentOrders : [];

  const statusColors = {
    pending: "bg-warning-bg text-warning", 
    processing: "bg-info-bg text-info",
    confirmed: "bg-success-bg text-success",
    shipped: "bg-primary/10 text-primary", 
    delivered: "bg-success-bg text-success",
    cancelled: "bg-danger-bg text-danger",
  };

  return (
    <div 
      className="mt-6 w-full rounded-[var(--radius-xl-value)] border border-[var(--border)] bg-bg-card/65 backdrop-blur-md p-[var(--card-padding)] transition-all duration-300"
      style={{
        boxShadow: "var(--shadow-sm-value)",
      }}
    >
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-widest text-accent">
          Recent Orders
        </span>

        <span className="rounded-md bg-info-bg px-2.5 py-1 text-[10px] font-bold text-info">
          {orders.length} orders
        </span>
      </div>

      <h2 className="mb-6 text-[22px] font-bold text-text-primary">
        Latest customer activity
      </h2>

      <div className="space-y-3">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              key={order._id || `${order.createdAt || "order"}-${index}`}
              className="flex w-full flex-col justify-between gap-3 rounded-[var(--radius-lg-value)] border border-[var(--border)] bg-bg-main/30 backdrop-blur-sm p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-bg-hover/40 sm:flex-row sm:items-center"
            >
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-text-primary tracking-tight">
                  {order.user?.username || order.shippingAddress?.fullName || "Unknown User"}
                </span>

                <span className="mt-1 text-[11px] font-medium text-text-muted">
                  {order.items?.[0]?.name || "Unknown Product"}

                  <span className="mx-1 text-slate-300 dark:text-slate-600">•</span>

                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "No Date"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <span
                  className={`rounded-md px-2.5 py-1 text-[10px] font-bold uppercase ${statusColors[String(order.status || "pending").toLowerCase()] || "bg-bg-hover text-text-secondary"}`}
                >
                  {String(order.status || "Pending").toLowerCase()}
                </span>

                <span className="text-[13px] font-medium text-text-secondary min-w-[65px] text-right">
                  ${Number(order.totalPrice || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-text-muted">
            No recent orders available
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(RecentOrders);