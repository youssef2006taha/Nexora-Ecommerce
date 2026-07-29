import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import WishlistCard from "./sections/WishlistCard";
import SectionWithCircles from "../../components/UI/SectionWithCircles";

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
    window.scrollTo(0, 0);
    getWishlist();
  }, []);

  if (loading) {
    return (
      <SectionWithCircles className="w-full min-h-[60vh] flex justify-center items-center py-40">
        <div className="w-10 h-10 mx-auto rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </SectionWithCircles>
    );
  }

  if (!wishlist.length) {
    return (
      <SectionWithCircles className="w-full min-h-[70vh] flex items-center justify-center py-20">
        <div className="max-w-7xl mx-auto px-container text-center w-full">
          <div className="w-24 h-24 rounded-full bg-bg-hover flex items-center justify-center mx-auto">
            <Heart size={44} className="text-text-muted" />
          </div>

          <h2 className="mt-8 text-3xl font-bold text-text-primary">
            Your wishlist is empty
          </h2>

          <p className="mt-3 text-text-muted">
            Save items you love to your wishlist. They'll be waiting for you
            here.
          </p>

          <button
            onClick={() => navigate("/shop")}
            className="mt-8 px-8 h-12 rounded-[var(--radius-md)] bg-primary hover:bg-primary-hover text-white font-semibold transition-all duration-300 shadow-sm cursor-pointer"
          >
            Browse Products
          </button>
        </div>
      </SectionWithCircles>
    );
  }

  return (
    <SectionWithCircles className="w-full min-h-[70vh] py-15">
      <div className="max-w-7xl mx-auto px-container">
        <h1 className="text-3xl font-bold text-text-primary mb-8">My Wishlist</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <WishlistCard
              key={product._id}
              product={product}
              refreshWishlist={getWishlist}
            />
          ))}
        </div>
      </div>
    </SectionWithCircles>
  );
};

export default WishlistPage;