import React from 'react';

const ProductCard = ({ product }) => {
  // للتأكد من عدم حدوث خطأ لو الـ product مبعوت فاضي بالغلط
  if (!product) return null;

  const { 
    name, 
    price, 
    image, 
    category, 
    rating = 0, 
    reviewsCount = 0, 
    inStock = true, 
    discount 
  } = product;

  // حماية العملية الحسابية: لو مفيش خصم، الـ oldPrice هيبقى null
  const oldPrice = discount && discount > 0 
    ? Math.round(price / (1 - discount / 100)) 
    : null;

  return (
    <div className="group relative bg-bg-card border border-border radius-md p-spacing-card shadow-sm transition-normal hover:shadow-md flex flex-col justify-between h-full">
      
      <div className="relative w-full aspect-square bg-bg-main radius-sm overflow-hidden flex items-center justify-center mb-4">
        
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {discount && discount > 0 && (
            <span className="bg-danger text-text-white text-xs px-2 py-0.5 radius-full font-bold">
              -{discount}%
            </span>
          )}
          <span className="bg-bg-hover text-text-secondary text-xs px-2 py-0.5 radius-sm capitalize">
            {category}
          </span>
        </div>

        <button className="absolute top-2 right-2 p-2 bg-bg-card/80 text-text-secondary hover:text-danger radius-full shadow-xs transition-fast z-10">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        <img 
          src={image || "https://via.placeholder.com/150"} 
          alt={name} 
          className={`w-full h-full object-contain transition-slow group-hover:scale-105 ${!inStock ? 'opacity-40' : ''}`}
        />

        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-xs">
            <span className="bg-danger/90 text-text-white text-xs px-3 py-1 radius-full font-bold tracking-wide shadow-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-text-primary font-semibold text-base line-clamp-2 mb-1 group-hover:text-primary transition-fast">
            {name}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            <div className="flex text-warning">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < rating ? 'fill-current' : 'stroke-current fill-none'}`} 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              ))}
            </div>
            <span className="text-text-muted text-xs font-medium">({reviewsCount})</span>
          </div>
        </div>

        <div className="mt-2">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-primary font-bold text-lg">EGP {price}</span>
            {oldPrice && (
              <span className="text-text-disabled text-sm line-through">EGP {oldPrice}</span>
            )}
          </div>

          <button 
            disabled={!inStock}
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 radius-sm font-medium transition-normal ${
              inStock 
                ? 'bg-primary hover:bg-primary-hover text-text-white shadow-xs cursor-pointer' 
                : 'bg-bg-active text-text-disabled cursor-not-allowed'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;


// <ProductCard product={prod} />






// {data.map((prod) => (
//     <ProductCard product={prod} />
//   ))}








// prod = { name, price, image, category, rating , reviewsCount , inStock , discount }