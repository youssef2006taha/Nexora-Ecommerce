import React from "react";
import { ShoppingBag, Dumbbell, Cpu } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Fashion",
    count: 4,
    icon: ShoppingBag,
  },
  {
    id: 2,
    name: "Sports",
    count: 1,
    icon: Dumbbell,
  },
  {
    id: 3,
    name: "Electronics",
    count: 1,
    icon: Cpu,
  },
];

function CategoryCard({ category }) {
  const Icon = category.icon;
  return (
    <div
      className="
        group cursor-pointer
        bg-slate-800/40 hover:bg-slate-800/70
        border border-slate-700/50 hover:border-indigo-500/60
        rounded-2xl
        px-6 py-8
        flex flex-col items-center justify-center
        text-center
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-lg hover:shadow-indigo-500/10
      "
    >
      <div
        className="
          w-14 h-14 sm:w-16 sm:h-16
          rounded-xl
          bg-indigo-500/10 group-hover:bg-indigo-500/20
          flex items-center justify-center
          mb-4
          transition-colors duration-300
        "
      >
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-400" strokeWidth={2} />
      </div>

      <h3 className="text-white font-semibold text-base sm:text-lg mb-1">
        {category.name}
      </h3>

      <p className="text-slate-400 text-sm">
        {category.count} {category.count === 1 ? "product" : "products"}
      </p>
    </div>
  );
}

export default function ShopByCategory() {
  return (
    <section className="bg-slate-950 py-14 sm:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Shop by Category
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Browse our wide range of categories
          </p>
        </div>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            gap-4 sm:gap-6
          "
        >
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
