import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import OrderProgressStepper from "./sections/OrderProgressStepper";
import { getStatusBadgeStyle, capitalize } from "./sections/OrderCard";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelError, setCancelError] = useState(null);

  const fetchOrder = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(`/orders/my/${id}`);
      if (res?.order) setOrder(res.order);
      else setError("Order not found");
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to load order");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const handleCancel = async () => {
    try {
      setCancelling(true);
      setCancelError(null);
      const res = await api.patch(`/orders/my/${id}/cancel`);
      if (res?.order) {
        setOrder(res.order);
        setShowCancelModal(false);
      } else {
        setCancelError("Failed to cancel order");
      }
    } catch (err) {
      setCancelError(err?.response?.data?.message || err?.message || "Could not cancel order");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-4">
        <div className="animate-pulse space-y-5">
          <div className="h-9 bg-white/80 dark:bg-slate-900 rounded-xl w-52" />
          <div className="h-5 bg-white/80 dark:bg-slate-900 rounded-lg w-36" />
          <div className="h-44 bg-white dark:bg-slate-900 rounded-2xl" />
          <div className="h-52 bg-white dark:bg-slate-900 rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="h-40 bg-white dark:bg-slate-900 rounded-2xl" />
            <div className="h-40 bg-white dark:bg-slate-900 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-4xl mx-auto py-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Error Loading Order
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{error || "Order not found"}</p>
          <Link
            to="/orders"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl text-sm transition-colors"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const shortId = order._id ? `#${order._id.slice(-8).toUpperCase()}` : "#ORDER";
  const canCancel = ["pending", "confirmed"].includes((order.status || "").toLowerCase());

  return (
    <div className="container-noT">
      <div className="w-full mx-auto py-4">

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
              Order Details
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
              Order {shortId}
            </p>
          </div>
          <span
            className={`mt-1 px-5 py-1.5 text-sm font-semibold rounded-full capitalize ${getStatusBadgeStyle(
              order.status
            )}`}
          >
            {capitalize(order.status)}
          </span>
        </div>
  
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 mb-5 shadow-xs transition-colors">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-7">
            Order Progress
          </h3>
          <OrderProgressStepper status={order.status} embedded />
        </div>

        
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 mb-5 shadow-xs transition-colors">
          <div className="flex items-center gap-2 mb-5">
            <svg
              className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Items
            </h2>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {order.items?.map((item, idx) => (
              <div
                key={item.product || idx}
                className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-slate-200/80 dark:bg-slate-800 overflow-hidden shrink-0 flex items-center justify-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                        Item
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
                      {item.name || "Item"}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Qty: {item.quantity} × EGP {Number(item.price || 0).toFixed(0)}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  EGP {Number((item.quantity || 1) * (item.price || 0)).toFixed(0)}
                </span>
              </div>
            ))}
          </div>
        </div>

    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Shipping Address
              </h2>
            </div>
            {order.shippingAddress ? (
              <div className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  {order.shippingAddress.fullName}
                </p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.country}
                </p>
                {order.shippingAddress.phone && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 pt-1">
                    Phone: {order.shippingAddress.phone}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-slate-400 dark:text-slate-500">
                No address specified
              </p>
            )}
          </div>

    
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
                  Payment
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 capitalize">
                {order.paymentMethod || "Cash"}
              </p>

              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                {order.subtotal !== undefined && (
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>EGP {Number(order.subtotal).toFixed(2)}</span>
                  </div>
                )}
                {order.shippingFee !== undefined && (
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {order.shippingFee === 0 ? "Free" : `EGP ${Number(order.shippingFee).toFixed(2)}`}
                    </span>
                  </div>
                )}
                {order.tax !== undefined && (
                  <div className="flex justify-between">
                    <span>Tax (14%)</span>
                    <span>EGP {Number(order.tax).toFixed(2)}</span>
                  </div>
                )}
                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Discount</span>
                    <span>- EGP {Number(order.discount).toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                Total
              </span>
              <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">
                EGP {Number(order.totalPrice || 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

      
        {canCancel && (
          <div className="mt-6 pt-6 border-t border-slate-300/60 dark:border-slate-800 flex justify-center">
            <button
              onClick={() => setShowCancelModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-sm font-semibold rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel Order
            </button>
          </div>
        )}

      
        {showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                Cancel Order
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Are you sure you want to cancel order{" "}
                <span className="font-semibold text-slate-800 dark:text-slate-200">{shortId}</span>? This action cannot be undone.
              </p>

              {cancelError && (
                <div className="mb-4 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 p-3 rounded-lg border border-red-200 dark:border-red-900">
                  {cancelError}
                </div>
              )}

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  disabled={cancelling}
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Keep Order
                </button>
                <button
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors disabled:opacity-50"
                >
                  {cancelling ? "Cancelling..." : "Yes, Cancel"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(OrderDetailsPage);
