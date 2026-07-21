import React, { useState, useEffect } from "react";
import { GiMoebiusStar } from "react-icons/gi";
import { TbCategory2, TbShoppingCartSearch } from "react-icons/tb";
import { Link } from "react-router-dom";
import ShopByCategory from "./ShopByCategory";
import BackgroundCircle from "../../../components/UI/BackgroundCircle";

import img1 from "../../../assets/img1.avif";
import img2 from "../../../assets/img2.avif";
import img3 from "../../../assets/img3.jpg";

const HERO_BACKGROUNDS = [img1, img2, img3];

export default function Hero({ autoPlaySpeed = 4000 }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevIdx(currentIdx);
      setCurrentIdx((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, autoPlaySpeed);

    return () => clearInterval(timer);
  }, [currentIdx, autoPlaySpeed]);

  return (
    <section 
      className="relative w-full overflow-hidden flex items-center min-h-[80vh] py-20 transition-colors duration-300"
      style={{ backgroundColor: "var(--bg-main)" }}
    >
      <div className="absolute inset-0 pointer-events-none z-0 opacity-25 dark:opacity-35">
        {HERO_BACKGROUNDS.map((bgUrl, index) => {
          const isCurrent = index === currentIdx;
          const isPrev = index === prevIdx;

          return (
            <div
              key={bgUrl}
              className={`
                absolute inset-0 
                bg-cover bg-center 
                transition-all duration-1000 ease-in-out
                ${isCurrent ? "opacity-100 scale-105" : isPrev ? "opacity-0 scale-100" : "opacity-0"}
              `}
              style={{ backgroundImage: `url(${bgUrl})` }}
            />
          );
        })}
      </div>

      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "linear-gradient(135deg, var(--bg-main) 0%, rgba(12, 14, 23, 0.75) 50%, var(--bg-main) 100%)"
        }}
      />

      <div className="absolute -top-20 -right-20 pointer-events-none z-20">
        <BackgroundCircle
          size={450}
          color="var(--Background-Circle-color-1)"
          blur={120}
          animate={false}
          className="relative"
          style={{ opacity: "var(--Background-Circle-opacity-1)" }}
        />
      </div>

      <div className="absolute -bottom-20 -left-20 pointer-events-none z-20">
        <BackgroundCircle
          size={400}
          color="var(--Background-Circle-color-2)"
          blur={130}
          animate={false}
          className="relative"
          style={{ opacity: "var(--Background-Circle-opacity-2)" }}
        />
      </div>

      <div className="container-noT relative z-30 w-full">
        <div className="w-full lg:w-[38rem] flex flex-col gap-y-5">
          <p 
            className="inline-flex items-center gap-2 w-fit text-sm font-medium rounded-full px-4 py-1.5 backdrop-blur-md border shadow-sm"
            style={{
              backgroundColor: "var(--primary-light)",
              borderColor: "var(--border)",
              color: "var(--primary)"
            }}
          >
            <GiMoebiusStar className="text-lg" style={{ color: "var(--primary)" }} />
            <span>Premium Shopping Experience</span>
          </p>

          <h1 
            className="text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Shop the future,{" "}
            <span className="block" style={{ color: "var(--primary)" }}>
              delivered today
            </span>
          </h1>

          <p 
            className="text-lg leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Discover premium products at unbeatable prices. Fast delivery, easy
            returns, and exceptional quality.
          </p>

          <div className="flex gap-4 flex-wrap pt-2">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold tracking-wide transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0"
              style={{
                backgroundColor: "var(--primary)",
                color: "#ffffff"
              }}
            >
              Shop Now
              <TbShoppingCartSearch className="text-xl transition-transform group-hover:translate-x-0.5" />
            </Link>

            <a
              href="#CategorySec"
              className="group inline-flex items-center gap-2 border px-8 py-3.5 rounded-xl font-bold tracking-wide backdrop-blur-sm transition-all hover:bg-[var(--bg-hover)]"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-primary)"
              }}
            >
              View Categories
              <TbCategory2 className="text-xl transition-transform group-hover:rotate-12" style={{ color: "var(--primary)" }} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}