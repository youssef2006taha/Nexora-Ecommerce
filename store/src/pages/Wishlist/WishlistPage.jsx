import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import ProductCart from "../../components/UI/ProductCart";

const WishlistPage = () => {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const getWishlist = async () => {
    try {
      setLoading(true);

      const data = await api.get("/wishlists/my");

      setWishlist(data?.wishlist?.products || []);
    } catch (error) {
      console.error(error);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40 bg-bg-main">
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!wishlist.length) {
    return (
      <section className="max-w-7xl mx-auto px-container py-20 bg-bg-main">

        <div className="text-center">

          <div className="w-24 h-24 rounded-full bg-bg-hover flex items-center justify-center mx-auto">
            <Heart
              size={44}
              className="text-text-muted"
            />
          </div>

          <h2 className="mt-8 text-3xl font-bold text-text-primary">
            Your wishlist is empty
          </h2>

          <p className="mt-3 text-text-muted">
            Save items you love to your wishlist.
            They'll be waiting for you here.
          </p>

          <button onClick={() => navigate("/shop")}
            className=" mt-8 px-8 h-12 rounded-[var(--radius-md)]  bg-primary hover:bg-primary-hover text-white  font-semibold transition-all duration-300 shadow-sm " >
            Browse Products
          </button>

        </div>

      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-container py-10 bg-bg-main">

      <h1 className="text-3xl font-bold text-text-primary mb-8">
        My Wishlist
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {wishlist.map((product) => (
          <ProductCard  key={product._id} product={product} mode="wishlist" refreshWishlist={getWishlist} />
        ))}

      </div>

    </section>
  );
};

export default WishlistPage;
