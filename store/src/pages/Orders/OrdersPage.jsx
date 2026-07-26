import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import OrderCard from "./sections/OrderCard";

const OrdersPage = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = useCallback(async (pageNum = 1, append = false) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsUnauthorized(true);
      setLoading(false);
      return;
    }

    try {
      if (append) setLoadingMore(true);
      else setLoading(true);
      setError(null);
      setIsUnauthorized(false);

      const res = await api.get("/orders/my", { params: { page: pageNum, limit: 10 } });
      if (res && res.orders) {
        setOrders((prev) => (append ? [...prev, ...res.orders] : res.orders));
        setTotalPages(res.totalPages || 1);
        setPage(pageNum);
      } else {
        setOrders([]);
      }
    } catch (err) {
      if (err?.response?.status === 401) setIsUnauthorized(true);
      else setError(err?.response?.data?.message || err?.message || "Failed to load orders");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders(1, false);
  }, [fetchOrders]);

  const handleLoadMore = () => {
    if (page < totalPages && !loadingMore) fetchOrders(page + 1, true);
  };

  return (
    <div className="container-noT min-h-[70vh]">
      <div className="w-full mx-auto py-8">
        <h1
          className="text-3xl font-extrabold mb-7 tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          My Orders
        </h1>

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-2xl p-6 animate-pulse border"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border)",
                  boxShadow: "var(--shadow-xs-value)",
                }}
              >
                <div className="flex justify-between items-center mb-3">
                  <div
                    className="h-5 rounded-lg w-28"
                    style={{ backgroundColor: "var(--bg-hover)" }}
                  />
                  <div
                    className="h-5 rounded-full w-20"
                    style={{ backgroundColor: "var(--primary-light)" }}
                  />
                </div>
                <div
                  className="h-3.5 rounded-md w-32 mb-2.5"
                  style={{ backgroundColor: "var(--bg-hover)" }}
                />
                <div
                  className="h-3 rounded-md w-20"
                  style={{ backgroundColor: "var(--bg-hover)" }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Unauthorized State */}
        {!loading && isUnauthorized && (
          <div
            className="border rounded-3xl p-10 text-center max-w-lg mx-auto transition-all"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-sm-value)",
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border"
              style={{
                backgroundColor: "var(--primary-light)",
                color: "var(--primary)",
                borderColor: "var(--border-light)",
              }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Sign In Required
            </h3>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              Please sign in to view your orders.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full py-3 font-semibold rounded-xl text-sm transition-all duration-200 active:scale-95 shadow-sm"
              style={{
                backgroundColor: "var(--primary)",
                color: "#ffffff",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--primary-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--primary)")
              }
            >
              Sign In
            </button>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div
            className="border p-6 rounded-2xl text-center"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--danger)",
            }}
          >
            <p className="font-medium mb-4" style={{ color: "var(--danger)" }}>
              {error}
            </p>
            <button
              onClick={() => fetchOrders(1, false)}
              className="px-5 py-2.5 text-white font-medium rounded-xl text-sm transition-all active:scale-95 shadow-sm"
              style={{ backgroundColor: "var(--danger)" }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !isUnauthorized && !error && orders.length === 0 && (
          <div
            className="border rounded-2xl p-12 text-center transition-all"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-xs-value)",
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 border"
              style={{
                backgroundColor: "var(--primary-light)",
                color: "var(--primary)",
                borderColor: "var(--border-light)",
              }}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3
              className="text-lg font-bold mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              No orders yet
            </h3>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              You haven't placed any orders yet.
            </p>
            <Link
              to="/shop"
              className="inline-block px-6 py-3 font-semibold rounded-xl text-sm transition-all duration-200 active:scale-95 shadow-sm text-white"
              style={{ backgroundColor: "var(--primary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--primary-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--primary)")
              }
            >
              Start Shopping
            </Link>
          </div>
        )}

        {/* Orders List & Load More */}
        {!loading && !isUnauthorized && !error && orders.length > 0 && (
          <>
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
            {page < totalPages && (
              <div className="mt-8 text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-6 py-3 border font-semibold rounded-xl text-sm transition-all duration-200 active:scale-95 disabled:opacity-50"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                    boxShadow: "var(--shadow-xs-value)",
                  }}
                  onMouseEnter={(e) => {
                    if (!loadingMore) e.currentTarget.style.backgroundColor = "var(--bg-hover)";
                  }}
                  onMouseLeave={(e) => {
                    if (!loadingMore) e.currentTarget.style.backgroundColor = "var(--bg-card)";
                  }}
                >
                  {loadingMore ? "Loading..." : "Load More Orders"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(OrdersPage);