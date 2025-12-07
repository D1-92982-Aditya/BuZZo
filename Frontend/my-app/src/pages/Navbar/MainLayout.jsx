// src/layout/MainLayout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopNav from "./Navbar";
import Chatbot from "../Chatbot/Chatbot";

const MainLayout = () => {
  const location = useLocation();
  const hideChatbotPages = ["/payment"];
  const showChatbot = !hideChatbotPages.includes(location.pathname);

  return (
    <>
      <TopNav />
      <div className="container mt-4">
        <Outlet />
      </div>
      {showChatbot && <Chatbot />}
    </>
  );
};

export default MainLayout;
