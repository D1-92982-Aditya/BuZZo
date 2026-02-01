import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchCity from '../SearchCity/SearchCity';
import './BusSearch.css';

const BusSearch = () => {

  const [busCount, setBusCount] = useState(0);
  const [ticketCount, setTicketCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [cityCount, setCityCount] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:8080/buses/count")
      .then(res => setBusCount(res.data.totalBuses))
      .catch(err => console.error("Bus count error", err));

    axios.get("http://localhost:8080/api/tickets/count")
      .then(res => setTicketCount(res.data))
      .catch(err => console.error("Ticket count error", err));

    axios.get("http://localhost:8080/users-count")
      .then(res => setUserCount(res.data.totalUsers))
      .catch(err => console.error("User count error", err));

    axios.get("http://localhost:8080/api/cities/connected/count")
      .then(res => setCityCount(res.data))
      .catch(err => console.error("City count error", err));
  }, []);

  return (
    <>
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
            {[...Array(5)].map((_, i) => (
              <div className="tree" key={i}>
                <div className="tree-trunk"></div>
                <div className="tree-leaves"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search City */}
      <SearchCity />

      {/* Bottom Animation & Stats */}
      <div className="bottom-animation">

        <div className="floating-buses">
          {Array.from({ length: 4 }).map((_, i) => (
            <div className="floating-bus" key={i}>🚌</div>
          ))}
        </div>

        <div className="particles">
          {Array.from({ length: 5 }).map((_, i) => (
            <div className="particle" key={i}></div>
          ))}
        </div>

        <div className="wave"></div>

        {/* Stats Cards */}
        <div className="stats-container">

          <div className="stat-card">
            <div className="stat-icon">🚌</div>
            <div className="stat-number">{busCount}</div>
            <div className="stat-label">Buses Available</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎫</div>
            <div className="stat-number">{ticketCount}</div>
            <div className="stat-label">Tickets Booked</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">😊</div>
            <div className="stat-number">{userCount}</div>
            <div className="stat-label">Happy Customers</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏙️</div>
            <div className="stat-number">{cityCount}</div>
            <div className="stat-label">Cities Connected</div>
          </div>

        </div>
      </div>
    </>
  );
};

export default BusSearch;
