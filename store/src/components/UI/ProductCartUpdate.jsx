import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AddToCartThunk } from "../../features/cart/Thunks/AddToCartThunk";

const ProductCard = ({
  product,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  const {
    id,
    name,
    price,
    image,
    category,
    rating = 0,
    reviewsCount = 0,
    inStock = true,
    discount,
  } = product;

  const [cartLoading, setCartLoading] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);
  const [wishlisted, setWishlisted] = useState(isWishlisted);
  const cartDispatch = useDispatch();

  const oldPrice =
    discount && discount > 0 ? Math.round(price / (1 - discount / 100)) : null;

  const handleAddToCart = async () => {
    if (!inStock || cartLoading) return;
    console.log("dfbdfbd")
    try {
      setCartLoading(true);
      await cartDispatch(AddToCartThunk({ id }));
    } catch (err) {
      console.log(err);
    } finally {
      setCartLoading(false);
    }
  };

  const handleToggleWishlist = async () => {
    if (!onToggleWishlist || wishLoading) return;
    try {
      setWishLoading(true);
      await onToggleWishlist(id);
      setWishlisted(true);
    } catch (err) {
      console.log(err);
    } finally {
      setWishLoading(false);
    }
  };

  return (
    <div className="group relative bg-bg-card border border-border rounded-lg p-spacing-md shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col justify-between h-full">
      <div className="relative w-full aspect-square rounded-md overflow-hidden bg-bg-hover flex items-center justify-center mb-4">
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {discount > 0 && (
            <span className="bg-danger text-text-white text-xs px-2 py-0.5 rounded-full font-bold">
              -{discount}%
            </span>
          )}
          <span className="bg-bg-card/90 text-text-secondary text-xs px-2 py-0.5 rounded-full capitalize shadow-xs">
            {category}
          </span>
        </div>

        <img
          src={image || "https://via.placeholder.com/300"}
          alt={name}
          className={`w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 ${!inStock ? "opacity-40" : ""}`}
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <button
            aria-label="Add to wishlist"
            onClick={handleToggleWishlist}
            disabled={wishLoading}
            className={`opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 p-3 bg-bg-card rounded-full shadow-md ${
              wishlisted
                ? "text-danger"
                : "text-text-secondary hover:text-danger"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill={wishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <span className="bg-danger/90 text-text-white text-xs px-3 py-1 rounded-full font-bold tracking-wide shadow-xs">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="flex-grow flex flex-col justify-between ">
        <div className="px-4">
          <h3 className="  text-text-primary font-semibold text-base line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {name}
          </h3>

          <div className="flex items-center gap-1 mb-3   ">
            <div className="flex text-warning">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < rating ? "fill-current" : "stroke-current fill-none text-border"}`}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              ))}
            </div>
            <span className="text-text-muted text-xs font-medium">
              ({reviewsCount})
            </span>
          </div>
        </div>

        <div className="mt-2  ">
          <div className="flex items-baseline gap-2 mb-3 px-4">
            <span className="text-primary font-bold text-lg">EGP {price}</span>
            {oldPrice && (
              <span className="text-text-disabled text-sm line-through">
                EGP {oldPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!inStock || cartLoading}
            className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md font-medium transition-colors duration-300 ${
              inStock
                ? "bg-primary hover:bg-primary-hover text-text-white shadow-primary cursor-pointer"
                : "bg-bg-active text-text-disabled cursor-not-allowed"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>
            {!inStock
              ? "Out of Stock"
              : cartLoading
                ? "Adding..."
                : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
