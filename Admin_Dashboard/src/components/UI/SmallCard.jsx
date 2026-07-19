import React from "react";

function SmallCard({
  title,
  value,
  icon,
  iconBg = "bg-primary-light",
  iconColor = "text-primary",
  valueColor = "text-text-primary",
  titleColor = "text-text-muted",
  children,
  className = "",
}) {
  return (
    <div
      className={`
        group
        relative overflow-hidden
        bg-bg-card
        border border-border
        rounded-[var(--radius-md-value)]
        p-[var(--card-padding)]
        transition-all duration-300 ease-out
        hover:-translate-y-2
        hover:border-primary/30
        ${className} `}
      style={{ boxShadow: "var(--shadow-xs-value)" }}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-primary-light via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex justify-between items-start gap-4">
        
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${titleColor}`}>
            {title}
          </p>

          <h2 className={`text-3xl font-bold mt-2 tracking-tight ${valueColor}`}>
            {value}
          </h2>

          {children && (
            <div className="mt-3">
              {children}
            </div>
          )}
        </div>    

        {icon && (
          <div className={`w-14 h-14 rounded-[var(--radius-md-value)] flex items-center justify-center shrink-0 transition-all duration-300 ease-out hover:scale-110 hover:rotate-6
              ${iconBg}
              ${iconColor} `} >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(SmallCard);