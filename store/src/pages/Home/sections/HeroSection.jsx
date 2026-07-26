import React, { useState, useEffect } from "react";
import { GiMoebiusStar } from "react-icons/gi";
import { TbCategory2, TbShoppingCartSearch } from "react-icons/tb";
import { Link } from "react-router-dom";
import BackgroundCircle from "../../../components/UI/BackgroundCircle";

import img1 from "../../../assets/img1.avif";
import img2 from "../../../assets/img2.avif";
import img3 from "../../../assets/img3.jpg";
import Youssef_Taha from "../../../assets/TeamImages/Youssef_Taha.png";


const HERO_BACKGROUNDS = [img1, img2, img3];

const teamMem = [{
    id: 1,
    image : Youssef_Taha,
    name : "Youssef Taha",
    linkedIn : "#",
    gitHup : "#"
  },
  {
    id: 2,
    image : img2,
    name : "Youssef Taha",
    linkedIn : "",
    gitHup : ""
  },
  {
    id: 3,
    image : img1,
    name : "Youssef Taha",
    linkedIn : "",
    gitHup : ""
  },
  {
    id: 4,
    image : img2,
    name : "Youssef Taha",
    linkedIn : "",
    gitHup : ""
  },
  {
    id: 5,
    image : img1,
    name : "Youssef Taha",
    linkedIn : "",
    gitHup : ""
  },
  {
    id: 6,
    image : img2,
    name : "Youssef Taha",
    linkedIn : "",
    gitHup : ""
  }
]

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
      className="relative w-full overflow-hidden flex items-center min-h-[85vh] py-20 transition-colors duration-300"
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

      <div className="container-noT relative z-30 w-full flex">
        <div className="w-full lg:w-[40rem] flex flex-col gap-y-6">
          
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
          </div>
        </div>

        <div className="flex flex-1 gap-2 justify-center items-end">
          {teamMem.map((mem) => {
            return (
              <div
                key={mem.id || mem.name}
                className="group relative w-2 h-2 rounded-full bg-secondary hover:bg-primary hover:scale-125 transition-all duration-200 cursor-pointer"
              >
                <div className="pointer-events-none group-hover:pointer-events-auto absolute bottom-full left-1/2 -translate-x-1/2 pb-2 w-65 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 z-50">
                  <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-xl bg-cover bg-center">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${mem.image})`,
                      }}
                    >
                      <div className="absolute inset-x-0 bottom-0 pt-4 pb-3 px-3 text-center bg-black/30 backdrop-blur-md">
                        <p className="text-white font-bold text-sm mb-1">
                          {mem.name}
                        </p>
                        <div className="flex justify-center gap-3 text-xs">
                          <a
                            href={mem.linkedIn}
                            className="text-white/90 hover:text-white hover:underline font-medium"
                          >
                            LinkedIn
                          </a>
                          <a
                            href={mem.gitHub}
                            className="text-white/90 hover:text-white hover:underline font-medium"
                          >
                            GitHub
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-0 h-0 mx-auto border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-black/30" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}