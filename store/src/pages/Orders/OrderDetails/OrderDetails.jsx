import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import OrderProgressStepper from "./sections/OrderProgressStepper";
import { getStatusBadgeStyle, capitalize } from "./sections/OrderCard";

const API_BASE = "https://e-commerce-api-3wara.vercel.app";

function authHeaders(extra = {}) {
  const token = localStorage.getItem("koda-token");
  return {
    ...extra,
    Authorization: token ? `Bearer ${token}` : "",
  };
}

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelError, setCancelError] = useState(null);

  const fetchOrder = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await axios.get(`${API_BASE}/orders/my/${id}`, {
        headers: authHeaders(),
      });

      if (data.success && data.order) {
        setOrder(data.order);
      } else if (data.order) {
        setOrder(data.order);
      } else {
        setError(data.message || "Order not found");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not connect to the server"
      );
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

      const { data } = await axios.patch(
        `${API_BASE}/orders/my/${id}/cancel`,
        {},
        { headers: authHeaders() }
      );

      if (data.success && data.order) {
        setOrder(data.order);
        setShowCancelModal(false);
      } else {
        setCancelError(data.message || "Failed to cancel order");
      }
    } catch (err) {
      setCancelError(
        err.response?.data?.message || "Could not cancel order"
      );
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="animate-pulse space-y-5">
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
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
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
            className="inline-block px-5 py-2.5 font-medium rounded-xl text-sm transition-all active:scale-95 shadow-sm"
            style={{
              backgroundColor: "var(--primary)",
              color: "#ffffff",
            }}
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
    <div className="min-h-[75vh] py-10">
      <div className="max-w-4xl mx-auto px-4">
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
            className={`mt-1 px-4 py-1 text-xs font-semibold rounded-full capitalize ${getStatusBadgeStyle(
              order.status
            )}`}
          >
            {capitalize(order.status)}
          </span>
        </div>

        {/* Stepper Card */}
        <div
          className="border rounded-2xl p-6 mb-6 transition-colors"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-xs-value)",
          }}
        >
          <h3
            className="text-base font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Order Progress
          </h3>
          <OrderProgressStepper status={order.status} embedded />
        </div>

        {/* Order Items */}
        <div
          className="border rounded-2xl p-6 mb-6 transition-colors"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-xs-value)",
          }}
        >
          <h2
            className="text-lg font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Items in Order
          </h2>

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
                      {item.name || "Product Name"}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Qty: {item.quantity} × EGP {Number(item.price || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
                <span
                  className="font-bold text-sm"
                  style={{ color: "var(--text-primary)" }}
                >
                  EGP {Number((item.quantity || 1) * (item.price || 0)).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Info Grid: Address & Payment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Address */}
          <div
            className="border rounded-2xl p-6 transition-colors"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-xs-value)",
            }}
          >
            <h2
              className="text-base font-bold mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Shipping Address
            </h2>
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
                No address provided
              </p>
            )}
          </div>

          {/* Price Summary */}
          <div
            className="border rounded-2xl p-6 flex flex-col justify-between transition-colors"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-xs-value)",
            }}
          >
            <div>
              <h2
                className="text-base font-bold mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                Payment Summary
              </h2>
              <div
                className="space-y-2 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                <div className="flex justify-between">
                  <span>Payment Method</span>
                  <span
                    className="font-medium capitalize"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {order.paymentMethod || "Cash"}
                  </span>
                </div>
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

        {/* Cancel Button */}
        {canCancel && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowCancelModal(true)}
              className="px-6 py-2.5 border text-sm font-semibold rounded-xl transition-all active:scale-95"
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
              Cancel Order
            </button>
          </div>
        )}

        {/* Modal Confirm Cancel */}
        {showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div
              className="border rounded-2xl p-6 max-w-md w-full shadow-2xl transition-all"
              style={{
                backgroundColor: "var(--bg-card)",
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
                ?
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
                  className="px-4 py-2 text-sm font-medium rounded-xl border transition-all"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                >
                  Keep Order
                </button>
                <button
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="px-4 py-2 text-sm font-medium text-white rounded-xl transition-all active:scale-95 disabled:opacity-50"
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
}

export default OrderDetails;