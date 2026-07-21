import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import api from '../../../api/axios';

const OrderDetailsModal = ({ order, onClose, onUpdate }) => {
const [status, setStatus] = useState(order?.status || 'pending');
  const [adminNote, setAdminNote] = useState(order?.adminNote || '');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (order?._id) {
      api.get(`/orders/admin/${order._id}`)
        .then(res => {
          if (res.order) {
            setAdminNote(res.order.adminNote || '');
            setStatus(res.order.status || 'pending');
          }
        })
        .catch(console.error);
    }
  }, [order?._id]);

  if (!order) return null;

  const handleUpdateStatus = async () => {
    try {
      setIsUpdating(true);
      await api.patch(`/orders/admin/${order._id}/status`, {
        status,
        adminNote
      });
      if (onUpdate) onUpdate();
      onClose();
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  const subtotal = order.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;
  const shipping = 50;  
  const tax = subtotal * 0.14;  

  return(
    <div 
      className="fixed inset-0 z-modal flex justify-end bg-text-primary/30 dark:bg-black/60 backdrop-blur-sm transition-all duration-300"
      onClick={onClose}
    >
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
      
      <div 
        className="bg-bg-surface h-full flex flex-col border-l border-border overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '448px',
          minWidth: '280px',
          height: '100vh',
          animation: 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          boxShadow: 'var(--shadow-lg-value)'
        }}
      >
        
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 shrink-0 border-b border-border/60">
          <div>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">
              Order Detail
            </p>
            <h2 className="text-xl font-bold text-text-primary font-mono">
              #{order._id ? order._id.slice(-8).toUpperCase() : ''}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-hover rounded-[var(--radius-sm-value)] transition-all"
            title="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          
          {/* Email & Shipping address */}
          <div className="border border-border rounded-[var(--radius-md-value)] p-4 space-y-3 bg-bg-card/40">
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted">Email</span>
              <span className="font-semibold text-text-primary">{order.user?.email || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted">Ship to</span>
              <span className="font-semibold text-text-primary text-right max-w-[200px] truncate">
                {order.shippingAddress?.city || 'N/A'}, {order.shippingAddress?.country || 'Egypt'}
              </span>
            </div>
          </div>

          {/* Items Section */}
          <div>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2.5">
              Items
            </p>
            <div className="border border-border rounded-[var(--radius-md-value)] bg-bg-card/40 overflow-hidden divide-y divide-border/40">
              {order.items && order.items.length > 0 ? order.items.map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 bg-bg-surface rounded-[var(--radius-sm-value)] flex items-center justify-center overflow-hidden flex-shrink-0 border border-border">
                      {item.product?.imageCover ? (
                        <img src={item.product.imageCover} alt={item.product.title} className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-text-primary truncate">
                        {item.product?.title || 'Product Name'}
                      </p>
                      <p className="text-[11px] text-text-muted font-semibold mt-0.5">
                        x {item.quantity} · {item.price?.toFixed(2)} EGP
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-extrabold text-text-primary whitespace-nowrap pl-2 shrink-0">
                    {(item.price * item.quantity).toFixed(2)} <span className="text-[10px] font-bold text-text-muted">EGP</span>
                  </p>
                </div>
              )) : (
                <div className="p-4 text-sm text-text-muted text-center">No items</div>
              )}
            </div>
          </div>

          {/* Pricing Details */}
          <div className="border border-border rounded-[var(--radius-md-value)] p-4 space-y-3 bg-bg-card/40">
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted">Subtotal</span>
              <span className="font-semibold text-text-primary">{subtotal.toFixed(2)} EGP</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted">Shipping</span>
              <span className="font-semibold text-text-primary">{shipping.toFixed(2)} EGP</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted">Tax (14%)</span>
              <span className="font-semibold text-text-primary">{tax.toFixed(2)} EGP</span>
            </div>
            <div className="pt-3 border-t border-border/60 flex justify-between items-center text-sm">
              <span className="font-bold text-text-primary">Total</span>
              <span className="text-base font-black text-primary">{(order.totalPrice || (subtotal + shipping + tax)).toFixed(2)} EGP</span>
            </div>
          </div>

          {/* Update Status Actions */}
          <div className="space-y-3 pt-2">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
              Update Status
            </p>
            <div className="border border-border rounded-[var(--radius-md-value)] p-4 bg-bg-card/40 flex flex-col gap-3">
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-bg-surface border border-border rounded-[var(--radius-sm-value)] px-3 py-2.5 text-sm font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
                <option value="returned">Returned</option>
              </select>

              <textarea 
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="Admin note (optional)..."
                className="w-full bg-bg-surface border border-border rounded-[var(--radius-sm-value)] px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none h-24 placeholder:text-text-muted/60"
              />

              <button 
                onClick={handleUpdateStatus}
                disabled={isUpdating}
                className="w-full bg-primary text-white font-bold text-sm py-3 rounded-[var(--radius-sm-value)] hover:bg-primary/90 transition-all disabled:opacity-50 active:scale-[0.98]"
                style={{ boxShadow: "var(--shadow-xs-value)" }}
              >
                {isUpdating ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;