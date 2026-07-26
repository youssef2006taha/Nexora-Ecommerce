import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Zap, Globe, MessageCircle, Heart } from "lucide-react";
import BackgroundCircle from "../UI/BackgroundCircle";

import img1 from "../../assets/img1.avif";
import img2 from "../../assets/img2.avif";
import img3 from "../../assets/img3.jpg";

const HERO_BACKGROUNDS = [img1, img2, img3];
const AUTO_PLAY_SPEED = 3000;
const linksList = [
  { id: 1, name: "Home", link: "/home" },
  { id: 2, name: "Shop", link: "/shop" },
  { id: 3, name: "My Orders", link: "/orders" },
  { id: 4, name: "Wishlist", link: "/wishlist" },
];

export default function LeftFooterHero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => {
        setPrevIdx(prev);
        return (prev + 1) % HERO_BACKGROUNDS.length;
      });
    }, AUTO_PLAY_SPEED);

    return () => clearInterval(timer);
  }, []);

  return (
    <footer
      className="relative left-1/2 -translate-x-1/2 w-full"
      style={{
        backgroundColor: "var(--bg-card)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="flex justify-between items-stretch">
        {/* Left Div */}
        <div
          className="relative overflow-hidden w-1/2 flex flex-col justify-center items-center px-8 py-12 text-center transition-colors duration-300"
          style={{ backgroundColor: "var(--bg-surface)" }}
        >
          <div className="absolute inset-0 pointer-events-none z-0 opacity-40 dark:opacity-30">
            {HERO_BACKGROUNDS.map((bgUrl, index) => {
              const isCurrent = index === currentIdx;
              const isPrev = index === prevIdx;

              return (
                <div
                  key={bgUrl}
                  className={`
                    absolute inset-0 bg-cover bg-center 
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
                      bg-gradient-to-t from-[var(--bg-main)] via-black/10 to-[var(--bg-main)] 
                      dark:from-[var(--bg-main)] dark:via-black/30 dark:to-[var(--bg-main)]"
          />

          <div className="absolute -top-20 -right-20 pointer-events-none z-10">
            <BackgroundCircle
              size={450}
              color="var(--Background-Circle-color-1)"
              blur={120}
              animate={false}
              className="relative"
              style={{ opacity: "var(--Background-Circle-opacity-1)" }}
            />
          </div>

          <div className="relative z-20 p-6 rounded-2xl backdrop-blur-md bg-white/40 dark:bg-black/30 border border-white/40 dark:border-white/10 shadow-md">
            <div
              className="flex justify-center items-center gap-2 text-2xl font-bold tracking-wide drop-shadow-sm"
              style={{ color: "var(--primary)" }}
            >
              <Zap size={24} className="animate-pulse" />
              <span>Koda Store</span>
              <Zap size={24} className="animate-pulse" />
            </div>

            <p
              className="mt-3 text-sm leading-relaxed font-semibold drop-shadow-sm"
              style={{ color: "var(--text-primary)" }}
            >
              Shop the future, delivered today. Premium products at the best
              prices with fast delivery across Egypt.
            </p>
          </div>
        </div>

        {/* Right Div */}
        <div className="pt-10 pb-6 w-1/2 flex flex-col items-center text-center justify-between">
          <div className="flex flex-col w-1/2 gap-8">
            <div>
              <h3
                className="font-semibold text-lg mb-2.5"
                style={{ color: "var(--text-primary)" }}
              >
                Quick Links
              </h3>

              <ul className="space-y-2">
                {linksList.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.link}
                      className="transition capitalize hover:opacity-80"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                className="font-semibold text-lg mb-5"
                style={{ color: "var(--text-primary)" }}
              >
                Follow Us
              </h3>

              <div className="flex justify-center gap-3">
                <button
                  className="w-10 h-10 cursor-pointer rounded-full flex items-center justify-center transition hover:scale-105"
                  style={{
                    background: "var(--bg-main)",
                    color: "var(--text-primary)",
                  }}
                >
                  <Globe size={18} />
                </button>

                <button
                  className="w-10 h-10 cursor-pointer rounded-full flex items-center justify-center transition hover:scale-105"
                  style={{
                    background: "var(--bg-main)",
                    color: "var(--text-primary)",
                  }}
                >
                  <MessageCircle size={18} />
                </button>

                <button
                  className="w-10 h-10 cursor-pointer rounded-full flex items-center justify-center transition hover:scale-105"
                  style={{
                    background: "var(--bg-main)",
                    color: "var(--text-primary)",
                  }}
                >
                  <Heart size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="w-full px-8">
            <hr
              className="my-6 w-full"
              style={{
                borderColor: "var(--border)",
              }}
            />

            <p
              className="text-center text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              © 2026 Koda Store. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}