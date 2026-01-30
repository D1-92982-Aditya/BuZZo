import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useBus } from "../BusContext/BusContext";

export default function SeatLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    selectedBus,
    selectedSeats,
    setSelectedSeats,
    setSelectedBus
  } = useBus();

  const [bookedSeats, setBookedSeats] = useState([]);
  const [totalSeats, setTotalSeats] = useState(0);

  /* =======================
     Restore bus on refresh
     ======================= */
  useEffect(() => {
    if (!selectedBus) {
      if (location.state?.selectedBus) {
        setSelectedBus(location.state.selectedBus);
      } else {
        navigate("/select-bus");
      }
    }
  }, [selectedBus, location.state, navigate, setSelectedBus]);

  /* =======================
     Fetch seats from backend
     ======================= */
  useEffect(() => {
    if (!selectedBus?.scheduleId) return;

    fetch(`https://buzzo-5.onrender.com/buses/seats/${selectedBus.scheduleId}`)
      .then(res => res.json())
      .then(data => {
        setTotalSeats(data.length);

        const booked = data
          .filter(seat => seat.booked === true)
          .map(seat => seat.seatNumber); // EXACT DB VALUE

        setBookedSeats(booked);
      })
      .catch(err => console.error("Seat fetch error:", err));
  }, [selectedBus]);

  if (!selectedBus) return <p>Redirecting...</p>;

  /* =======================
     Seat interaction logic
     ======================= */
  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;

    setSelectedSeats(prev =>
      prev.includes(seat)
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    );
  };

  const getSeatClass = (seat) => {
    if (bookedSeats.includes(seat)) return "seat booked";
    if (selectedSeats.includes(seat)) return "seat selected";
    return "seat available";
  };

  const Seat = ({ number }) => (
    <div className={getSeatClass(number)} onClick={() => toggleSeat(number)}>
      <span className="seat-number">{number}</span>
    </div>
  );

  const EmptySeat = () => <div className="seat empty" />;

  /* =======================
     24 SEAT LAYOUT (6 x 4)
     ======================= */
  const seatsPerRow = 4; // ✅ DB MATCH
  const rows = Math.ceil(totalSeats / seatsPerRow);
  const deckRows = [];

  for (let r = 1; r <= rows; r++) {
    deckRows.push(
      <div className="seat-row" key={r}>
        <Seat number={`${r}A`} />
        <Seat number={`${r}B`} />
        <EmptySeat />
        <Seat number={`${r}C`} />
        <Seat number={`${r}D`} />
      </div>
    );
  }

  /* =======================
     JSX
     ======================= */
  return (
    <>
      <div style={{ marginBottom: "20px", color: "#fff" }}>
        <h2>{selectedBus.busName} ({selectedBus.busType})</h2>
        <p>
          From: {selectedBus.fromCity} → {selectedBus.toCity}<br />
          Date: {selectedBus.journeyDate}<br />
          Departure: {selectedBus.departureTime} | Arrival: {selectedBus.arrivalTime}
        </p>
      </div>

      <div className="bus-layout">
        <div className="driver-cabin" />
        <div className="deck-container">{deckRows}</div>

        <div className="legend">
          <div className="legend-item">
            <div className="legend-box legend-available"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="legend-box legend-booked"></div>
            <span>Booked</span>
          </div>
          <div className="legend-item">
            <div className="legend-box legend-selected"></div>
            <span>Selected</span>
          </div>
        </div>
      </div>
    </>
  );
}
