import React, { useState, useEffect } from "react";
import { GiMoebiusStar } from "react-icons/gi";
import { TbCategory2, TbShoppingCartSearch } from "react-icons/tb";
import { Link } from "react-router-dom";
import BackgroundCircle from "../../../components/UI/BackgroundCircle";
import TeamMem from "./TeamMem";

import img1 from "../../../assets/img1.jpg";
import img2 from "../../../assets/img2.avif";
import img3 from "../../../assets/img3.jpg";

const HERO_BACKGROUNDS = [img1, img2, img3];

export default function Hero({ autoPlaySpeed = 4000 }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => {
        setPrevIdx(prev);
        return (prev + 1) % HERO_BACKGROUNDS.length;
      });
    }, autoPlaySpeed);

    return () => clearInterval(timer);
  }, [autoPlaySpeed]);

  return (
    <section 
      className="relative w-full overflow-hidden min-h-[85vh] pb-20 pt-40 transition-colors duration-300"
      style={{ backgroundColor: "var(--bg-main)" }}
    >
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40 dark:opacity-30">
        {HERO_BACKGROUNDS.map((bgUrl, index) => {
          const isCurrent = index === currentIdx;
          const isPrev = index === prevIdx;

          return (
            <div
              key={bgUrl}
              className={`
                absolute inset-0 
                bg-cover bg-center 
                transition-all duration-1000 ease-in-out will-change-transform
                ${isCurrent ? "opacity-100 scale-105" : isPrev ? "opacity-0 scale-100" : "opacity-0"}
              `}
              style={{ backgroundImage: `url(${bgUrl})` }}
            />
          );
        })}
      </div>

      <div 
        className="absolute inset-0 pointer-events-none z-10 
                  bg-gradient-to-r from-[var(--bg-main)] via-[var(--bg-main)]/70 to-transparent"
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
        <div className="w-full flex flex-col gap-y-6">
          <p 
            className="inline-flex items-center gap-2 w-fit text-sm font-semibold rounded-full px-4 py-1.5 backdrop-blur-md border shadow-sm"
            style={{
              backgroundColor: "var(--primary-light)",
              borderColor: "var(--border)",
              color: "var(--primary)"
            }}
          >
            <GiMoebiusStar className="text-lg animate-spin-slow" style={{ color: "var(--primary)" }} />
            <span>Premium Shopping Experience</span>
          </p>

          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight drop-shadow-md"
            style={{ color: "var(--text-primary)" }}
          >
            Shop the future,{" "}
            <span className="block mt-1" style={{ color: "var(--primary)" }}>
              delivered today
            </span>
          </h1>

          <p 
            className="text-base sm:text-lg leading-relaxed font-medium drop-shadow-md"
            style={{ color: "var(--text-secondary)" }}
          >
            Discover premium products at unbeatable prices. Fast delivery, easy
            returns, and exceptional quality.
          </p>

          <div className="flex gap-4 flex-wrap items-center pt-2">
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
              className="group inline-flex items-center gap-2 border px-8 py-3.5 rounded-xl font-bold tracking-wide backdrop-blur-md transition-all hover:bg-[var(--bg-hover)]"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg-surface)",
                color: "var(--text-primary)"
              }}
            >
              View Categories
              <TbCategory2 className="text-xl transition-transform group-hover:rotate-12" style={{ color: "var(--primary)" }} />
            </a>

            <TeamMem />
          </div>

        </div>
      </div>
    </section>
  );
}