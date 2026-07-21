import React, { useState, useEffect } from "react";
import BackgroundCircle from "./BackgroundCircle";
import img1 from "../../assets/img1.avif"
import img2 from "../../assets/img2.avif"
import img3 from "../../assets/img3.jpg"

const HERO_BACKGROUNDS = [
  img1,
  img2,
  img3,
];

function MainCard({
  badge,
  title,
  description,
  children,
  className = "",
  autoPlaySpeed = 3000,
}) {
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
    <div
      className={`
        relative
        overflow-hidden
        w-full
        bg-bg-card 
        border border-border 
        p-6 md:p-8
        rounded-[var(--radius-xl-value)] 
        transition-all duration-300
        ${className}
      `}
      style={{ boxShadow: "var(--shadow-xs-value)" }}
    >
      
      <div className="absolute top-[-50px] right-[-50px] pointer-events-none z-0 opacity-50 dark:opacity-60">
        <BackgroundCircle
          size={260}
          color="var(--primary)"
          blur={80}
          animate={false}
          className="relative"
        />
      </div>

      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.35] dark:opacity-15 mix-blend-normal dark:mix-blend-overlay">
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

      <div className="absolute inset-0 bg-gradient-to-r from-bg-card via-bg-card/75 dark:via-bg-card/70 to-bg-card/20 dark:to-transparent pointer-events-none z-20" />

      <div className="relative z-30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          {badge && (
            <p className="uppercase tracking-widest text-[11px] font-bold text-primary">
              {badge}
            </p>
          )}

          {title && (
            <h1 className="text-[24px] md:text-[26px] font-bold tracking-tight mt-1 text-text-primary">
              {title}
            </h1>
          )}

          {description && (
            <p className="mt-1.5 text-[13px] leading-relaxed text-text-muted">
              {description}
            </p>
          )}
        </div>

        {children && (
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {children}
          </div>
        )}
      </div>

    </div>
  );
}

export default React.memo(MainCard);