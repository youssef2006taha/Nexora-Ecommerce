import React from "react";
import StatCard from "./StatCard";

import {
  ShoppingCart,
  Clock3,
  DollarSign,
  CalendarDays,
  Star,
  Users,
} from "lucide-react";

const formatCurrency = (value) => {
  const number = Number(value || 0);
  return `$${number.toLocaleString()}`;
};

function StatsGrid({ dashboard = {} }) {
  const orders = dashboard.orders || {};
  const revenue = dashboard.revenue || {};
  const topProducts = Array.isArray(dashboard.topProducts) ? dashboard.topProducts : [];
  const topProduct = topProducts[0] || {};

  return (
    <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Orders"
        value={Number(orders.total || 0)}
        subtitle="All orders received"
        color="emerald"
        icon={ShoppingCart}
      />

      <StatCard
        title="Pending Orders"
        value={Number(orders.pending || 0)}
        subtitle="Awaiting action"
        color="orange"
        icon={Clock3}
      />

      <StatCard
        title="Revenue"
        value={formatCurrency(revenue.total)}
        subtitle="Total gross revenue"
        color="pink"
        icon={DollarSign}
      />

      <StatCard
        title="This Month"
        value={formatCurrency(revenue.thisMonth)}
        subtitle="Monthly sales target"
        color="cyan"
        icon={CalendarDays}
      />

      <StatCard
        title="Top Product"
        value={topProduct.name || "No Product"}
        subtitle={`${Number(topProduct.totalSold || 0)} Sold`}
        color="violet"
        icon={Star}
      />

      <StatCard
        title="Users"
        value={Number(dashboard.totalCustomers || 0)}
        subtitle="Registered customers"
        color="slate"
        icon={Users}
      />
    </div>
  );
}

export default React.memo(StatsGrid);