// components/UI/WishlistCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { X } from "lucide-react";
import { RemoveFromWishlistThunk } from "../../../features/wishlist/Thunks/RemoveFromWishlistThunk";
import { AddToCartThunk } from "../../../features/cart/Thunks/AddToCartThunk";
import { showToast } from "../../../features/Toast/toastSlice";

const WishlistCard = ({ product }) => {
  const {
    _id: id,
    name,
    price,
    images,
    category,
    averageRating = 0,
    numReviews = 0,
    stock,
    discountPrice,
  } = product;

  const dispatch = useDispatch();
  const [removing, setRemoving] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  const image = images?.[0]?.url;
  const inStock = stock > 0;
  const hasDiscount = discountPrice && discountPrice < price;
  const discountPercent = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : null;

  const handleRemove = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (removing) return;

    try {
      setRemoving(true);
      await dispatch(RemoveFromWishlistThunk(id)).unwrap();
      dispatch(
        showToast({
          open: true,
          severity: "success",
          message: "Removed from wishlist.",
        }),
      );
    } catch (error) {
      dispatch(
        showToast({
          open: true,
          severity: "error",
          message: error || "Failed to remove item.",
        }),
      );
      setRemoving(false);
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock || cartLoading) return;

    try {
      setCartLoading(true);
      await dispatch(AddToCartThunk({ id, quantity: 1 })).unwrap();
      dispatch(
        showToast({
          open: true,
          severity: "success",
          message: "Added to cart!",
        }),
      );
    } catch (error) {
      dispatch(
        showToast({
          open: true,
          severity: "error",
          message: error || "Failed to add to cart.",
        }),
      );
    } finally {
      setCartLoading(false);
    }
  };

  // Card fades out while the delete request is in flight
  if (removing) {
    return (
      <div className="relative bg-bg-card border border-border rounded-lg h-full opacity-40 pointer-events-none transition-opacity duration-300 flex items-center justify-center min-h-[320px]">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="group relative bg-bg-card border border-border rounded-lg p-spacing-md shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col justify-between h-full">
      {/* Remove button — always visible, top-right, no hover needed on mobile */}
      <button
        aria-label="Remove from wishlist"
        onClick={handleRemove}
        className="absolute top-3 right-3 z-20 p-2 bg-bg-card/90 hover:bg-danger hover:text-text-white text-text-secondary rounded-full shadow-md transition-colors duration-200"
      >
        <X className="w-4 h-4" />
      </button>

      <Link
        to={`/product/${id}`}
        className="relative w-full aspect-square rounded-md overflow-hidden bg-bg-hover flex items-center justify-center mb-4"
      >
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {discountPercent > 0 && (
            <span className="bg-danger text-text-white text-xs px-2 py-0.5 rounded-full font-bold">
              -{discountPercent}%
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

        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <span className="bg-danger/90 text-text-white text-xs px-3 py-1 rounded-full font-bold tracking-wide shadow-xs">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      <div className="flex-grow flex flex-col justify-between">
        <div className="px-4">
          <Link to={`/product/${id}`}>
            <h3 className="text-text-primary font-semibold text-base line-clamp-2 mb-1 group-hover:text-primary transition-colors">
              {name}
            </h3>
          </Link>

          <div className="flex items-center gap-1 mb-3">
            <div className="flex text-warning">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(averageRating) ? "fill-current" : "stroke-current fill-none text-border"}`}
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
              ({numReviews})
            </span>
          </div>
        </div>

        <div className="mt-2">
          <div className="flex items-baseline gap-2 mb-3 px-4">
            <span className="text-primary font-bold text-lg">
              EGP {hasDiscount ? discountPrice : price}
            </span>
            {hasDiscount && (
              <span className="text-text-disabled text-sm line-through">
                EGP {price}
              </span>
            )}
          </div>

          <div className="py-4 px-5">
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
    </div>
  );
};

export default React.memo(WishlistCard);
