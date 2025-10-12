// src/layout/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "./Navbar";

const MainLayout = () => {
  return (
    <>
      <TopNav />
      <div className="container mt-4">
        <Outlet /> {/* This renders child pages */}
      </div>
    </>
  );
};

export default MainLayout;
