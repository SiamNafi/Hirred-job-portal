import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen px-20">
        <Header />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
