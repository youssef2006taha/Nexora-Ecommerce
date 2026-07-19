import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLoader from "../../components/UI/DashboardLoader";
import MainCard from "../../components/UI/MainCard";
import StatsGrid from "./sections/StatsGrid";
import OrderStatusCard from "./sections/OrderStatus";
import TopProducts from "./sections/TopProducts";
import RecentOrders from "./sections/RecentOrders";

const DashboardPage = () => {
  
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/orders/admin/dashboard");

        console.log("Dashboard API Response:", response);

        setDashboard(
          response.data ||
          response.dashboard ||
          response
        );
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <DashboardLoader />;
  }

  if (!dashboard) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load dashboard data
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full min-h-screen">
      <MainCard
        badge="ADMIN OVERVIEW"
        title="Real-time commerce health"
        description="Monitor your storefront with AI-style clarity and live API metrics."
      />

      <StatsGrid dashboard={dashboard} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <OrderStatusCard dashboard={dashboard} />
        <TopProducts dashboard={dashboard} />
      </div>

      <RecentOrders dashboard={dashboard} />
    </div>
  );
};

export default React.memo(DashboardPage);