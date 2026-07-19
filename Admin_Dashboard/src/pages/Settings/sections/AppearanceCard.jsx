import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const AppearanceCard = ({ theme, onToggleTheme }) => {
  return (
    <div
      className="bg-bg-card/80 backdrop-blur-md rounded-[24px] p-6 border-t-4 border-primary shadow-xs w-full"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <h3 className="text-[12px] font-bold text-text-muted tracking-wide mb-4">
        APPEARANCE
      </h3>

      <p className="text-sm text-text-secondary mb-5">
        Choose how the dashboard looks on this device.
      </p>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => theme !== "light" && onToggleTheme()}
          className={`flex flex-col items-center gap-2 py-4 rounded-[14px] border-2 transition-all ${
            theme === "light"
              ? "border-primary bg-primary/5 text-primary"
              : "border-border text-text-muted hover:border-border/80"
          }`}
        >
          <FiSun size={20} />
          <span className="text-xs font-semibold">Light</span>
        </button>

        <button
          onClick={() => theme !== "dark" && onToggleTheme()}
          className={`flex flex-col items-center gap-2 py-4 rounded-[14px] border-2 transition-all ${
            theme === "dark"
              ? "border-primary bg-primary/5 text-primary"
              : "border-border text-text-muted hover:border-border/80"
          }`}
        >
          <FiMoon size={20} />
          <span className="text-xs font-semibold">Dark</span>
        </button>
      </div>
    </div>
  );
};

export default React.memo(AppearanceCard);