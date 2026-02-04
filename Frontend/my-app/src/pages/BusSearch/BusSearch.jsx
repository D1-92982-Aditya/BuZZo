import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchCity from '../SearchCity/SearchCity';
import './BusSearch.css';

const BusSearch = () => {
  return (
    <>
      {/* Top Navigation Bar */}
    

      {/* Animated Bus Section */}
      <div className="animation-section">
        <div className="road">
          <div className="road-line"></div>
          
          <div className="bus-animation">
            <div className="animated-bus">
              <div className="bus-top"></div>
              <div className="bus-front"></div>
              <div className="bus-stripe"></div>
              <div className="bus-window window-1"></div>
              <div className="bus-window window-2"></div>
              <div className="bus-window window-3"></div>
              <div className="bus-window window-4"></div>
              <div className="bus-wheel wheel-1"></div>
              <div className="bus-wheel wheel-2"></div>
            </div>
          </div>

          <div className="trees">
            <div className="tree">
              <div className="tree-trunk"></div>
              <div className="tree-leaves"></div>
            </div>
            <div className="tree">
              <div className="tree-trunk"></div>
              <div className="tree-leaves"></div>
            </div>
            <div className="tree">
              <div className="tree-trunk"></div>
              <div className="tree-leaves"></div>
            </div>
            <div className="tree">
              <div className="tree-trunk"></div>
              <div className="tree-leaves"></div>
            </div>
            <div className="tree">
              <div className="tree-trunk"></div>
              <div className="tree-leaves"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Search City Component */}
           <SearchCity />

      {/* Bottom Animation Section */}
      <div className="bottom-animation">
        {/* Floating Buses */}
        <div className="floating-buses">
          <div className="floating-bus">🚌</div>
          <div className="floating-bus">🚌</div>
          <div className="floating-bus">🚌</div>
          <div className="floating-bus">🚌</div>
        </div>

        {/* Particles */}
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        {/* Wave */}
        <div className="wave"></div>

        {/* Stats Cards */}
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">🚌</div>
            <div className="stat-number">20+</div>
            <div className="stat-label">Buses Available</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎫</div>
            <div className="stat-number">100+</div>
            <div className="stat-label">Tickets Booked</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">😊</div>
            <div className="stat-number">100+</div>
            <div className="stat-label">Happy Customers</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏙️</div>
            <div className="stat-number">200+</div>
            <div className="stat-label">Cities Connected</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BusSearch;