import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WishlistCard from "./sections/WishlistCard";
import SectionWithCircles from "../../components/UI/SectionWithCircles";

import { GetWishlistThunk } from "../../features/wishlist/Thunks/GetWishlistThunk";

const WishlistPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items } = useSelector((store) => store.wishlist);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getWishlist = async () => {
      try {
        setLoading(true);
        await dispatch(GetWishlistThunk());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getWishlist();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  if (loading) {
    return (
      <SectionWithCircles className="w-full min-h-[60vh] flex justify-center items-center py-40">
        <div className="w-10 h-10 mx-auto rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </SectionWithCircles>
    );
  }

  if (!items.length) {
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
        <h1 className="text-3xl font-bold text-text-primary mb-8">
          My Wishlist
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <WishlistCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </div>
    </SectionWithCircles>
  );
};

export default WishlistPage;
