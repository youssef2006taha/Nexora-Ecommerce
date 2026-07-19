const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="flex justify-between items-center rounded-3xl p-6 border border-border bg-bg-card shadow hover:shadow-sm hover:bg-bg-hover hover:-translate-y-1 transition duration-200 will-change-transform">
      <div className="flex flex-col gap-2">
        <h3 className="capitalize font-bold text-sm text-secondary/80 dark:text-secondary">{title}</h3>

        <p className="text-3xl font-bold text-text-primary/90">{value}</p>
      </div>

      <div className="flex items-center justify-center w-12 h-12 text-white/85 rounded-2xl bg-primary/75 hover:rotate-12 transition duration-250 shadow-[0_1px_4px] shadow-secondary/80 will-change-transform">
        {icon}
      </div>
    </div>
  );
};

export default StatsCard;
