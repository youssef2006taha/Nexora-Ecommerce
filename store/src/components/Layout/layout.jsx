import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/header";
import Footer from "./footer";

const Layout = () => {
  return (
    <div className="bg-bg-main">
      <Header />
      <main className="mt-23 mb-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default React.memo(Layout);
