import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBus } from "../BusContext/BusContext";
import "./Payment.css";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { selectedBus, selectedSeats, paymentInfo, setPaymentInfo } = useBus();
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Redirect if missing data
  useEffect(() => {
    if (!selectedBus) navigate("/select-bus");
    else if (!selectedSeats?.length || !paymentInfo?.total) navigate("/seat");
    else {
      setPassengers(
        selectedSeats.map((seat) => ({ seat, name: "", age: "", gender: "" }))
      );
    }
  }, [selectedBus, selectedSeats, paymentInfo, navigate]);

  if (!selectedBus || !selectedSeats?.length || !paymentInfo?.total) {
    return <p>Redirecting...</p>;
  }

  const { total = 0 } = paymentInfo;
  const { busName, busType, departureTime, fromCity, toCity } = selectedBus;

  const handleChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const allFilled = passengers.every((p) => p.name && p.age && p.gender);

  // Map React seat (1A, 2B) -> DB numeric seat
  const reactToDbSeat = (seat) => {
    const row = parseInt(seat);
    const col = seat.charCodeAt(seat.length - 1) - 65; // A->0, B->1
    return (row - 1) * 6 + (col + 1);
  };

  const handlePayment = async () => {
    if (!allFilled) {
      alert("Please fill all passenger details.");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Book seats sequentially via backend
      for (const p of passengers) {
        const dbSeat = reactToDbSeat(p.seat);
        const res = await fetch(
          `http://localhost:8080/buses/book-seat?scheduleId=${selectedBus.scheduleId}&seatNumber=${dbSeat}`,
          { method: "PUT" }
        );

        const resText = await res.text();
        if (!res.ok) {
          throw new Error(
            `Booking failed for seat ${p.seat}: ${resText || "Unknown error"}`
          );
        }
      }

      // 2️⃣ All seats booked → trigger Razorpay
      const options = {
        key: "rzp_test_RSGpEdKhXwSQdu", // Your Razorpay test key
        amount: total * 100, // in paise
        currency: "INR",
        name: "Aditya's Project",
        description: `Seats: ${selectedSeats.join(", ")}`,
        handler: function (response) {
          setPaymentInfo({
            ...paymentInfo,
            passengers,
            paymentId: response.razorpay_payment_id,
          });
          alert("Payment & Booking Successful!");
          navigate("/ticket");
        },
        prefill: {
          name: "Aditya",
          email: "aditya@example.com",
          contact: "9999999999",
        },
        theme: { color: "#0f9d58" },
        method: {
          card: true,
          netbanking: true,
          wallet: true,
          upi: true, // ✅ enable UPI
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error("Booking failed:", err);
      alert(err.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-boundary">
      <div className="payment-page">
        {/* Bus Info */}
        <div className="bus-card animated-card">
          <h2>🚌 {busName} | {busType}</h2>
          <p>⏰ Departure: {departureTime}</p>
          <p>📍 From: {fromCity} → {toCity}</p>
          <p>💺 Seats Selected: {selectedSeats.join(", ")}</p>
          <p className="total-amount">💰 Total Amount: ₹{total.toFixed(2)}</p>
        </div>

        {/* Passenger Forms */}
        <div className="passenger-section">
          <h3>Passenger Details</h3>
          {passengers.map((p, idx) => (
            <div key={p.seat} className="passenger-card animated-card">
              <h4>👤 Seat {p.seat}</h4>
              <div className="passenger-input-box">
                <input
                  type="text"
                  placeholder="Name"
                  value={p.name}
                  onChange={(e) => handleChange(idx, "name", e.target.value)}
                  className="animated-input"
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={p.age}
                  onChange={(e) => handleChange(idx, "age", e.target.value)}
                  className="animated-input"
                />
                <select
                  value={p.gender}
                  onChange={(e) => handleChange(idx, "gender", e.target.value)}
                  className="animated-input"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Pay Button */}
        <button
          className={`pay-button ${allFilled ? "" : "disabled"}`}
          onClick={handlePayment}
          disabled={!allFilled || loading}
        >
          {loading ? "Processing..." : `Pay ₹${total.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
}
