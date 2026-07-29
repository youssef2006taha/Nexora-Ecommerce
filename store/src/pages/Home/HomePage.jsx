import React from "react";
import { useEffect } from "react";
import HowItWorks from "./sections/HowItWorks";
import Newsletter from "./sections/Newsletter";
import FeaturedProducts from "./sections/FeaturedProducts";
import Hero from "./sections/HeroSection";
import ShopByCategory from "./sections/ShopByCategory";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="-mt-5">
      <Hero />
      <ShopByCategory />
      <FeaturedProducts />
      <HowItWorks />
      <Newsletter />
    </div>
  );
};

export default React.memo(HomePage);
