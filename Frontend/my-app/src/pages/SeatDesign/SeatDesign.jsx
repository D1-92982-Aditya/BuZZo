import React, { useState } from 'react';

export default function BusSeatSelector() {
  const [selectedSeats, setSelectedSeats] = useState(['2A', '2B']);
  const bookedSeats = ['2E', '4D', '4F'];
  const seatPrice = 10.00;
  const taxes = 30.00;

  const toggleSeat = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;
    
    setSelectedSeats(prev => 
      prev.includes(seatNumber)
        ? prev.filter(s => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const subtotal = selectedSeats.length * seatPrice;
  const total = subtotal + taxes;

  const getSeatClass = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return 'seat booked';
    if (selectedSeats.includes(seatNumber)) return 'seat selected';
    return 'seat available';
  };

  const Seat = ({ number }) => (
    <div
      className={getSeatClass(number)}
      data-seat={number}
      onClick={() => toggleSeat(number)}
    >
      <span className="seat-number">{number}</span>
    </div>
  );

  const EmptySeat = () => <div className="seat empty" />;

  return (
    <>
      <style>{`
        body {
          background: linear-gradient(135deg, #475569 0%, #64748b 50%, #475569 100%);
          min-height: 100vh;
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          margin: 0;
        }

        .main-container {
          background: #1e293b;
          border-radius: 1rem;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          overflow: hidden;
          max-width: 1400px;
          margin: 0 auto;
        }

        .header {
          background: #1e293b;
          border-bottom: 1px solid #334155;
          padding: 1.5rem;
        }

        .logo {
          background: #334155;
          padding: 0.5rem;
          border-radius: 0.5rem;
          color: white;
          font-size: 1.5rem;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-name {
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
          margin-left: 0.5rem;
        }

        .route-info {
          background: #334155;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .route-badge {
          background: #3b82f6;
          border-radius: 50%;
          padding: 0.25rem;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
        }

        .nav-link {
          color: #94a3b8;
          text-decoration: none;
          padding: 0.5rem 1rem;
          transition: color 0.3s;
          cursor: pointer;
        }

        .nav-link:hover {
          color: white;
        }

        .btn-modify {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
        }

        .btn-modify:hover {
          background: #2563eb;
        }

        .content-area {
          background: #334155;
          border-radius: 1rem;
          padding: 1.5rem;
          margin-bottom: 1rem;
        }

        .bus-title {
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .bus-subtitle {
          color: #cbd5e1;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .bus-details {
          color: #64748b;
          font-size: 0.75rem;
        }

        .bus-layout {
          background: #475569;
          border-radius: 1rem;
          padding: 2rem;
          position: relative;
          margin-top: 1.5rem;
        }

        .driver-cabin {
          position: absolute;
          left: 2rem;
          top: 2rem;
          width: 60px;
          height: 80px;
          background: #64748b;
          border: 2px solid #94a3b8;
          border-radius: 0.5rem;
        }

        .deck-container {
          margin-left: 6rem;
        }

        .seat-row {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .seat {
          width: 48px;
          height: 80px;
          border-radius: 0.75rem;
          border: 3px solid;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 600;
          color: #1e293b;
          position: relative;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        }

        .seat::before {
          content: '';
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 20px;
          background: rgba(0,0,0,0.1);
          border-radius: 0.5rem 0.5rem 0 0;
        }

        .seat::after {
          content: '';
          position: absolute;
          bottom: 8px;
          left: 8px;
          right: 8px;
          height: 40px;
          background: rgba(255,255,255,0.15);
          border-radius: 0.25rem;
          border: 1px solid rgba(0,0,0,0.1);
        }

        .seat.available {
          background: #5eead4;
          border-color: #2dd4bf;
        }

        .seat.available:hover {
          opacity: 0.8;
          transform: scale(1.05);
        }

        .seat.selected {
          background: #60a5fa;
          border-color: #93c5fd;
        }

        .seat.booked {
          background: #3b82f6;
          border-color: #3b82f6;
          cursor: not-allowed;
        }

        .seat .seat-number {
          position: relative;
          z-index: 1;
          background: rgba(255,255,255,0.9);
          padding: 2px 6px;
          border-radius: 0.25rem;
          font-size: 0.65rem;
        }

        .seat.empty {
          width: 48px;
          height: 80px;
          background: transparent;
          border: none;
          cursor: default;
        }

        .seat.empty::before,
        .seat.empty::after {
          display: none;
        }

        .legend {
          display: flex;
          gap: 2rem;
          justify-content: center;
          margin-top: 2rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #cbd5e1;
          font-size: 0.875rem;
        }

        .legend-box {
          width: 16px;
          height: 16px;
          border-radius: 0.25rem;
          border: 2px solid;
        }

        .legend-available {
          background: #5eead4;
          border-color: #2dd4bf;
        }

        .legend-booked {
          background: #3b82f6;
          border-color: #3b82f6;
        }

        .summary-card {
          background: #334155;
          border-radius: 1rem;
          padding: 1.5rem;
          height: fit-content;
          position: sticky;
          top: 1rem;
        }

        .summary-title {
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .price-display {
          color: white;
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
        }

        .summary-section {
          padding-bottom: 1.5rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #475569;
        }

        .selected-seats {
          color: #cbd5e1;
          margin-bottom: 1rem;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          color: #cbd5e1;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .price-total {
          display: flex;
          justify-content: space-between;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          padding-top: 0.5rem;
        }

        .section-title {
          color: white;
          font-weight: 500;
          margin-bottom: 1rem;
        }

        .location-box {
          background: #475569;
          border-radius: 0.5rem;
          padding: 0.75rem;
          margin-bottom: 1rem;
        }

        .location-text {
          color: white;
          font-size: 0.875rem;
          margin: 0;
        }

        .checkbox-label {
          color: #cbd5e1;
          font-size: 0.875rem;
          margin-left: 0.5rem;
        }

        .btn-payment {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-weight: 500;
          width: 100%;
          transition: background 0.3s;
          cursor: pointer;
        }

        .btn-payment:hover {
          background: #2563eb;
        }

        .sort-section {
          color: #94a3b8;
          margin-bottom: 1.5rem;
        }

        .sort-section .active {
          color: white;
          font-weight: 500;
        }

        .d-flex {
          display: flex;
        }

        .align-items-center {
          align-items: center;
        }

        .justify-content-between {
          justify-content: space-between;
        }

        .justify-content-center {
          justify-content: center;
        }

        .gap-2 {
          gap: 0.5rem;
        }

        .gap-3 {
          gap: 1rem;
        }

        .mb-3 {
          margin-bottom: 1rem;
        }

        .mb-4 {
          margin-bottom: 1.5rem;
        }

        .me-2 {
          margin-right: 0.5rem;
        }

        .me-3 {
          margin-right: 1rem;
        }

        .p-4 {
          padding: 1.5rem;
        }

        .row {
          display: flex;
          gap: 2rem;
        }

        .col-left {
          flex: 2;
        }

        .col-right {
          flex: 1;
        }

        @media (max-width: 992px) {
          .row {
            flex-direction: column;
          }
        }

        input[type="checkbox"] {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .icon {
          display: inline-block;
        }
      `}</style>

      <div className="main-container">
        {/* Header */}
        <div className="header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              {/* Logo */}
              <div className="d-flex align-items-center">
                <div className="logo">🚌</div>
                <span className="brand-name">Buzzo</span>
              </div>
              
              {/* Route Info */}
              <div className="route-info">
                <div className="route-badge">➤</div>
                <div>
                  <div style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500 }}>
                    New York to Boston
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>2024-10-26</div>
                </div>
                <span style={{ color: '#64748b' }}>📅</span>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="d-flex align-items-center gap-3">
              <a className="nav-link">🔍 Search</a>
              <a className="nav-link">My Bookings</a>
              <a className="nav-link">❓ Help</a>
              <a className="nav-link">👤 Login Das</a>
              <button className="btn-modify">Modify Search</button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="p-4">
          <div className="sort-section">
            <span className="me-2">Sort by:</span>
            <span className="active">Seat Selection</span>
          </div>
          
          <div className="row">
            {/* Seat Selection Area */}
            <div className="col-left">
              <div className="content-area">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h2 className="bus-title">QuickBus | AC Sleeper</h2>
                    <p className="bus-subtitle">7:00 AM from Boston</p>
                    <div className="bus-details">
                      <span className="me-3">38 AM from 18:00-ச்டி 12:40</span>
                      <span>Neaktse - ந்டி 3t fi:தி (ரூட்ஸா ஆருtle bfo - 1்டி 0:15)</span>
                    </div>
                  </div>
                  <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '1.5rem' }}>
                    📦
                  </button>
                </div>
                
                {/* Bus Layout */}
                <div className="bus-layout">
                  <div className="driver-cabin"></div>
                  
                  <div className="deck-container">
                    {/* Upper Deck */}
                    <div className="mb-4">
                      <div className="seat-row">
                        <Seat number="1A" />
                        <Seat number="1B" />
                        <EmptySeat />
                        <Seat number="1C" />
                        <Seat number="1D" />
                        <Seat number="1E" />
                        <Seat number="1F" />
                        <EmptySeat />
                        <Seat number="1G" />
                        <Seat number="1H" />
                      </div>
                      <div className="seat-row">
                        <Seat number="2A" />
                        <Seat number="2B" />
                        <EmptySeat />
                        <Seat number="2C" />
                        <Seat number="2D" />
                        <Seat number="2E" />
                        <Seat number="2F" />
                        <EmptySeat />
                        <Seat number="2G" />
                        <Seat number="2H" />
                      </div>
                    </div>
                    
                    {/* Lower Deck */}
                    <div>
                      <div className="seat-row">
                        <Seat number="3A" />
                        <Seat number="3B" />
                        <EmptySeat />
                        <Seat number="3C" />
                        <Seat number="3D" />
                        <Seat number="3E" />
                        <Seat number="3F" />
                        <EmptySeat />
                        <Seat number="3G" />
                        <Seat number="3H" />
                      </div>
                      <div className="seat-row">
                        <Seat number="4A" />
                        <Seat number="4B" />
                        <EmptySeat />
                        <Seat number="4C" />
                        <Seat number="4D" />
                        <Seat number="4E" />
                        <Seat number="4F" />
                        <EmptySeat />
                        <Seat number="4G" />
                        <Seat number="4H" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div className="legend">
                    <div className="legend-item">
                      <div className="legend-box legend-available"></div>
                      <span>Available</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-box legend-booked"></div>
                      <span>Booked</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Summary Section */}
            <div className="col-right">
              <div className="summary-card">
                <h3 className="summary-title">Summary</h3>
                
                <div className="price-display">${subtotal.toFixed(2)}</div>
                
                <div className="summary-section">
                  <p className="selected-seats">
                    Selected Seats: {selectedSeats.join(', ') || 'None'}
                  </p>
                  
                  <div className="price-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="price-row">
                    <span>Taxes</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  <div className="price-total">
                    <span>Taxes</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="section-title">Boarding Point</h4>
                  <div className="location-box">
                    <p className="location-text">Boston South Station</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <input type="checkbox" id="boardingCheck" defaultChecked />
                    <label className="checkbox-label" htmlFor="boardingCheck">
                      Boston South Station
                    </label>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="section-title">Dropping Point</h4>
                  <div className="location-box">
                    <p className="location-text">NYC Port Authority</p>
                  </div>
                </div>
                
                <button className="btn-payment">Proceed to Payment</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}