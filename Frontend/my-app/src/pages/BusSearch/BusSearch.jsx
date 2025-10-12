import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BusSearch = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const cities = [
    'New York', 'Boston', 'Philadelphia', 'Washington DC', 'Baltimore',
    'Chicago', 'Los Angeles', 'San Francisco', 'Miami', 'Atlanta',
    'Seattle', 'Denver', 'Dallas', 'Houston', 'Phoenix'
  ];

  const buses = [
    { id: 1, name: 'QuickBus Express', type: 'AC Sleeper', time: '7:00 AM', duration: '4h 30m', price: 45, rating: 4.5, seats: 15 },
    { id: 2, name: 'Comfort Travels', type: 'AC Seater', time: '9:30 AM', duration: '5h 00m', price: 35, rating: 4.2, seats: 22 },
    { id: 3, name: 'Royal Coaches', type: 'AC Sleeper', time: '11:00 AM', duration: '4h 45m', price: 50, rating: 4.7, seats: 8 },
    { id: 4, name: 'Swift Express', type: 'Non-AC Seater', time: '2:00 PM', duration: '5h 30m', price: 25, rating: 3.9, seats: 30 },
    { id: 5, name: 'Premium Bus Service', type: 'AC Sleeper', time: '6:00 PM', duration: '4h 20m', price: 55, rating: 4.8, seats: 5 },
    { id: 6, name: 'City Link', type: 'AC Seater', time: '8:30 PM', duration: '5h 15m', price: 40, rating: 4.3, seats: 18 }
  ];

  const handleSearch = () => {
    navigate('/select-bus')
    if (fromCity && toCity && travelDate) {
      setSearchResults(buses);
      setHasSearched(true);
    }
  };

  const swapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <>
      <style>{`
        body {
          background: linear-gradient(135deg, #475569 0%, #64748b 50%, #475569 100%);
          min-height: 100vh;
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .top-navbar {
          background: #1e293b;
          border-bottom: 2px solid #334155;
          padding: 1rem 2rem;
        }

        .nav-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .nav-logo-icon {
          background: #334155;
          padding: 0.5rem;
          border-radius: 0.5rem;
          font-size: 1.5rem;
        }

        .nav-logo-text {
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 0.3s;
          cursor: pointer;
        }

        .nav-link:hover {
          color: white;
        }

        .nav-link.active {
          color: #3b82f6;
        }

        .animation-section {
          background: linear-gradient(180deg, #1e293b 0%, #334155 100%);
          padding: 3rem 2rem;
          position: relative;
          overflow: hidden;
          border-bottom: 2px solid #475569;
        }

        .road {
          width: 100%;
          height: 120px;
          background: #475569;
          position: relative;
          border-radius: 0 0 50% 50% / 0 0 20px 20px;
          box-shadow: inset 0 -10px 20px rgba(0,0,0,0.3);
        }

        .road-line {
          position: absolute;
          top: 50%;
          width: 100%;
          height: 4px;
          background: repeating-linear-gradient(
            to right,
            #fbbf24 0px,
            #fbbf24 40px,
            transparent 40px,
            transparent 80px
          );
          animation: roadMove 2s linear infinite;
        }

        @keyframes roadMove {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-80px);
          }
        }

        .bus-animation {
          position: absolute;
          top: 50%;
          left: -150px;
          transform: translateY(-50%);
          animation: busMove 8s linear infinite;
        }

        @keyframes busMove {
          0% {
            left: -150px;
          }
          100% {
            left: 100%;
          }
        }

        .animated-bus {
          width: 120px;
          height: 70px;
          background: white;
          border: 4px solid #1e293b;
          border-radius: 10px 10px 5px 5px;
          position: relative;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .bus-top {
          width: 80%;
          height: 30px;
          background: white;
          border: 4px solid #1e293b;
          border-radius: 8px 8px 0 0;
          position: absolute;
          top: -25px;
          left: 10%;
        }

        .bus-front {
          position: absolute;
          left: -8px;
          top: 15px;
          width: 8px;
          height: 40px;
          background: #fbbf24;
          border-radius: 3px 0 0 3px;
        }

        .bus-stripe {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 8px;
          background: #3b82f6;
          transform: translateY(-50%);
        }

        .bus-window {
          width: 18px;
          height: 18px;
          background: #60a5fa;
          border: 2px solid #1e293b;
          border-radius: 3px;
          position: absolute;
          top: 15px;
        }

        .window-1 { left: 15px; }
        .window-2 { left: 40px; }
        .window-3 { left: 65px; }
        .window-4 { left: 90px; }

        .bus-wheel {
          width: 20px;
          height: 20px;
          background: #1e293b;
          border-radius: 50%;
          position: absolute;
          bottom: -10px;
          border: 3px solid #64748b;
          animation: wheelRotate 0.5s linear infinite;
          box-shadow: 0 0 0 2px white;
        }

        @keyframes wheelRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .wheel-1 { left: 15px; }
        .wheel-2 { right: 15px; }

        .trees {
          position: absolute;
          bottom: 0;
          width: 100%;
          display: flex;
          gap: 150px;
          animation: treeMove 10s linear infinite;
        }

        @keyframes treeMove {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-300px);
          }
        }

        .tree {
          width: 40px;
          height: 60px;
          position: relative;
        }

        .tree-trunk {
          width: 10px;
          height: 25px;
          background: #64748b;
          position: absolute;
          bottom: 0;
          left: 15px;
        }

        .tree-leaves {
          width: 40px;
          height: 40px;
          background: #10b981;
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0.7;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .header {
          background: #1e293b;
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .search-box {
          background: #334155;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .search-title {
          color: white;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .search-form {
          display: grid;
          grid-template-columns: 1fr auto 1fr 1fr auto;
          gap: 1rem;
          align-items: end;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          color: #cbd5e1;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .form-input,
        .form-select {
          background: #475569;
          border: 2px solid #64748b;
          border-radius: 0.5rem;
          padding: 0.875rem 1rem;
          color: white;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s;
        }

        .form-input:focus,
        .form-select:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-select option {
          background: #475569;
          color: white;
        }

        .swap-btn {
          background: #3b82f6;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 1.25rem;
          margin-bottom: 0.25rem;
        }

        .swap-btn:hover {
          background: #2563eb;
          transform: rotate(180deg);
        }

        .search-btn {
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 0.5rem;
          padding: 0.875rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
        }

        .search-btn:hover {
          background: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(59, 130, 246, 0.4);
        }

        .search-btn:active {
          transform: translateY(0);
        }

        .results-section {
          background: #1e293b;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .results-header {
          color: white;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .route-info {
          color: #94a3b8;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }

        .bus-card {
          background: #334155;
          border-radius: 0.75rem;
          padding: 1.5rem;
          margin-bottom: 1rem;
          transition: all 0.3s;
          border: 2px solid transparent;
        }

        .bus-card:hover {
          border-color: #3b82f6;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }

        .bus-card-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr auto;
          gap: 1.5rem;
          align-items: center;
        }

        .bus-info h3 {
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .bus-type {
          color: #94a3b8;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .badge {
          background: #475569;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
        }

        .time-info {
          text-align: center;
        }

        .time {
          color: white;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .duration {
          color: #94a3b8;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }

        .rating-info {
          text-align: center;
        }

        .rating {
          color: #fbbf24;
          font-size: 1.25rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
        }

        .seats-available {
          color: #10b981;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }

        .price-info {
          text-align: center;
        }

        .price {
          color: white;
          font-size: 2rem;
          font-weight: bold;
        }

        .price-label {
          color: #94a3b8;
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }

        .select-btn {
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 0.5rem;
          padding: 0.75rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          white-space: nowrap;
        }

        .select-btn:hover {
          background: #2563eb;
        }

        .no-results {
          text-align: center;
          color: #94a3b8;
          padding: 3rem;
          font-size: 1.125rem;
        }

        @media (max-width: 1024px) {
          .search-form {
            grid-template-columns: 1fr;
          }

          .swap-btn {
            margin: 0 auto;
          }

          .bus-card-content {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .time-info,
          .rating-info,
          .price-info {
            text-align: left;
          }

          .nav-links {
            gap: 1rem;
          }

          .nav-link {
            font-size: 0.85rem;
          }
        }

        .bottom-animation {
          background: linear-gradient(180deg, #334155 0%, #1e293b 100%);
          padding: 4rem 2rem;
          position: relative;
          overflow: hidden;
          margin-top: 2rem;
          border-top: 2px solid #475569;
        }

        .stats-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          position: relative;
          z-index: 2;
        }

        .stat-card {
          background: rgba(51, 65, 85, 0.8);
          padding: 2rem;
          border-radius: 1rem;
          text-align: center;
          border: 2px solid #475569;
          backdrop-filter: blur(10px);
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }

        .stat-card:nth-child(1) { animation-delay: 0.1s; }
        .stat-card:nth-child(2) { animation-delay: 0.2s; }
        .stat-card:nth-child(3) { animation-delay: 0.3s; }
        .stat-card:nth-child(4) { animation-delay: 0.4s; }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stat-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .stat-number {
          color: #3b82f6;
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          animation: countUp 2s ease-out;
        }

        @keyframes countUp {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .stat-label {
          color: #cbd5e1;
          font-size: 1rem;
          font-weight: 500;
        }

        .floating-buses {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .floating-bus {
          position: absolute;
          font-size: 2rem;
          animation: float 15s ease-in-out infinite;
          opacity: 0.15;
        }

        .floating-bus:nth-child(1) {
          top: 10%;
          left: 5%;
          animation-delay: 0s;
        }

        .floating-bus:nth-child(2) {
          top: 60%;
          left: 80%;
          animation-delay: 3s;
        }

        .floating-bus:nth-child(3) {
          top: 30%;
          left: 70%;
          animation-delay: 6s;
        }

        .floating-bus:nth-child(4) {
          top: 70%;
          left: 15%;
          animation-delay: 9s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(5deg);
          }
          50% {
            transform: translateY(-40px) rotate(-5deg);
          }
          75% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        .wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100px;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100" preserveAspectRatio="none"><path d="M0,50 Q300,0 600,50 T1200,50 L1200,100 L0,100 Z" fill="%23475569" opacity="0.3"/></svg>');
          background-size: 1200px 100px;
          animation: waveMove 10s linear infinite;
        }

        @keyframes waveMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 1200px 0;
          }
        }

        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #3b82f6;
          border-radius: 50%;
          animation: particleMove 8s linear infinite;
          opacity: 0.6;
        }

        .particle:nth-child(1) {
          left: 10%;
          animation-delay: 0s;
          animation-duration: 6s;
        }

        .particle:nth-child(2) {
          left: 30%;
          animation-delay: 2s;
          animation-duration: 8s;
        }

        .particle:nth-child(3) {
          left: 50%;
          animation-delay: 4s;
          animation-duration: 7s;
        }

        .particle:nth-child(4) {
          left: 70%;
          animation-delay: 1s;
          animation-duration: 9s;
        }

        .particle:nth-child(5) {
          left: 90%;
          animation-delay: 3s;
          animation-duration: 6.5s;
        }

        @keyframes particleMove {
          0% {
            bottom: 0;
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            bottom: 100%;
            opacity: 0;
          }
        }

        @media (max-width: 1024px) {
          .stats-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .stats-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

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

      <div className="container">
        {/* Search Section */}
        <div className="header">
          <div className="search-box">
            <h2 className="search-title">Search Buses</h2>
            <div className="search-form">
              <div className="form-group">
                <label className="form-label">From</label>
                <select 
                  className="form-select"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                >
                  <option value="">Select city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <button className="swap-btn" onClick={swapCities} title="Swap cities">
                ⇄
              </button>

              <div className="form-group">
                <label className="form-label">To</label>
                <select 
                  className="form-select"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                >
                  <option value="">Select city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Date of Journey</label>
                <input 
                  type="date"
                  className="form-input"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  min={getTodayDate()}
                />
              </div>

              <button className="search-btn" onClick={handleSearch}>
                🔍 Search Buses
              </button>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div className="results-section">
            <h2 className="results-header">Available Buses</h2>
            <div className="route-info">
              {fromCity} → {toCity} | {travelDate} | {searchResults.length} buses found
            </div>

            {searchResults.length > 0 ? (
              searchResults.map(bus => (
                <div key={bus.id} className="bus-card">
                  <div className="bus-card-content">
                    <div className="bus-info">
                      <h3>{bus.name}</h3>
                      <div className="bus-type">
                        <span className="badge">{bus.type}</span>
                      </div>
                    </div>

                    <div className="time-info">
                      <div className="time">{bus.time}</div>
                      <div className="duration">⏱️ {bus.duration}</div>
                    </div>

                    <div className="rating-info">
                      <div className="rating">
                        ⭐ {bus.rating}
                      </div>
                      <div className="seats-available">
                        {bus.seats} seats available
                      </div>
                    </div>

                    <div className="price-info">
                      <div className="price">${bus.price}</div>
                      <div className="price-label">per seat</div>
                    </div>

                    <button className="select-btn">
                      View Seats
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                No buses found for the selected route and date. Please try different options.
              </div>
            )}
          </div>
        )}
      </div>

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
            <div className="stat-number">500+</div>
            <div className="stat-label">Buses Available</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎫</div>
            <div className="stat-number">50K+</div>
            <div className="stat-label">Tickets Booked</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">😊</div>
            <div className="stat-number">45K+</div>
            <div className="stat-label">Happy Customers</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏙️</div>
            <div className="stat-number">100+</div>
            <div className="stat-label">Cities Connected</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BusSearch;