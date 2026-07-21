import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/axios";
import ProductCard from "../../../components/UI/ProductCard";

const FeaturedProducts = () => 
{
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [wishlistIds, setWishlistIds] = useState([]);

const fetchFeaturedProducts = async () => 
{
  try 
  {
    setLoading(true);
    setError("");

    const data = await api.get("/products", {
      params: { limit: 0 },
    });

    const allProducts = data?.products || [];
    const featuredProducts = allProducts.filter(
      (product) => product.featured
    );
    setProducts(featuredProducts);
  } 
  catch (err) 
  {
      console.log(err);
      setError("Failed to load featured products.");
  }
  finally 
  {
    setLoading(false);
  }
};

// POST /carts/items
const handleAddToCart = async (productId) => {
  try {
    const data = await api.post("/carts/items", {
      productId,
      quantity: 1,
    });
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// POST /wishlists/add/{productId}
const handleToggleWishlist = async (productId) => {
  try {
    const data = await api.post(`/wishlists/add/${productId}`);
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev : [...prev, productId]
    );
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  if (loading) 
  {
    return (
      <section className="dashboard-container px-16">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[--text-main]">Featured Products</h2>
            <p className="mt-2 text-[--text-muted]">Discover our handpicked premium products</p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 p-4 animate-pulse">
              <div className="aspect-square rounded-xl bg-gray-100 mb-4" />
              <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-100 rounded w-1/2 mb-4" />
              <div className="h-9 bg-gray-100 rounded-xl w-full" />
            </div>
          ))}
        </div>
      </section>
    );
  }

 if (error) 
 {
    return (
        <section className="dashboard-container px-0 lg:px-16 ">
            <h2 className="text-center text-red-500">{error}</h2>
        </section>
    );
  }

return (
  <section className="dashboard-container px-3 lg:px-16 ">

    {/* Header */}
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
            <span className="inline-block text-xs font-semibold tracking-wide uppercase text-[#4f46e5] bg-[#4f46e5]/10 px-3 py-1 rounded-full mb-3">
              Handpicked
            </span>
            <h2 className="text-3xl font-bold text-[--text-main]">Featured Products</h2>
            <p className="mt-2 text-[--text-muted]">Discover our handpicked premium products</p>
        </div>

      <Link 
        to="/shop" 
        className="rounded-xl bg-[#4f46e5] px-6 py-3 font-semibold text-white shadow-sm shadow-[#4f46e5]/30 transition-colors duration-300 hover:bg-[#4338ca]"
      >
        View All
      </Link>
    </div>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
        ))}
    </div>
  </section>
);
};

export default FeaturedProducts;