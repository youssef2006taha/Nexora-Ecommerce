import React from "react";
import api from "../../api/axios";
import useAuth from "../../context/AuthContext";
import HowItWorks from "./sections/HowItWorks";
import Newsletter from "./sections/Newsletter";
import FeaturedProducts from "./sections/FeaturedProducts";
import Hero from "./sections/HeroSection";
import ShopByCategory from "./sections/ShopByCategory";

const HomePage = () => {
    return (
        <div>
            <Hero />
            <ShopByCategory />
            <FeaturedProducts />
            <HowItWorks />
            <Newsletter />
        </div>
    );
};

export default React.memo(HomePage);
