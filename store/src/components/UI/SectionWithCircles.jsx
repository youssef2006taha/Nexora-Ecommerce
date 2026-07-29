import React from "react";
import BackgroundCircle from "./BackgroundCircle";

export default function SectionWithCircles({ children, className = "" }) {
  return (
    <section className={`relative overflow-hidden w-full bg-bg-main ${className}`}>
      
      <BackgroundCircle
        size={450}
        color="var(--Background-Circle-color-1)"
        opacity="var(--Background-Circle-opacity-1)"
        blur={140}
        top="-10%"
        left="-5%"
      />

      <BackgroundCircle
        size={350}
        color="var(--Background-Circle-color-2)"
        opacity="var(--Background-Circle-opacity-2)"
        blur={130}
        top="35%"
        right="-5%"
      />

      <BackgroundCircle
        size={400}
        color="var(--Background-Circle-color-3)"
        opacity="var(--Background-Circle-opacity-3)"
        blur={150}
        bottom="-10%"
        left="15%"
      />

      <div className="relative z-10 w-full">
        {children}
      </div>
    </section>
  );
}