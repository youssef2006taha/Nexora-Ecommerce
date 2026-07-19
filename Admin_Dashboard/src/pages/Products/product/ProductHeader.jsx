import React from "react";
import { Link } from "react-router-dom"; 
import { Package, Plus } from "lucide-react";

function ProductHeader() {
  return (
    <div className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-xl-value)] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[var(--primary-light)] rounded-[var(--radius-md-value)] flex items-center justify-center text-[var(--primary)]">
          <Package className="w-6 h-6" />
        </div>
        <div>
          <p className="uppercase tracking-[0.2rem] text-[10px] font-bold text-[var(--text-muted)]">Product Dashboard</p>
          <h1 className="text-2xl md:text-[26px] font-bold text-[var(--text-primary)] tracking-tight mt-0.5">Products</h1>
        </div>
      </div>
      
      <Link
        to="/products/add"
        className="flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium px-5 py-3 rounded-[var(--radius-md-value)] shadow-sm transition-all duration-250 no-underline inline-flex"
      >
        <Plus className="w-4 h-4" />
        <span className="text-[14px]">Add Product</span>
      </Link>
    </div>
  );
}

export default React.memo(ProductHeader);