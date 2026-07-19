import React, { useState, useEffect } from "react";
import CartDetailsModal from "./ui/CartDetailsModal";
import api from "../../api/axios"

const CartsPage = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCart, setSelectedCart] = useState(null);

  useEffect(() => {
    api.get('/orders/admin/carts')
      .then(res => {
        setCarts(res.carts || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch carts:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8 min-h-[calc(100vh-88px)]">
   
      <div className="bg-bg-card border border-border rounded-[var(--radius-xl-value)] p-8 w-full shadow-xs mb-6 transition-all duration-300">
        <h4 className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-3">
          Carts
        </h4>
        
        <h1 className="text-2xl font-bold text-text-primary mb-2 tracking-tight">
          Cart overview
        </h1>
        
        <p className="text-text-muted text-[13px] leading-relaxed">
          All active carts returned from the API are rendered here. Click on a cart to view its products.
        </p>
      </div>

      {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : carts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {carts.map(cart => {
              const name = cart.user?.username || 'Unknown User';
              const initial = name.charAt(0).toUpperCase();

              return (
                <div 
                  key={cart._id} 
                  className="bg-bg-card border border-border rounded-[var(--radius-lg-value)] p-6 w-full hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group backdrop-blur-md"
                  style={{ boxShadow: "var(--shadow-sm-value)" }}
                >
                  <div>
                    <div className="flex justify-between items-start mb-5 gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-bg-surface flex items-center justify-center text-text-primary font-bold border border-border flex-shrink-0">
                          {initial}
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-wider font-mono">
                            ID: #{cart._id?.slice(-6).toUpperCase()}
                          </h4>
                          <h2 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors mt-0.5">
                            {name}
                          </h2>
                        </div>
                      </div>
                      <span className="bg-primary/10 border border-primary/20 text-primary rounded-full px-3 py-1 text-xs font-bold shrink-0">
                        {cart.items?.length || 0} items
                      </span>
                    </div>
                    
                    <div className="space-y-2.5 mb-6 border-t border-b border-border/60 py-4">
                      <div className="text-sm flex justify-between items-center">
                        <span className="text-text-muted">Email:</span>
                        <span className="font-semibold text-text-secondary text-right truncate max-w-[180px]">{cart.user?.email || 'N/A'}</span>
                      </div>
                      <div className="text-sm flex justify-between items-center">
                        <span className="text-text-muted">Subtotal:</span>
                        <span className="font-bold text-text-primary">{(cart.subtotal || 0).toFixed(2)} <span className="text-xs font-normal text-text-muted">EGP</span></span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedCart(cart)}
                    className="w-full py-2.5 bg-bg-hover hover:bg-bg-hover/80 text-text-secondary text-sm font-bold rounded-[var(--radius-md-value)] transition-all flex items-center justify-center gap-2 border border-border/40 hover:border-border active:scale-[0.98]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path d="M21.8 8.4c.1.3.2.7.2 1.1v5c0 3.3-2.7 6-6 6h-8c-3.3 0-6-2.7-6-6v-5c0-.4.1-.8.2-1.1C2.8 5.7 6.2 3 10 3h4c3.8 0 7.2 2.7 7.8 5.4Z"/></svg>
                    View Products
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="border border-dashed border-border rounded-[var(--radius-lg-value)] px-6 py-12 bg-transparent flex flex-col items-center justify-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted/60 mb-4"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
            <p className="text-text-primary text-lg font-medium mb-1">
              No active carts
            </p>
            <p className="text-text-muted text-sm">
              No carts were returned from the API.
            </p>
          </div>
        )}

        {selectedCart && (
          <CartDetailsModal 
            cart={selectedCart} 
            onClose={() => setSelectedCart(null)} 
          />
        )}
    </div>
  );
};

export default React.memo(CartsPage);
