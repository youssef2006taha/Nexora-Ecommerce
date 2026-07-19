import React from "react";
import {
  Package,
  Star,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import SmallCard from "../../../components/UI/SmallCard";

function ProductStats({
  totalProducts,
  featuredProducts,
  inStockProducts,
  outOfStockProducts,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

      <SmallCard
        title="Total Products"
        value={totalProducts}
        icon={<Package className="w-7 h-7" />}
        iconBg="bg-cyan-500/10"
        iconColor="text-cyan-400"
      />

      <SmallCard
        title="Featured Products"
        value={featuredProducts}
        icon={<Star className="w-7 h-7 fill-current" />}
        iconBg="bg-amber-500/10"
        iconColor="text-amber-400"
      />

      <SmallCard
        title="In Stock"
        value={inStockProducts}
        icon={<CheckCircle2 className="w-7 h-7" />}
        iconBg="bg-emerald-500/10"
        iconColor="text-emerald-400"
      />

      <SmallCard
        title="Out Of Stock"
        value={outOfStockProducts}
        icon={<XCircle className="w-7 h-7" />}
        iconBg="bg-rose-500/10"
        iconColor="text-rose-400"
      />

    </div>
  );
}

export default React.memo(ProductStats);