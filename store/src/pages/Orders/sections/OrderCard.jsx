import React from "react";
import { useNavigate } from "react-router-dom";

export const getStatusBadgeStyle = (status) => {
  switch (status?.toLowerCase()) {
    case "confirmed":
      return "bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-800";
    case "pending":
      return "bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800";
    case "processing":
      return "bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200 dark:border-purple-800";
    case "shipped":
      return "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800";
    case "delivered":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800";
    case "cancelled":
      return "bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 border border-red-200 dark:border-red-800";
    case "returned":
      return "bg-orange-100 text-orange-700 dark:bg-orange-950/80 dark:text-orange-300 border border-orange-200 dark:border-orange-800";
    default:
      return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700";
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
      className="bg-white dark:bg-slate-900 rounded-2xl p-6 flex items-center justify-between shadow-xs hover:shadow-md border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all cursor-pointer group"
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-900 dark:text-slate-100 text-base">{shortId}</span>
          <span className={`px-3 py-0.5 text-xs font-semibold rounded-full capitalize ${getStatusBadgeStyle(order.status)}`}>
            {capitalize(order.status)}
          </span>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">{date}</span>
        <span className="text-xs text-slate-500 dark:text-slate-400">{itemCount} item(s)</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-base font-bold text-indigo-600 dark:text-indigo-400">
          EGP {Number(order.totalPrice || 0).toFixed(2)}
        </span>
        <svg
          className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default React.memo(OrderCard);
