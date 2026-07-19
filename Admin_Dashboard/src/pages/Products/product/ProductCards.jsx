import React from "react";
import ProductCardSlider from "./ProductCardSlider";
import { Eye, Edit3, Trash2, SlidersHorizontal } from "lucide-react";

function ProductCards({
  products = [],
  onViewProduct,
  onEditProduct,
  onQuickEditProduct,
  handleDeleteProduct,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.length > 0 ? (
        products.map((product) => {
          const isOut = Number(product.stock || 0) === 0;
          const discountAmount = product.discount || product.discountPrice || 100; 

          return (
            <div
              key={product._id}
              className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-xl-value)] p-4 shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col"
            >
              {(product.featured || product.isFeatured) && (
                <span className="absolute top-5 left-5 bg-amber-400 text-slate-900 text-[10px] font-bold px-2.5 py-1 rounded-md z-10 flex items-center gap-1 shadow-sm">
                  <span className="text-[12px] -mt-0.5">☆</span> Featured
                </span>
              )}

              <div className="h-[220px] bg-[var(--bg-main)] border border-[var(--border)]/60 rounded-[var(--radius-md-value)] overflow-hidden flex items-center justify-center mb-4 relative">
                <ProductCardSlider product={product} />

                <span
                  className={`absolute bottom-3 right-3 text-[11px] font-bold px-3 py-1 rounded-lg z-10 ${
                    !isOut
                      ? "bg-emerald-500/10 text-emerald-400 backdrop-blur-xs"
                      : "bg-[var(--danger)]/10 text-[var(--danger)] border border-[var(--danger)]/20"
                  }`}
                >
                  {!isOut ? `${product.stock} in stock` : "Out of Stock"}
                </span>
              </div>

              <div className="flex-grow px-1">
                <h2 className="font-bold text-[18px] text-[var(--text-primary)] tracking-tight line-clamp-1">
                  {product.name || product.title}
                </h2> 

                <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5 mt-1">
                  <span>{product.category || "FASHION"}</span>
                  <span className="text-[var(--border)] text-[8px]">•</span>
                  <span>{product.subcategory || "SMARTPHONES"}</span>
                  <span className="text-[var(--border)] text-[8px]">•</span>
                  <span>{product.brand || "APPLE"}</span>
                </div>

                <p className="text-[13px] text-[var(--text-secondary)] line-clamp-2 mt-3 leading-relaxed min-h-[38px]">
                  {product.description || "No description provided for this product."}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
                    ${Math.floor(Number(product.price || 0))}
                  </span>
                  
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
                    -${discountAmount} off
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3 min-h-[24px]">
                  {(product.tags || ["apple", "ssss"]).map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="bg-[var(--bg-hover)] text-[var(--text-secondary)] text-[11px] font-medium px-2.5 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-5">
                <button
                  onClick={() => onViewProduct(product._id)}
                  className="bg-[var(--bg-surface)] border border-[var(--border)] hover:bg-[var(--bg-hover)] rounded-xl py-2 flex items-center justify-center gap-1.5 text-[12px] font-semibold text-[var(--text-secondary)] transition-all cursor-pointer shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5 text-[var(--primary)]" />
                  <span>View</span>
                </button>

                <button
                  onClick={() => onEditProduct(product._id)}
                  className="bg-[var(--bg-surface)] border border-[var(--border)] hover:bg-[var(--bg-hover)] rounded-xl py-2 flex items-center justify-center gap-1.5 text-[12px] font-semibold text-[var(--text-secondary)] transition-all cursor-pointer shadow-xs"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[var(--primary)]" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => onQuickEditProduct(product)}
                  className="bg-[var(--bg-surface)] border border-[var(--border)] hover:bg-[var(--bg-hover)] rounded-xl py-2 flex items-center justify-center gap-1.5 text-[12px] font-semibold text-[var(--text-secondary)] transition-all cursor-pointer shadow-xs"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--primary)]" />
                  <span>Quick Edit</span>
                </button>
              </div>

              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="w-fit ml-auto mt-4 bg-[var(--danger)]/10 hover:bg-[var(--danger)]/20 text-[var(--danger)] text-[12px] font-bold px-4 py-1.5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          );
        })
      ) : (
        <div className="col-span-full bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-xl-value)] p-12 text-center text-[var(--text-muted)]">
          No products found matching your search or filter options.
        </div>
      )}
    </div>
  );
}

export default React.memo(ProductCards);