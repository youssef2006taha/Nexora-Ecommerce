import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const CartDetailsModal = ({ cart, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (cart) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [cart, onClose]);

  if (!cart) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-text-primary/35 dark:bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-bg-surface rounded-[var(--radius-xl-value)] overflow-hidden flex flex-col border border-border w-[95%] max-w-[640px] min-w-[280px] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: 'var(--shadow-lg-value)' }}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/60 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-text-primary">
              Cart Details
            </h2>
            <p className="text-xs font-mono text-primary font-bold mt-1 uppercase tracking-wide">
              #{cart._id?.toUpperCase()}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary transition-colors rounded-[var(--radius-sm-value)] hover:bg-bg-hover cursor-pointer font-bold text-lg"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* User Info */}
          <div className="bg-bg-card/40 p-4 rounded-[var(--radius-md-value)] border border-border/60">
            <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3">
              User Information
            </h3>
            <p className="text-sm font-bold text-text-primary">
              Name: {cart.user?.username || 'Unknown'}
            </p>
            <p className="text-sm text-text-secondary mt-1">
              Email: {cart.user?.email || 'N/A'}
            </p>
          </div>

          {/* Products List */}
          <div>
            <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3">
              Cart Products ({cart.items?.length || 0})
            </h3>
            <div className="space-y-3">
              {cart.items && cart.items.length > 0 ? (
                cart.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-bg-card/30 rounded-[var(--radius-md-value)] border border-border/50">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 bg-bg-surface rounded-[var(--radius-sm-value)] border border-border flex items-center justify-center overflow-hidden flex-shrink-0">
                        {item.product?.imageCover || item.image ? (
                          <img src={item.product?.imageCover || item.image} alt={item.product?.title || item.name} className="w-full h-full object-cover" />
                        ) : (
                          <svg className="w-6 h-6 text-text-muted/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-text-primary truncate max-w-[180px] md:max-w-[300px]">
                          {item.product?.title || item.name || 'Unknown Product'}
                        </p>
                        <p className="text-xs text-text-muted font-medium mt-0.5">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-extrabold text-text-primary shrink-0 ml-3">
                      {(item.price * item.quantity).toFixed(2)} EGP
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-text-muted">No items found.</p>
              )}
            </div>
          </div>

          {/* Subtotal */}
          <div className="flex items-center justify-between p-4 bg-primary/10 rounded-[var(--radius-md-value)] border border-primary/20">
            <span className="font-bold text-text-primary">Subtotal</span>
            <span className="text-lg font-black text-primary">
              {(cart.subtotal || 0).toFixed(2)} EGP
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/60 bg-bg-card/40 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-[var(--radius-md-value)] bg-bg-hover hover:bg-bg-hover/80 text-text-secondary text-sm font-bold transition-all active:scale-[0.98]"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};

export default CartDetailsModal;