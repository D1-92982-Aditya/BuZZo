import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBus } from "../BusContext/BusContext";
import { useEffect } from "react";
import "./Payment.css";

export default function PaymentPage() {
  const navigate = useNavigate();

  // Read global booking data
  const {
    selectedBus,
    selectedSeats,
    paymentInfo,
    setPaymentInfo
  } = useBus();

  // If user bypasses summary and comes here directly
 useEffect(() => {
    if (!selectedBus) {
      navigate("/select-bus"); // Bus missing → go to bus selection
    } else if (!selectedSeats?.length || !paymentInfo?.total) {
      navigate("/seat"); // Seat or total missing → go to seat selection
    }
  }, [selectedBus, selectedSeats, paymentInfo, navigate]);

  // Optional fallback UI
  if (!selectedBus || !selectedSeats?.length || !paymentInfo?.total) {
    return <p>Redirecting...</p>;
  }

  // Read pricing data from global context
  const { gst = 0, total = 0 } = paymentInfo;

  // Bus details
  const {
    name: busName = "Bus Name",
    type: busType = "AC Sleeper",
    time: departureTime = "00:00 AM",
    from: departureFrom = "fromCity"
  } = selectedBus || {};

  // Create passenger form inputs
  const [passengers, setPassengers] = useState(
    selectedSeats.map((seat) => ({
      seat,
      name: "",
      age: "",
      gender: ""
    }))
  );

  const handleChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const allFilled = passengers.every(
    (p) => p.name && p.age && p.gender
  );

  // Handle payment
  const handlePayment = () => {
    if (!allFilled) {
      alert("Please fill all passenger details including gender.");
      return;
    }

    const options = {
      key: "rzp_test_RSGpEdKhXwSQdu",
      amount: total * 100,
      currency: "INR",
      name: "Aditya's Project",
      description: `Booking for seats: ${selectedSeats.join(", ")}`,

      handler: function (response) {
        // Save final ticket data in global context
        setPaymentInfo({
          ...paymentInfo,
          passengers,
          paymentId: response.razorpay_payment_id
        });

        alert("Payment Successful!");
        navigate("/ticket");
      },

      prefill: {
        name: "Aditya",
        email: "aditya@example.com",
        contact: "9999999999"
      },

      theme: {
        color: "#0f9d58"
      }
    };

    new window.Razorpay(options).open();
  };

  return (
    <div className="payment-boundary">
      <div className="payment-page">
        
        {/* Bus Info */}
        <div className="bus-card animated-card">
          <h2>🚌 {busName} | {busType}</h2>
          <p>⏰ Departure: {departureTime}</p>
          <p>📍 From: {departureFrom}</p>
          <p>💺 Seats Selected: {selectedSeats.join(", ")}</p>
          <p className="total-amount">
            💰 Total Amount (including GST): ₹{total.toFixed(2)}
          </p>
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
          disabled={!allFilled}
        >
          Pay ₹{total.toFixed(2)}
        </button>
      </div>
    </div>
  );
}