import React from "react";

function BackgroundCircle({
  size = 400,
  color = "var(--primary)",
  opacity = 0.3,
  blur = 180,
  top,
  left,
  right,
  bottom,
  zIndex = 0,
  animate = false,
  className = "absolute",
}) {
  return (
    <div
      className={`${className} rounded-full pointer-events-none
        ${animate ? "animate-background-circle" : ""}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: color,
        opacity,
        filter: `blur(${blur}px)`,
        top, left, right, bottom, zIndex,
      }}
    />
  );
}

export default React.memo(BackgroundCircle);