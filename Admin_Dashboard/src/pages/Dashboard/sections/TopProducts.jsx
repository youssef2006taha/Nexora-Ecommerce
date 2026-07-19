import React from "react";

function TopProducts({ dashboard = {} }) {
  const products = Array.isArray(dashboard.topProducts)
    ? dashboard.topProducts
    : [];

  return (
    <div
      className="
        w-full
        rounded-xl
        border border-border
        bg-bg-card/65
        backdrop-blur-md
        p-6 md:p-8
        shadow-sm
        transition-all
        duration-300
      "
    >
      <div className="mb-1">
        <span className="text-[11px] font-bold uppercase tracking-widest text-accent">
          Top Products
        </span>
      </div>

      <h2 className="mb-6 text-[22px] font-bold text-text-primary">
        Best Sellers
      </h2>

      <div className="space-y-3">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div
              key={product._id || `${product.name}-${index}`}
              className="
                flex w-full items-center justify-between
                rounded-lg
                border border-border
                bg-bg-main/30
                backdrop-blur-sm
                p-3.5

                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-bg-hover/40
                hover:shadow-xs
              "
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={product.image || "https://via.placeholder.com/96"}
                  alt={product.name || "Product"}
                  className="
                    h-14 w-14 shrink-0
                    rounded-md
                    border border-border
                    bg-bg-card
                    object-cover
                  "
                />

                <div>
                  <h4 className="
                    line-clamp-1
                    text-[13px]
                    font-bold
                    tracking-tight
                    text-text-primary
                  ">
                    {product.name || "Unnamed Product"}
                  </h4>

                  <p className="
                    mt-1
                    text-[11px]
                    font-medium
                    text-text-muted
                  ">
                    {Number(product.totalSold || 0)} units sold

                    <span className="mx-1 opacity-40">
                      •
                    </span>

                    $
                    {Number(product.revenue || 0).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="
            py-10
            text-center
            text-text-muted
          ">
            No products available
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(TopProducts);