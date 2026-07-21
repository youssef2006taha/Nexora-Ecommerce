import React, { useState, useEffect } from "react";
import { Heart, ShoppingCart, Star, CheckCircle, Trash2, } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const ProductCard = ({ product, mode, refreshWishlist }) => {
  const navigate = useNavigate();

  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({
          show: false,
          message: "",
          type: "",
        });
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const data = await api.get("/wishlists/my");

        const products = data?.wishlist?.products || [];

        const exists = products.some(
          (item) => item._id === product?._id
        );

        setIsWishlist(exists);
      } catch (err) {
        console.log(err);
      }
    };

    if (product?._id) {
      checkWishlist();
    }
  }, [product?._id]);

  const id = product?.productId;

  const image = product?.images?.[0]?.url;

  const name = product?.name;

  const category = product?.category;

  const price = product?.price;

  const discountPrice =
    product?.discountPrice ??
    product?.discount ??
    price;

  const rating =
    product?.averageRating ??
    product?.rating ??
    0;

  const reviews =
    product?.numReviews ??
    product?.reviewsCount ??
    0;

  const discountPercentage =
    price && discountPrice
      ? Math.round(
          ((price - discountPrice) / price) * 100
        )
      : 0;

  const handleWishlist = async (e) => {
    e.stopPropagation();

    if (loadingWishlist) return;

    const previousWishlistState = isWishlist;

    try {
      setLoadingWishlist(true);

      if (!previousWishlistState) {
        await api.post(`/wishlists/add/${id}`);
        setIsWishlist(true);
      } else {
        await api.delete(`/wishlists/remove/${id}`);
        setIsWishlist(false);

        if (mode === "wishlist" && refreshWishlist) {
          refreshWishlist();
        }
      }

      setToast({
        show: true,
        message: !previousWishlistState
          ? "Added to wishlist"
          : "Removed from wishlist",
        type: !previousWishlistState
          ? "wishlist_add"
          : "wishlist_remove",
      });
    } catch (err) {
      console.error(
        "Wishlist API Error:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
          "Please login first."
      );
    } finally {
      setLoadingWishlist(false);
    }
  };

  const handleRemoveWishlist = async (e) => {
    e.stopPropagation();

    try {
      await api.delete(`/wishlists/remove/${id}`);

      refreshWishlist?.();

      setToast({
        show: true,
        message: "Removed from wishlist",
        type: "wishlist_remove",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    if (loadingCart) return;

    try {
      setLoadingCart(true);

      await api.post("/carts/items", {
        productId: id,
        quantity: 1,
      });

      setToast({
        show: true,
        message: "Added to cart",
        type: "cart",
      });
    } catch (err) {
      console.error(
        "Cart API Error:",
        err.response?.data || err.message
      );
    } finally {
      setLoadingCart(false);
    }
  };

  const handleOpenProduct = () => {
    navigate(`/products/${id}`);
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={15}
        className={
          index < Math.round(rating)
            ? "fill-amber-500 text-amber-500"
            : "fill-slate-200 text-slate-200"
        }
      />
    ));
  };
  return (
  <>
    {toast.show && (
      <div className=" fixed top-10 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2.5 bg-bg-card text-text-primary px-5 py-2.5 rounded-full shadow-lg border border-border " >
        {toast.type === "cart" && (
          <CheckCircle size={17} className="text-success"  />
        )}

        {toast.type === "wishlist_add" && (
          <Heart size={17} className="fill-red-500 text-red-500" />
        )}

        {toast.type === "wishlist_remove" && (
          <Heart size={17}  className="text-text-muted" />
        )}

        <span className="text-xs font-semibold tracking-wide">
          {toast.message}
        </span>
      </div>
    )}

    <div onClick={handleOpenProduct}
      className=" group max-w-[320px] w-full mx-auto flex flex-col overflow-hidden rounded-[var(--radius-lg)] bg-bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer" >
      {/* Image */}

      <div className="relative h-[260px] bg-bg-main p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between z-10">
          <span className=" px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary-light text-primary capitalize" >
            {category}
          </span>

          <div className="flex items-center gap-2">
            {discountPercentage > 0 && (
              <span className=" px-2 py-1 rounded-full  text-[10px]  font-bold  bg-danger-bg text-danger ">
                -{discountPercentage}%
              </span>
            )}

            <button onClick={handleWishlist} disabled={loadingWishlist}
              className=" w-8  h-8 rounded-full flex  items-center justify-center transition hover:scale-110 " >
              <Heart size={19}
                className={ isWishlist  ? "fill-red-500 text-red-500"  : "text-text-muted" } />
            </button>
          </div>
        </div>

        <div className="absolute inset-0 top-12 bottom-4 flex items-center justify-center p-5">
          <img src={image} alt={name}  className="  max-h-full  max-w-full  object-contain transition-transform duration-300  group-hover:scale-105 "/>
        </div>
      </div>

      {/* Content */}

      <div className=" flex flex-col flex-grow justify-between  p-5 bg-bg-card border-t border-divider ">
        <div>
          <h3 className=" text-[15px] font-bold text-text-primary line-clamp-1 group-hover:text-primary transition-colors  ">
            {name}
          </h3>

          {mode !== "wishlist" && (
            <div className="flex items-center gap-1 mt-2">
              <div className="flex">
                {renderStars()}
              </div>

              <span className="text-xs text-text-muted">
                ({reviews})
              </span>
            </div>
          )}

          <div className="mt-3 flex items-end gap-2">
            <span className="text-lg font-bold text-primary">
              EGP {discountPrice}
            </span>

            {discountPrice !== price && (
              <span className="text-sm line-through text-text-disabled">
                EGP {price}
              </span>
            )}
          </div>
        </div>
                <div className="mt-4 flex gap-2">

          <button onClick={handleAddToCart} disabled={loadingCart}
            className=" flex-1  h-10  rounded-[var(--radius-md)] bg-primary  hover:bg-primary-hover text-white font-medium text-[13px] flex items-center justify-center gap-2 transition-all  duration-300 disabled:opacity-70 shadow-sm " >
            <ShoppingCart size={16} />

            <span>
              {loadingCart ? "Adding..." : "Add To Cart"}
            </span>
          </button>

          {mode === "wishlist" && (
            <button
              onClick={handleRemoveWishlist}
              className="w-10 h-10 rounded-[var(--radius-md)] border border-danger bg-danger-bg text-danger flex items-center justify-center transition-all duration-300 hover:opacity-80 hover:scale-105" >
              <Trash2 size={18} strokeWidth={2} />
            </button>
)}

        </div>

      </div>

    </div>

  </>
);

};

export default React.memo(ProductCard);