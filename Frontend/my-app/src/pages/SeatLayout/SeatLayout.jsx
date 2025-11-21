import React from 'react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ⭐ CHANGED: Import useBus to access global seats
import { useBus } from "../BusContext/BusContext";

export default function SeatLayout({ bookedSeats }) {

  const navigate = useNavigate();
  const { selectedBus } = useBus(); // ✅ make sure context is used here

  useEffect(() => {
    // Run after component mounts
    if (!selectedBus) {
      navigate("/select-bus"); // redirect to Select Bus page
    }
  }, [selectedBus, navigate]);

  if (!selectedBus) return <p>Redirecting to bus selection...</p>;

  // ⭐ CHANGED: Get selectedSeats + setSelectedSeats from context instead of props
  const { selectedSeats, setSelectedSeats } = useBus();

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
    <> 
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
    </>
  );
}