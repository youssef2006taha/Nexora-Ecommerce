import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/axios";
import ProductCard from "../../../components/UI/ProductCart";
import { useDispatch } from "react-redux";

import { AddToCartThunk } from "../../../features/cart/Thunks/AddToCartThunk";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [wishlistIds, setWishlistIds] = useState([]);
  const cartDispatch = useDispatch();

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await api.get("/products", {
        params: { limit: 20 },
      });

      const allProducts = data?.products || [];
      const featuredProducts = allProducts.filter(
        (product) => product.featured,
      );
      setProducts(featuredProducts);
    } catch (err) {
      console.log(err);
      setError("Failed to load featured products.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await cartDispatch(AddToCartThunk({ id: product._id }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleWishlist = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to save items to your wishlist.");
      return;
    }
    try {
      const data = await api.post(`/wishlists/add/${productId}`);
      setWishlistIds((prev) =>
        prev.includes(productId) ? prev : [...prev, productId],
      );
      return data;
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        alert("Your session expired. Please log in again.");
      }
      throw err;
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section className="container-noT">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2
              className="text-3xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Featured Products
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
              Discover our handpicked premium products
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border p-4 animate-pulse"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg-card)",
              }}
            >
              <div
                className="aspect-square rounded-xl mb-4"
                style={{ backgroundColor: "var(--bg-hover)" }}
              />
              <div
                className="h-4 rounded w-3/4 mb-2"
                style={{ backgroundColor: "var(--bg-hover)" }}
              />
              <div
                className="h-4 rounded w-1/2 mb-4"
                style={{ backgroundColor: "var(--bg-hover)" }}
              />
              <div
                className="h-10 rounded-xl w-full"
                style={{ backgroundColor: "var(--bg-hover)" }}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container-noT py-16">
        <h2
          className="text-center font-semibold text-lg"
          style={{ color: "var(--danger)" }}
        >
          {error}
        </h2>
      </section>
    );
  }

  return (
    <section className="container-noT py-16">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span
            className="inline-block text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full mb-3"
            style={{
              backgroundColor: "var(--primary-light)",
              color: "var(--primary)",
            }}
          >
            Handpicked
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Featured Products
          </h2>
          <p
            className="mt-2 text-sm sm:text-base"
            style={{ color: "var(--text-muted)" }}
          >
            Discover our handpicked premium products
          </p>
        </div>

        <Link
          to="/shop"
          className="px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          style={{
            backgroundColor: "var(--primary)",
            color: "#ffffff",
            boxShadow: "var(--shadow-primary-value)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--primary-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--primary)")
          }
        >
          View All
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={{
              id: product._id,
              name: product.name,
              price: product.price,
              image: product.images?.[0]?.url,
              category: product.category,
              rating: product.averageRating,
              reviewsCount: product.numReviews,
              inStock: product.stock > 0,
              discount: product.discountPrice,
            }}
            isWishlisted={wishlistIds.includes(product._id)}
            onAddToCart={() => handleAddToCart(product)}
            onToggleWishlist={handleToggleWishlist}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
