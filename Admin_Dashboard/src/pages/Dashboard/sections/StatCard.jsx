import React from "react";
import BackgroundCircle from "../../../components/UI/BackgroundCircle";

const getColorClasses = (colorName) => {
  const map = {
    emerald: {
      border: "border-emerald-500",
      iconBg: "from-emerald-400 to-teal-500",
      glowColor: "#10b981",
    },
    orange: {
      border: "border-orange-500",
      iconBg: "from-orange-400 to-amber-500",
      glowColor: "#f97316",
    },
    pink: {
      border: "border-rose-500",
      iconBg: "from-rose-400 to-pink-500",
      glowColor: "#f43f5e",
    },
    cyan: {
      border: "border-cyan-500",
      iconBg: "from-cyan-400 to-sky-500",
      glowColor: "#06b6d4",
    },
    violet: {
      border: "border-purple-500",
      iconBg: "from-violet-400 to-purple-500",
      glowColor: "#8b5cf6",
    },
    slate: {
      border: "border-slate-600",
      iconBg: "from-slate-500 to-slate-700",
      glowColor: "#475569",
    },
    blue: {
      border: "border-blue-500",
      iconBg: "from-blue-400 to-indigo-500",
      glowColor: "#3b82f6",
    },
  };

  return map[colorName] || map.emerald;
};

function StatCard({
  title,
  value,
  subtitle,
  color = "emerald",
  icon: Icon,
}) {
  const colors = getColorClasses(color);

  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        bg-bg-card/50
        backdrop-blur-md 
        rounded-[var(--radius-xl-value)]
        p-[var(--card-padding)]
        border-t-4 ${colors.border}
        transition-all duration-300
        hover:-translate-y-1
        w-full
      `}
      style={{
        boxShadow: "var(--shadow-sm-value)",
      }}
    >
      <div className="absolute top-[-40px] right-[-40px] transition-all duration-500 ease-out scale-100 opacity-30 group-hover:scale-135 group-hover:opacity-60 pointer-events-none z-0">
        <BackgroundCircle
          size={140}
          color={colors.glowColor}
          blur={50}
          animate={false}
          className="relative"
        />
      </div>

      <div className="relative z-10 flex justify-between items-start">
        <h3 className="text-[14px] font-bold text-text-muted tracking-wide">
          {title}
        </h3>

        <div
          className={`
            w-14 h-14
            rounded-[16px]

            bg-gradient-to-br
            ${colors.iconBg}

            flex items-center justify-center

            transition-all duration-300 ease-out

            hover:scale-110
            hover:rotate-6
            hover:shadow-[0_10px_20px_rgba(0,0,0,0.18)]

            cursor-pointer
          `}
        >
          {Icon && (
            <Icon
              size={29}
              strokeWidth={2.2}
              className="text-white"
            />
          )}
        </div>
      </div>

      <div className="relative z-10">
        <h2 className="text-[28px] font-extrabold tracking-tight text-text-primary leading-tight mt-4">
          {value}
        </h2>

        <p className="text-[11px] font-medium mt-1 text-text-muted">
          {subtitle}
        </p>

        <div className="mt-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--divider)] to-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(StatCard);