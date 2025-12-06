// src/layout/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "./Navbar";
import Chatbot from "../Chatbot/Chatbot";

const MainLayout = () => {
  return (
    <>
      <TopNav />
      <div className="container mt-4">
        <Outlet />
      </div>
      <Chatbot />
    </>
  );
};

export default MainLayout;
