import React from "react";
import { useNavigate } from "react-router-dom";

export const getStatusBadgeStyle = (status) => {
  switch (status?.toLowerCase()) {
    case "confirmed":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20";
    case "pending":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
    case "processing":
      return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20";
    case "shipped":
      return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20";
    case "delivered":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
    case "cancelled":
      return "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20";
    case "returned":
      return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20";
    default:
      return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border border-gray-500/20";
  }
};

export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  const date = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const shortId = order._id ? `#${order._id.slice(-8).toUpperCase()}` : "#ORDER";
  const itemCount = order.items?.reduce((s, i) => s + (i.quantity || 1), 0) || 0;

  return (
    <div
      onClick={() => navigate(`/orders/${order._id}`)}
      className="rounded-2xl p-6 flex items-center justify-between border transition-all cursor-pointer group hover:shadow-md"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
        boxShadow: "var(--shadow-xs-value)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <span
            className="font-bold text-base"
            style={{ color: "var(--text-primary)" }}
          >
            {shortId}
          </span>
          <span
            className={`px-3 py-0.5 text-xs font-semibold rounded-full capitalize ${getStatusBadgeStyle(
              order.status
            )}`}
          >
            {capitalize(order.status)}
          </span>
        </div>
        <span
          className="text-xs font-medium"
          style={{ color: "var(--text-muted)" }}
        >
          {date}
        </span>
        <span
          className="text-xs font-medium"
          style={{ color: "var(--text-muted)" }}
        >
          {itemCount} item(s)
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span
          className="text-base font-bold"
          style={{ color: "var(--primary)" }}
        >
          EGP {Number(order.totalPrice || 0).toFixed(2)}
        </span>
        <svg
          className="w-5 h-5 transition-colors"
          style={{ color: "var(--text-muted)" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default React.memo(OrderCard);