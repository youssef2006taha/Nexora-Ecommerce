import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/axios";
import ProductCard from "../../../components/UI/ProductCartUpdate";
import { useDispatch } from "react-redux";
// import { addToCart } from "../../../features/cart/cartSlice";
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
      <section className="dashboard-container py-16">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-text-primary">
              Featured Products
            </h2>
            <p className="mt-2 text-text-muted">
              Discover our handpicked premium products
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-border p-spacing-md animate-pulse"
            >
              <div className="aspect-square rounded-md bg-bg-hover mb-4" />
              <div className="h-4 bg-bg-hover rounded w-3/4 mb-2" />
              <div className="h-4 bg-bg-hover rounded w-1/2 mb-4" />
              <div className="h-9 bg-bg-hover rounded-md w-full" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="dashboard-container py-16">
        <h2 className="text-center text-danger">{error}</h2>
      </section>
    );
  }

  return (
    <section className="dashboard-container py-16">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-block text-xs font-semibold tracking-wide uppercase text-primary bg-primary-light px-3 py-1 rounded-full mb-3">
            Handpicked
          </span>
          <h2 className="text-3xl font-bold text-text-primary">
            Featured Products
          </h2>
          <p className="mt-2 text-text-muted">
            Discover our handpicked premium products
          </p>
        </div>

        <Link
          to="/shop"
          className="rounded-md bg-primary px-6 py-3 font-semibold text-text-white shadow-primary transition-colors duration-300 hover:bg-primary-hover"
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
