import React, { useState } from 'react';

export default function SeatLayout() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const bookedSeats = ['2B', '3D', '4F']; // Example booked seats

  const toggleSeat = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

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
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .bus-layout {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .driver-cabin {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
          margin: 0 auto 30px auto;
          position: relative;
        }

        .driver-cabin::after {
          content: '🚗';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 24px;
        }

        .deck-container {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .deck-container > div {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .seat-row {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
          justify-items: center;
        }

        .seat {
          width: 100%;
          aspect-ratio: 1;
          max-width: 70px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 2px solid transparent;
        }

        .seat.available {
          background: #e8f5e9;
          color: #2e7d32;
          border-color: #81c784;
        }

        .seat.available:hover {
          background: #c8e6c9;
          transform: scale(1.05);
          border-color: #4caf50;
        }

        .seat.selected {
          background: #2196f3;
          color: white;
          border-color: #1976d2;
          transform: scale(1.05);
        }

        .seat.booked {
          background: #ffebee;
          color: #c62828;
          border-color: #ef5350;
          cursor: not-allowed;
          opacity: 0.7;
        }

        .seat.empty {
          background: transparent;
          cursor: default;
          border: none;
        }

        .seat-number {
          font-size: 12px;
        }

        .legend {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #e0e0e0;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .legend-box {
          width: 30px;
          height: 30px;
          border-radius: 6px;
          border: 2px solid;
        }

        .legend-available {
          background: #e8f5e9;
          border-color: #81c784;
        }

        .legend-booked {
          background: #ffebee;
          border-color: #ef5350;
        }

        /* Responsive - maintains layout, just scales down */
        @media (max-width: 768px) {
          .bus-layout {
            padding: 15px;
          }

          .driver-cabin {
            width: 45px;
            height: 45px;
            margin-bottom: 20px;
          }

          .driver-cabin::after {
            font-size: 18px;
          }

          .deck-container {
            gap: 25px;
          }

          .deck-container > div {
            gap: 8px;
          }

          .seat-row {
            gap: 6px;
          }

          .seat {
            max-width: 50px;
            border-radius: 6px;
          }

          .seat-number {
            font-size: 10px;
          }

          .legend {
            gap: 15px;
            margin-top: 25px;
          }

          .legend-box {
            width: 24px;
            height: 24px;
          }

          .legend-item span {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .bus-layout {
            padding: 12px;
          }

          .driver-cabin {
            width: 35px;
            height: 35px;
            margin-bottom: 15px;
          }

          .driver-cabin::after {
            font-size: 14px;
          }

          .deck-container {
            gap: 20px;
          }

          .deck-container > div {
            gap: 6px;
          }

          .seat-row {
            gap: 4px;
          }

          .seat {
            max-width: 40px;
            border-radius: 5px;
            border-width: 1.5px;
          }

          .seat-number {
            font-size: 9px;
          }

          .legend {
            flex-direction: column;
            gap: 10px;
            align-items: center;
            margin-top: 20px;
          }

          .legend-box {
            width: 20px;
            height: 20px;
          }

          .legend-item span {
            font-size: 12px;
          }
        }
      `}</style>

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
  );
}