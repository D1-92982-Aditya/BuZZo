import React, { useState } from "react";
import './Help.css';
import {
  FaBook,
  FaCreditCard,
  FaUser,
  FaBus,
  FaTicketAlt,
  FaLuggageCart,
  FaWheelchair,
  FaComments,
  FaSearch,
  FaFileAlt,
} from "react-icons/fa";

export default function Help() {
  // Sidebar navigation topics
  const sidebarTopics = [
    { title: "Booking & Cancellations", icon: <FaBook /> },
    { title: "Payments & Refunds", icon: <FaCreditCard /> },
    { title: "Account Management", icon: <FaUser /> },
    { title: "Routes & Timings", icon: <FaBus /> },
    { title: "Ticket & Boarding", icon: <FaTicketAlt /> },
    { title: "Luggage Policy", icon: <FaLuggageCart /> },
    { title: "Accessibility", icon: <FaWheelchair /> },
    { title: "Support & Feedback", icon: <FaComments /> },
  ];

  // Featured content cards
  const cards = [
    { title: "How to Book a Ticket", icon: <FaBook /> },
    { title: "Cancel or Reschedule", icon: <FaTicketAlt /> },
    { title: "Payment Troubleshooting", icon: <FaCreditCard /> },
    { title: "Popular Routes", icon: <FaBus /> },
    { title: "Seat Selection Guide", icon: <FaUser /> },
    { title: "Boarding Instructions", icon: <FaTicketAlt /> },
    { title: "Luggage Rules", icon: <FaLuggageCart /> },
    { title: "Accessibility Services", icon: <FaWheelchair /> },
    { title: "Ticket Related", icon: <FaFileAlt /> },
   
  ];

  const [search, setSearch] = useState("");

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="help-page">
      {/* Sidebar */}
      <div className="sidebar">
        {sidebarTopics.map((topic, idx) => (
          <div key={idx} className="sidebar-item">
            <div className="sidebar-icon">{topic.icon}</div>
            <div className="sidebar-title">{topic.title}</div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="content">
        {/* Header */}
        <div className="help-header">
          <div className="help-title">How can we help?</div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </div>
        </div>

        {/* Cards */}
        <div className="cards-grid">
          {filteredCards.map((card, idx) => (
            <div key={idx} className="card">
              <div className="card-icon">{card.icon}</div>
              <div className="card-title">{card.title}</div>
            </div>
          ))}
        </div>
       {/* Support Buttons */}
       <div className={`support-buttons ${search ? "sticky" : ""}`}>
         <button className="chat-btn">Chat with Support</button>
        <button className="request-btn">Submit a Request</button>
       </div>
      </div>
    </div>
  );
}
