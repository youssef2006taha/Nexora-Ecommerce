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
    <div className="container-noT">
      <div className="w-full mx-auto py-4">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-7 tracking-tight">
          My Orders
        </h1>

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 animate-pulse"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-28" />
                  <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-full w-20" />
                </div>
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-32 mb-2" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-20" />
              </div>
            ))}
          </div>
        )}

        {!loading && isUnauthorized && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-12 text-center shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              Sign In Required
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Please sign in to view your orders.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors"
            >
              Sign In
            </button>
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 p-6 rounded-2xl text-center">
            <p className="text-red-600 dark:text-red-400 font-medium mb-4">{error}</p>
            <button
              onClick={() => fetchOrders(1, false)}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl text-sm transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !isUnauthorized && !error && orders.length === 0 && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-12 text-center shadow-sm">
            <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">
              No orders yet
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              You haven't placed any orders yet.
            </p>
            <Link
              to="/shop"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        )}

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
                  className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50"
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
