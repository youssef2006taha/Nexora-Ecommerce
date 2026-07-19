import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import OrderDetailsModal from "./ui/OrderDetailsModal";

const STATUS_CONFIG = {
  pending:    { label: "Pending",    color: "text-amber-600 bg-amber-500/10 dark:text-amber-400 dark:bg-amber-500/10 border border-amber-500/20", dot: "bg-amber-500" },
  confirmed:  { label: "Confirmed",  color: "text-blue-600 bg-blue-500/10 dark:text-blue-400 dark:bg-blue-500/10 border border-blue-500/20", dot: "bg-blue-500" },
  processing: { label: "Processing", color: "text-indigo-600 bg-indigo-500/10 dark:text-indigo-400 dark:bg-indigo-500/10 border border-indigo-500/20", dot: "bg-indigo-500" },
  shipped:    { label: "Shipped",    color: "text-purple-600 bg-purple-500/10 dark:text-purple-400 dark:bg-purple-500/10 border border-purple-500/20", dot: "bg-purple-500" },
  delivered:  { label: "Delivered",  color: "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-500/10 border border-emerald-500/20", dot: "bg-emerald-500" },
  cancelled:  { label: "Cancelled",  color: "text-red-600 bg-red-500/10 dark:text-red-400 dark:bg-red-500/10 border border-red-500/20", dot: "bg-red-500" },
  returned:   { label: "Returned",   color: "text-orange-600 bg-orange-500/10 dark:text-orange-400 dark:bg-orange-500/10 border border-orange-500/20", dot: "bg-orange-500" },
};

const PAYMENT_CONFIG = {
  cash:   { label: "Cash"},
  stripe: { label: "Stripe"},
  paypal: { label: "PayPal"},
  paymob: { label: "Paymob"},
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    api.get("/orders/admin")
      .then((res) => {
        setOrders(res.orders || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setLoading(false);
      });
  }, []);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = 
      o._id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (o.shippingAddress?.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.user?.email || "").toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || o.paymentStatus === paymentFilter;
    const matchesMethod = methodFilter === "all" || o.paymentMethod === methodFilter;
    
    return matchesSearch && matchesStatus && matchesPayment && matchesMethod;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 md:p-8 min-h-[calc(100vh-88px)] text-text-primary transition-colors duration-300">

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-text-muted mb-1">
            Admin - Management
          </p>
          <h1 className="text-3xl font-bold text-text-primary">
            Orders
          </h1>
        </div>
        <div className="flex items-center bg-bg-card rounded-[var(--radius-md-value)] px-4 py-2 border border-border backdrop-blur-md">
          <span className="text-xl font-extrabold mr-2 text-primary">{orders.length}</span>
          <span className="text-sm font-semibold text-text-muted">total orders</span>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[250px]">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input 
            type="text" 
            placeholder="Search ID, customer..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-bg-surface border border-border rounded-[var(--radius-md-value)] pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-primary placeholder:text-text-muted/60"
          />
        </div>
        
        {/* Status Filter */}
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-bg-surface border border-border rounded-[var(--radius-md-value)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer text-text-secondary"
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
          <option value="returned">Returned</option>
        </select>
        
        {/* Payment Status Filter */}
        <select 
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          className="bg-bg-surface border border-border rounded-[var(--radius-md-value)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer text-text-secondary"
        >
          <option value="all">All payments</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
        </select>
        
        {/* Payment Method Filter */}
        <select 
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
          className="bg-bg-surface border border-border rounded-[var(--radius-md-value)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer text-text-secondary"
        >
          <option value="all">All methods</option>
          <option value="cash">Cash</option>
          <option value="stripe">Stripe</option>
        </select>
      </div>

      {/* Table Container */}
      <div 
        className="bg-bg-card border border-border rounded-[var(--radius-lg-value)] overflow-hidden backdrop-blur-md"
        style={{ boxShadow: "var(--shadow-sm-value)" }}
      >
        {loading ? (
          <div className="p-12 text-center text-text-muted animate-pulse">Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-16 text-center">
            <p className="text-text-muted">No orders found matching your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-bg-hover/50 border-b border-border">
                <tr>
                  {["ORDER", "CUSTOMER", "DATE", "STATUS", "PAYMENT", "TOTAL"].map((h) => (
                    <th key={h} className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {paginatedOrders.map((order) => {
                  const status = STATUS_CONFIG[order.status] || { label: order.status, color: "text-text-muted bg-bg-hover border border-border", dot: "bg-text-muted" };
                  const payment = PAYMENT_CONFIG[order.paymentMethod] || { label: order.paymentMethod, icon: "💳" };
                  
                  const name = order.shippingAddress?.fullName || "User";
                  const initial = name.charAt(0).toUpperCase();
                  const email = order.user?.email || "user@example.com";
                  const orderIdStr = order._id ? order._id.slice(-8).toUpperCase() : "UNKNOWN";

                  return (
                    <tr 
                      key={order._id} 
                      onClick={() => setSelectedOrder(order)}
                      className="group transition-all duration-200 hover:bg-bg-hover/40 cursor-pointer"
                    >
                      {/* ID - منور بلون الـ primary اللطيف في الدارك */}
                      <td className="px-6 py-5 font-mono font-bold text-text-secondary dark:text-primary whitespace-nowrap">
                        #{orderIdStr}
                      </td>

                      {/* Customer Info */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-bg-surface flex items-center justify-center text-text-primary font-bold border border-border flex-shrink-0">
                            {initial}
                          </div>
                          <div>
                            <p className="font-bold text-text-primary leading-tight group-hover:text-primary transition-colors">
                              {name}
                            </p>
                            <p className="text-text-muted text-[11px] mt-0.5">
                              {email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-5 text-text-secondary font-medium whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${status.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                          {status.label}
                        </span>
                      </td>

                      {/* Payment */}
                      <td className="px-6 py-5">
                        <div className="flex flex-col items-start">
                          <span className="inline-block px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold rounded border border-amber-500/20 uppercase">
                            {order.paymentStatus || "PENDING"}
                          </span>
                          <p className="text-text-muted text-xs mt-1.5 font-medium flex items-center gap-1">
                            <span>{payment.icon}</span> <span>{payment.label}</span>
                          </p>
                        </div>
                      </td>

                      {/* Total Price */}
                      <td className="px-6 py-5 font-bold text-text-primary whitespace-nowrap">
                        {order.totalPrice ? order.totalPrice.toLocaleString() : "0"} <span className="text-xs font-semibold text-text-muted">EGP</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-6">
          <div className="flex items-center gap-1 bg-bg-card rounded-[var(--radius-md-value)] border border-border p-1 backdrop-blur-md">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="p-1.5 rounded-[var(--radius-sm-value)] hover:bg-bg-hover text-text-muted disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-[var(--radius-sm-value)] text-sm font-semibold transition-all ${
                  currentPage === i + 1 
                    ? "bg-primary text-white shadow-md shadow-primary/20" 
                    : "text-text-secondary hover:bg-bg-hover"
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-[var(--radius-sm-value)] hover:bg-bg-hover text-text-muted disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      )}

      {/* Details Drawer Modal */}
      {selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
          onUpdate={() => {
            api.get("/orders/admin").then(res => setOrders(res.orders || []));
          }}
        />
      )}
      
    </div>
  );
};

export default React.memo(OrdersPage);