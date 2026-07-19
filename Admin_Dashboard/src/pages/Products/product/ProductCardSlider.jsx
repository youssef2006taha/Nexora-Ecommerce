import React, { useState, useEffect } from "react";
import { Package, ChevronLeft, ChevronRight } from "lucide-react";

function ProductCardSlider({ product }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const rawImages = product?.images || [];
  const images = rawImages.map((img) => typeof img === "object" ? img.url : img).filter(Boolean);

  if (images.length === 0 && product?.image) {
    images.push(product.image);
  }

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev === images.length - 1 ? 0 : prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => prev === images.length - 1 ? 0 : prev + 1);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
  };

  if (images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[var(--bg-main)]">
        <Package className="w-12 h-12 text-[var(--text-muted)]" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full group overflow-hidden rounded-[var(--radius-md-value)]">
      <img
        src={images[currentIndex]}
        alt={product?.name}
        className="w-full h-full object-cover transition-all duration-500"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--bg-card)]/90 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer text-[var(--text-primary)] border border-[var(--border)]"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--bg-card)]/90 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer text-[var(--text-primary)] border border-[var(--border)]"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? "w-5 bg-[var(--primary)]" : "w-2 bg-[var(--text-muted)]/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default React.memo(ProductCardSlider);