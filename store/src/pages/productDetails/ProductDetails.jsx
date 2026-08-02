import { useDispatch } from "react-redux";
import { AddToCartThunk } from "../../features/cart/Thunks/AddToCartThunk";
import { AddToWishlistThunk } from "../../features/wishlist/Thunks/AddToWishlistThunk";
import { RemoveFromWishlistThunk } from "../../features/wishlist/Thunks/RemoveFromWishlistThunk";
import { showToast } from "../../features/Toast/toastSlice";
import SectionWithCircles from "../../components/UI/SectionWithCircles"

import {
  ChevronLeft,
  ChevronRight,
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  User,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

// https://e-commerce-api-3wara.vercel.app
const API_BASE = "https://ecommerce-backend-eight-gilt.vercel.app";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [currentImage, setCurrentImage] = useState(0);

  const [cartLoading, setCartLoading] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    let ignore = false;
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${API_BASE}/products/${id}`);
        if (!ignore) {
          setProduct(res.data.product);
          setCurrentImage(0);
          setQuantity(1);
          setWishlisted(false);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err.response?.status === 404
              ? "Product not found."
              : "Failed to load product.",
          );
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    if (id) fetchProduct();
    return () => {
      ignore = true;
    };
  }, [id]);

  // Check whether this product is already in the user's wishlist,
  // so the heart shows red on load instead of only after clicking.
  useEffect(() => {
    let ignore = false;
    const checkWishlist = async () => {
      try {
        const res = await axios.get(`${API_BASE}/wishlists/my`, {
          withCredentials: true,
        });
        const products = res.data?.wishlist?.products || [];
        const isInWishlist = products.some((p) => p._id === id);
        if (!ignore) setWishlisted(isInWishlist);
      } catch (err) {
        // not logged in / no wishlist yet — safe to ignore
        if (!ignore) setWishlisted(false);
      }
    };

    if (id) checkWishlist();
    return () => {
      ignore = true;
    };
  }, [id]);

  const stock = product?.stock ?? 0;
  const inStock = stock > 0;

  const handleAddToCart = async () => {
    if (!inStock || cartLoading) return;

    try {
      setCartLoading(true);

      await dispatch(AddToCartThunk({ id, quantity })).unwrap();

      dispatch(
        showToast({
          open: true,
          severity: "success",
          message: "Product added to cart successfully!",
        }),
      );
    } catch (error) {
      dispatch(
        showToast({
          open: true,
          severity: "error",
          message: error || "Failed to add product to cart.",
        }),
      );
      console.error(error);
    } finally {
      setCartLoading(false);
    }
  };

  const handleToggleWishlist = async () => {
    if (wishLoading) return;

    try {
      setWishLoading(true);

      if (wishlisted) {
        // already in wishlist -> remove it
        await dispatch(RemoveFromWishlistThunk(id)).unwrap();

        setWishlisted(false);

        dispatch(
          showToast({
            open: true,
            severity: "success",
            message: "Product removed from wishlist.",
          }),
        );
      } else {
        // not in wishlist -> add it
        await dispatch(AddToWishlistThunk(id)).unwrap();

        setWishlisted(true);

        dispatch(
          showToast({
            open: true,
            severity: "success",
            message: "Product added to wishlist!",
          }),
        );
      }
    } catch (error) {
      dispatch(
        showToast({
          open: true,
          severity: "error",
          message:
            error ||
            `Failed to ${wishlisted ? "remove" : "add"} product ${
              wishlisted ? "from" : "to"
            } wishlist.`,
        }),
      );
    } finally {
      setWishLoading(false);
    }
  };

  if (loading) {
    return (
      <SectionWithCircles className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 animate-pulse">
            <div className="aspect-square rounded-2xl bg-bg-hover" />
            <div className="space-y-4">
              <div className="h-4 w-24 bg-bg-hover rounded" />
              <div className="h-10 w-3/4 bg-bg-hover rounded" />
              <div className="h-6 w-40 bg-bg-hover rounded" />
              <div className="h-12 w-48 bg-bg-hover rounded" />
              <div className="h-24 w-full bg-bg-hover rounded" />
            </div>
          </div>
        </div>
      </SectionWithCircles>
    );
  }

  if (error || !product) {
    return (
      <SectionWithCircles className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-text-primary text-lg font-semibold mb-2">
            {error || "Product not found."}
          </p>
          <Link
            to="/"
            className="text-primary hover:text-primary-hover text-sm font-medium"
          >
            ← Back to shop
          </Link>
        </div>
      </SectionWithCircles>
    );
  }

  const {
    name,
    category,
    price,
    discountPrice,
    images = [],
    description,
    shortDescription,
    averageRating = 0,
    numReviews = 0,
    reviews = [],
  } = product;

  const imageUrls = images.length
    ? images.map((img) => img.url)
    : ["https://via.placeholder.com/500"];

  const discountPercent =
    discountPrice && discountPrice < price
      ? Math.round(((price - discountPrice) / price) * 100)
      : null;

  const finalPrice = discountPercent ? discountPrice : price;

  return (
    <SectionWithCircles className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-text-muted mb-6">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="capitalize">{category}</span>
          <span>/</span>
          <span className="text-text-secondary line-clamp-1">{name}</span>
        </nav>

        {/* ================= Product Card ================= */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="group relative rounded-2xl bg-bg-hover aspect-square flex items-center justify-center overflow-hidden">
              <img
                src={imageUrls[currentImage]}
                alt={name}
                className="w-full h-full object-contain p-10"
              />

              {discountPercent && (
                <span className="absolute top-4 left-4 bg-danger text-text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  -{discountPercent}%
                </span>
              )}

              {imageUrls.length > 1 && (
                <>
                  <button
                    aria-label="Previous image"
                    onClick={() =>
                      setCurrentImage((i) =>
                        i === 0 ? imageUrls.length - 1 : i - 1,
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-bg-card border border-border shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-text-secondary hover:text-primary"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    aria-label="Next image"
                    onClick={() =>
                      setCurrentImage((i) =>
                        i === imageUrls.length - 1 ? 0 : i + 1,
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-bg-card border border-border shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-text-secondary hover:text-primary"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {imageUrls.length > 1 && (
              <div className="flex gap-3 mt-4">
                {imageUrls.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImage === index
                        ? "border-primary"
                        : "border-border hover:border-text-disabled"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-border-light">
              <div className="flex flex-col items-center text-center gap-1.5">
                <Truck size={18} className="text-primary" />
                <span className="text-xs text-text-muted">Fast delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <ShieldCheck size={18} className="text-primary" />
                <span className="text-xs text-text-muted">Secure checkout</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <RotateCcw size={18} className="text-primary" />
                <span className="text-xs text-text-muted">Easy returns</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <span className="text-primary text-xs font-semibold uppercase tracking-wide">
              {category}
            </span>

            <h1 className="mt-2 text-2xl md:text-3xl font-bold text-text-primary leading-snug">
              {name}
            </h1>

            {/* Rating */}
            <button
              onClick={() => setActiveTab("reviews")}
              className="flex items-center gap-2 mt-3 w-fit"
            >
              <div className="flex text-warning">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={
                      i < Math.round(averageRating) ? "currentColor" : "none"
                    }
                    className={
                      i < Math.round(averageRating) ? "" : "text-border"
                    }
                  />
                ))}
              </div>
              <span className="text-text-muted text-sm hover:text-primary transition-colors">
                {averageRating.toFixed(1)} ({numReviews} review
                {numReviews === 1 ? "" : "s"})
              </span>
            </button>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-5">
              <span className="text-3xl font-bold text-primary">
                EGP {finalPrice.toLocaleString()}
              </span>
              {discountPercent && (
                <span className="text-text-disabled text-base line-through">
                  EGP {price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-1.5 mt-3">
              {inStock ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span className="text-success text-sm font-medium">
                    In stock{stock <= 10 ? ` — only ${stock} left` : ""}
                  </span>
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-danger" />
                  <span className="text-danger text-sm font-medium">
                    Out of stock
                  </span>
                </>
              )}
            </div>

            <p className="text-text-secondary text-sm leading-relaxed mt-5">
              {shortDescription}
            </p>

            {/* Quantity + Cart */}
            <div className="flex items-center gap-3 mt-8">
              <div className="flex items-center border border-border rounded-lg overflow-hidden shrink-0">
                <button
                  aria-label="Decrease quantity"
                  className="w-10 h-11 flex items-center justify-center text-text-secondary hover:bg-bg-hover disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center text-sm font-medium text-text-primary">
                  {quantity}
                </span>
                <button
                  aria-label="Increase quantity"
                  className="w-10 h-11 flex items-center justify-center text-text-secondary hover:bg-bg-hover disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={() =>
                    setQuantity((q) => Math.min(stock || 99, q + 1))
                  }
                  disabled={quantity >= (stock || 99)}
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!inStock || cartLoading}
                className="flex-1 h-11 flex items-center justify-center gap-2 rounded-lg font-medium text-sm transition-colors bg-primary hover:bg-primary-hover text-text-white shadow-primary disabled:bg-bg-active disabled:text-text-disabled disabled:shadow-none disabled:cursor-not-allowed"
              >
                <ShoppingCart size={17} />
                {!inStock
                  ? "Out of stock"
                  : cartLoading
                    ? "Adding..."
                    : "Add to cart"}
              </button>

              <button
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                onClick={handleToggleWishlist}
                disabled={wishLoading}
                className={`w-11 h-11 shrink-0 rounded-lg border flex items-center justify-center transition-colors disabled:opacity-60 ${
                  wishlisted
                    ? "border-danger text-danger"
                    : "border-border text-text-secondary hover:text-danger hover:border-danger"
                }`}
              >
                <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>

        {/* ================= Description / Reviews ================= */}
        <div className="mt-16">
          <div className="flex gap-8 border-b border-border">
            {[
              { key: "description", label: "Description" },
              { key: "reviews", label: `Reviews (${numReviews})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  activeTab === tab.key
                    ? "text-primary border-primary"
                    : "text-text-muted border-transparent hover:text-text-secondary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "description" && (
            <div className="mt-8">
              <p className="text-text-secondary text-sm leading-7">
                {description}
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="mt-8">
              {/* Review form */}
              <div className="bg-bg-hover/60 border border-border-light rounded-xl p-6">
                <h3 className="text-text-primary font-semibold mb-4">
                  Write a review
                </h3>

                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} aria-label={`Rate ${star} stars`}>
                      <Star
                        size={22}
                        className="text-border hover:text-warning transition-colors cursor-pointer"
                      />
                    </button>
                  ))}
                </div>

                <textarea
                  rows={4}
                  placeholder="Share your thoughts..."
                  className="w-full rounded-lg p-3 text-sm resize-none outline-none border border-border bg-bg-card text-text-primary placeholder:text-text-placeholder focus:border-primary transition-colors"
                />

                <button className="mt-4 px-6 py-2.5 rounded-lg text-text-white text-sm font-medium bg-primary hover:bg-primary-hover transition-colors">
                  Submit review
                </button>
              </div>

              {/* Review list */}
              <div className="mt-10 divide-y divide-border-light max-w-3xl">
                {reviews.length === 0 ? (
                  <p className="text-text-muted text-sm py-4">
                    No reviews yet — be the first to share your thoughts.
                  </p>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review._id}
                      className="flex gap-4 py-6 first:pt-0"
                    >
                      <div className="w-11 h-11 shrink-0 rounded-full bg-primary-light flex items-center justify-center">
                        <User size={19} className="text-primary" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-sm text-text-primary">
                            {review.username}
                          </h4>
                          <span className="text-text-disabled text-xs">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex text-warning mt-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              fill={i < review.rating ? "currentColor" : "none"}
                              className={i < review.rating ? "" : "text-border"}
                            />
                          ))}
                        </div>

                        <p className="text-text-secondary text-sm leading-6">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionWithCircles>
  );
}