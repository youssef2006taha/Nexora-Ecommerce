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
      <div className="container-noT mx-auto py-8">
        <div className="w-full animate-pulse space-y-5">
          <div
            className="h-9 rounded-xl w-52"
            style={{ backgroundColor: "var(--border-light)" }}
          />
          <div
            className="h-5 rounded-lg w-36"
            style={{ backgroundColor: "var(--border-light)" }}
          />
          <div
            className="h-44 rounded-2xl border"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          />
          <div
            className="h-52 rounded-2xl border"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div
              className="h-40 rounded-2xl border"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
              }}
            />
            <div
              className="h-40 rounded-2xl border"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div
          className="border p-8 rounded-2xl text-center"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-xs-value)",
          }}
        >
          <h2
            className="text-xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Error Loading Order
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            {error || "Order not found"}
          </p>
          <Link
            to="/orders"
            className="inline-block px-5 py-2.5 text-white font-medium rounded-xl text-sm transition-all active:scale-95 shadow-sm"
            style={{ backgroundColor: "var(--primary)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--primary-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--primary)")
            }
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
    <div className="container-noT min-h-[70vh]">
      <div className="w-full mx-auto py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1
              className="text-3xl font-extrabold leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Order Details
            </h1>
            <p
              className="text-sm mt-1.5 font-medium"
              style={{ color: "var(--text-muted)" }}
            >
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

        {/* Stepper Card */}
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
          <OrderProgressStepper status={order.status} embedded />
        </div>

        {/* Items Card */}
        <div
          className="border rounded-2xl p-6 mb-5 transition-colors"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-xs-value)",
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <svg
              className="w-5 h-5"
              style={{ color: "var(--primary)" }}
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
            <h2
              className="text-lg font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Items
            </h2>
          </div>

          <div
            className="divide-y"
            style={{ borderColor: "var(--border-light)" }}
          >
            {order.items?.map((item, idx) => (
              <div
                key={item.product || idx}
                className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-xl overflow-hidden shrink-0 flex items-center justify-center border"
                    style={{
                      backgroundColor: "var(--bg-hover)",
                      borderColor: "var(--border-light)",
                    }}
                  >
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
                      <span
                        className="text-xs font-semibold"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Item
                      </span>
                    )}
                  </div>
                  <div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.name || "Item"}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Qty: {item.quantity} × EGP {Number(item.price || 0).toFixed(0)}
                    </p>
                  </div>
                </div>
                <span
                  className="font-bold text-sm"
                  style={{ color: "var(--text-primary)" }}
                >
                  EGP {Number((item.quantity || 1) * (item.price || 0)).toFixed(0)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping & Payment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            className="border rounded-2xl p-6 transition-colors"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-xs-value)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-5 h-5"
                style={{ color: "var(--primary)" }}
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
              <h2
                className="text-base font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                Shipping Address
              </h2>
            </div>
            {order.shippingAddress ? (
              <div
                className="space-y-1 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                <p
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {order.shippingAddress.fullName}
                </p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.country}
                </p>
                {order.shippingAddress.phone && (
                  <p
                    className="text-xs pt-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Phone: {order.shippingAddress.phone}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                No address specified
              </p>
            )}
          </div>

          <div
            className="border rounded-2xl p-6 flex flex-col justify-between transition-colors"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-xs-value)",
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-5 h-5"
                  style={{ color: "var(--primary)" }}
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
                <h2
                  className="text-base font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Payment
                </h2>
              </div>
              <p
                className="text-sm capitalize"
                style={{ color: "var(--text-secondary)" }}
              >
                {order.paymentMethod || "Cash"}
              </p>

              <div
                className="pt-3 mt-3 border-t space-y-1.5 text-xs"
                style={{
                  borderColor: "var(--border-light)",
                  color: "var(--text-muted)",
                }}
              >
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
                  <div
                    className="flex justify-between"
                    style={{ color: "var(--success)" }}
                  >
                    <span>Discount</span>
                    <span>- EGP {Number(order.discount).toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>

            <div
              className="pt-4 mt-4 border-t flex justify-between items-center"
              style={{ borderColor: "var(--border-light)" }}
            >
              <span
                className="font-bold text-sm"
                style={{ color: "var(--text-primary)" }}
              >
                Total
              </span>
              <span
                className="text-lg font-extrabold"
                style={{ color: "var(--primary)" }}
              >
                EGP {Number(order.totalPrice || 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {canCancel && (
          <div
            className="mt-6 pt-6 border-t flex justify-center"
            style={{ borderColor: "var(--border-light)" }}
          >
            <button
              onClick={() => setShowCancelModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 border text-sm font-semibold rounded-xl transition-all active:scale-95 shadow-xs"
              style={{
                borderColor: "var(--danger)",
                color: "var(--danger)",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--danger-light)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel Order
            </button>
          </div>
        )}

        {showCancelModal && (
          <div className="container-noT fixed inset-0 z-50 flex items-center justify-center ">
            <div
              className="border rounded-2xl p-6 w-full shadow-2xl transition-all"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border)",
              }}
            >
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Cancel Order
              </h3>
              <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
                Are you sure you want to cancel order{" "}
                <span
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {shortId}
                </span>
                ? This action cannot be undone.
              </p>

              {cancelError && (
                <div
                  className="mb-4 text-xs p-3 rounded-lg border"
                  style={{
                    backgroundColor: "var(--danger-light)",
                    borderColor: "var(--danger)",
                    color: "var(--danger)",
                  }}
                >
                  {cancelError}
                </div>
              )}

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  disabled={cancelling}
                  className="px-4 py-2 text-sm font-medium rounded-xl transition-all border"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--bg-hover)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  Keep Order
                </button>
                <button
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="px-4 py-2 text-sm font-medium text-white rounded-xl transition-all active:scale-95 disabled:opacity-50 shadow-xs"
                  style={{ backgroundColor: "var(--danger)" }}
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