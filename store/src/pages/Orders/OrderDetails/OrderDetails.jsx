import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import axios from "axios";


const API_BASE = "https://e-commerce-api-3wara.vercel.app";

function authHeaders(extra = {}) {
    const token = localStorage.getItem("koda-token");
    return {
        ...extra,
        Authorization: token ? `Bearer ${token}` : "",
    };
}

function OrderDetails() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [quantity, setQuantity] = useState(1);
    const [wishlisted, setWishlisted] = useState(false);
    const [addingToCart, setAddingToCart] = useState(false);
    const [cartMessage, setCartMessage] = useState("");


    const fetchProduct = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const { data } = await axios.get(
                `${API_BASE}/orders/my/${id}`,
                {
                    headers: authHeaders(),
                }
            );

            if (data.success) {
                setProduct(data.product);
                setOrder(data.order);
            } else {
                setError(data.message || "Product not found");
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Could not connect to the server"
            );
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    const handleQuantityChange = (delta) => {
        setQuantity((prev) => {
            const next = prev + delta;
            const max = product?.stock ?? 99;
            if (next < 1) return 1;
            if (next > max) return max;
            return next;
        });
    };

    const handleAddToCart = async () => {
        if (!product) return;

        setAddingToCart(true);
        setCartMessage("");

        try {
            const { data } = await axios.post(`${API_BASE}/carts/items`,
                {
                    productId: product._id,
                    quantity,
                },
                {
                    headers: authHeaders({
                        "Content-Type": "application/json",
                    }),
                }
            );

            if (data.success) {
                setCartMessage("Added to cart");
            } else {
                setCartMessage(data.message || "Could not add to cart");
            }
        } catch (err) {
            setCartMessage(
                err.response?.data?.message || "Could not connect to the server"
            );
        } finally {
            setAddingToCart(false);

            setTimeout(() => {
                setCartMessage("");
            }, 3000);
        }
    };

    const handleWishlist = async () => {

        try {
            if (!wishlisted) {
                const res = await axios.post(`${API_BASE}/wishlists/add/${id}`, {},
                    {
                        headers: authHeaders()
                    }
                )
                if (res.data.success) {
                    setWishlisted(true)
                }
            } else {
                const res = await axios.delete(
                    `${API_BASE}/wishlists/remove/${id}`,
                    {
                        headers: authHeaders(),
                    }
                );
                if (res.data.success) {
                    setWishlisted(false)
                }
            }
        } catch (error) {
            console.log(error.response?.data?.message);

        }



    }
    if (loading) {
        return (
            <div className=" min-h-screen flex    items-center justify-center bg-bg-main">
                <div className="w-8 h-8 rounded-full    border-2 border-primary  border-t-transparent animate-spin" />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-main">
                <p className="text-danger text-sm">{error || "Product not found"}</p>
            </div>
        );
    }

    const hasDiscount = product.discountPrice && product.discountPrice < product.price;
    const discountPercent = hasDiscount
        ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
        : 0;

    return (
        <div className="order-details min-h-screen bg-bg-main">
            <div className="container max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <img
                        src={product.images?.[0]?.url}
                        alt={product.name}
                        className=" w-full aspect-square  object-cover  rounded-radius-lg   border  border-border bg-bg-card"
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <div>
                        <span className="text-sm  font-medium  text-primary">{product.brand}</span>
                        <span className="text-sm text-text-muted"> · {product.category}</span>
                    </div>

                    <h1 className="text-2xl  font-bold   text-text-primary">{product.name}</h1>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) =>
                            i < Math.round(product.averageRating || 0) ? (
                                <FaStar key={i} className="text-warning" size={16} />
                            ) : (
                                <FaRegStar key={i} className="text-text-disabled" size={16} />
                            )
                        )}
                        <span className="ml-2 text-xs text-text-muted">
                            {product.averageRating?.toFixed(1) || "0.0"} ({product.numReviews || 0} reviews)
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-text-primary">
                            ${hasDiscount ? product.discountPrice.toFixed(2) : product.price.toFixed(2)}
                        </span>
                        {hasDiscount && (
                            <>
                                <span className=" text-base text-text-muted line-through">
                                    ${product.price.toFixed(2)}
                                </span>
                                <span className="px-2 py-0.5 text-xs font-semibold rounded-radius-full bg-danger-bg text-danger">
                                    -{discountPercent}%
                                </span>
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <div className="flex items-center border border-border rounded-radius-md">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                className="w-9  h-9 flex items-center justify-center text-text-secondary hover:bg-bg-hover transition-colors"
                            >
                                -
                            </button>
                            <span className="w-10 text-center text-sm text-text-primary">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                className=" w-9 h-9 flex items-center justify-center text-text-secondary hover:bg-bg-hover transition-colors"
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={addingToCart || product.stock === 0}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-radius-md bg-primary text-text-white hover:bg-primary-hover disabled:opacity-60 transition-colors"
                        >
                            <FiShoppingCart size={18} />
                            {product.stock === 0
                                ? "Out of stock"
                                : addingToCart
                                    ? "Adding..."
                                    : "Add to cart"}
                        </button>

                        <button
                            onClick={handleWishlist}
                            aria-label="Add to wishlist"
                            className="w-11 h-11 flex items-center justify-center rounded-radius-md border border-border hover:bg-bg-hover transition-colors"
                        >
                            <FiHeart
                                size={18}
                                className={wishlisted ? "text-danger fill-danger" : "text-text-secondary"}
                                fill={wishlisted ? "currentColor" : "none"}
                            />
                        </button>
                    </div>

                    {cartMessage && (
                        <p className="text-sm text-text-secondary">{cartMessage}</p>
                    )}

                    <div className="pt-4 border-t border-divider">
                        <p className="text-sm text-text-secondary leading-relaxed">
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;