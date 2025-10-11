import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BusSeatSelector() {
  const [selectedSeats, setSelectedSeats] = useState(['2A', '2B']);
  const bookedSeats = ['2E', '4D', '4F'];
  const seatPrice = 10.0;
  const taxes = 30.0;
  const navigate = useNavigate();

  const proceedPayment = () => {
    navigate('/payment');
  };

  const toggleSeat = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
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
      {/* ✅ Updated Responsive Styling */}
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

        .bus-layout {
          background: #475569;
          border-radius: 1rem;
          padding: 1.5rem;
          position: relative;
          margin-top: 1.5rem;
          overflow-x: auto; /* important for small screens */
        }

        .driver-cabin {
          position: absolute;
          left: 1rem;
          top: 1rem;
          width: 50px;
          height: 70px;
          background: #64748b;
          border: 2px solid #94a3b8;
          border-radius: 0.5rem;
        }

        .deck-container {
          margin-left: 5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 100%;
        }

        .seat-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          justify-content: flex-start;
        }

        .seat {
          width: clamp(35px, 5vw, 50px);
          height: clamp(55px, 8vw, 80px);
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
          flex-shrink: 0;
        }

        .seat.available {
          background: #5eead4;
          border-color: #2dd4bf;
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

        .seat:hover {
          transform: scale(1.05);
          opacity: 0.9;
        }

        .seat-number {
          position: relative;
          z-index: 1;
          background: rgba(255,255,255,0.9);
          padding: 2px 6px;
          border-radius: 0.25rem;
          font-size: 0.65rem;
        }

        .seat.empty {
          width: clamp(35px, 5vw, 50px);
          height: clamp(55px, 8vw, 80px);
          background: transparent;
          border: none;
        }

        .legend {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1.5rem;
          flex-wrap: wrap;
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

        @media (max-width: 992px) {
          .deck-container {
            margin-left: 0;
            align-items: center;
          }
          .driver-cabin {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .bus-layout {
            padding: 1rem;
          }
          .seat {
            font-size: 0.6rem;
          }
        }

        @media (max-width: 480px) {
          .seat {
            font-size: 0.55rem;
            border-width: 2px;
          }
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
      `}</style>

      {/* Header */}
      <div className="main-container">
        <div className="header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <div className="logo">🚌</div>
              <span className="brand-name">Buzzo</span>
            </div>
            <div className="d-flex align-items-center gap-3">
              <a className="nav-link">🔍 Search</a>
              <a className="nav-link">My Bookings</a>
              <a className="nav-link">❓ Help</a>
              <a className="nav-link">👤 Login</a>
              <button className="btn-modify">Modify</button>
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="p-4">
          <div className="row">
            {/* Left: Seat Selection */}
            <div className="col-left">
              <div className="content-area">
                <h2 className="bus-title">QuickBus | AC Sleeper</h2>
                <p className="bus-subtitle">7:00 AM from Boston</p>

                <div className="bus-layout">
                  <div className="driver-cabin"></div>

                  <div className="deck-container">
                    {/* Upper Deck */}
                    <div>
                      <div className="seat-row">
                        <Seat number="1A" />
                        <Seat number="1B" />
                        <EmptySeat />
                        <Seat number="1C" />
                        <Seat number="1D" />
                        <Seat number="1E" />
                        <Seat number="1F" />
                      </div>
                      <div className="seat-row">
                        <Seat number="2A" />
                        <Seat number="2B" />
                        <EmptySeat />
                        <Seat number="2C" />
                        <Seat number="2D" />
                        <Seat number="2E" />
                        <Seat number="2F" />
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
                      </div>
                      <div className="seat-row">
                        <Seat number="4A" />
                        <Seat number="4B" />
                        <EmptySeat />
                        <Seat number="4C" />
                        <Seat number="4D" />
                        <Seat number="4E" />
                        <Seat number="4F" />
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

            {/* Right: Summary */}
            <div className="col-right">
              <div className="summary-card">
                <h3 className="summary-title">Summary</h3>
                <div className="price-display">${subtotal.toFixed(2)}</div>
                <div className="price-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="price-row">
                  <span>Taxes</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
                <div className="price-total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button className="btn-payment" onClick={proceedPayment}>
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
