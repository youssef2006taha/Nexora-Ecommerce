import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/header";
import Footer from "./footer";

const Layout = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <Header />
      <main style={{ padding: "16px" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default React.memo(Layout);
