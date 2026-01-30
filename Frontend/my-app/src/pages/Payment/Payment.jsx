import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBus } from "../BusContext/BusContext";
import "./Payment.css";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { selectedBus, selectedSeats, paymentInfo, setPaymentInfo } = useBus();

  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ----------------------------------
     REDIRECT SAFETY
  ---------------------------------- */
  useEffect(() => {
    if (!selectedBus) navigate("/select-bus");
    if (!selectedSeats?.length) navigate("/seat");
    if (!paymentInfo?.total) navigate("/seat");

    setPassengers(
      selectedSeats.map(seat => ({
        seat, // EXACT seat number like "1A", "L1"
        name: "",
        age: "",
        gender: ""
      }))
    );
  }, []);

  const handleChange = (index, field, value) => {
    const copy = [...passengers];
    copy[index][field] = value;
    setPassengers(copy);
  };

  const allFilled = passengers.every(
    p => p.name && p.age && p.gender
  );

  /* ----------------------------------
     MAIN PAYMENT HANDLER
  ---------------------------------- */
  const handlePayment = async () => {
    if (!allFilled) {
      alert("Fill all passenger details");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Session expired. Please login again.");
      navigate("/");
      return;
    }

    setLoading(true);

    try {
      /* -------------------------------
         1️⃣ BOOK SEATS (BACKEND)
      -------------------------------- */
      for (const p of passengers) {
        const res = await fetch(
          `http://localhost:8080/buses/book-seat?scheduleId=${selectedBus.scheduleId}&seatNumber=${p.seat}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || `Seat ${p.seat} booking failed`);
        }
      }

      /* -------------------------------
         2️⃣ RAZORPAY PAYMENT
      -------------------------------- */
      const options = {
        key: "rzp_test_RSGpEdKhXwSQdu",
        amount: paymentInfo.total * 100,
        currency: "INR",
        name: "Buzzo",
        description: `Seats: ${selectedSeats.join(", ")}`,

        handler: async function (response) {

          console.log("✅ Razorpay Payment Response:", response);
        
          const bookingId =
            "T" + Math.random().toString(36).substring(2, 8).toUpperCase();
        
          const ticketPayload = {
            bookingId: bookingId,
            busName: selectedBus.busName,
            fromCity: selectedBus.fromCity,
            toCity: selectedBus.toCity,
            journeyDate: selectedBus.journeyDate,
            seats: selectedSeats.join(", "),
            totalAmount: paymentInfo.total,
            paymentId: response.razorpay_payment_id
          };
        
          console.log("📦 Ticket Payload to Backend:", ticketPayload);
        
         /* const res = await fetch("http://localhost:8080/tickets/success", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(ticketPayload)
          });
          */
        
          console.log("📡 Backend Response Status:", res.status);
        
          const backendText = await res.text();
          console.log("📨 Backend Response Body:", backendText);
        
          setPaymentInfo({
            ...paymentInfo,
            passengers,
            paymentId: response.razorpay_payment_id,
            bookingId
          });
        
          console.log("🧠 Updated paymentInfo (context):", {
            ...paymentInfo,
            passengers,
            paymentId: response.razorpay_payment_id,
            bookingId
          });
        
          alert("🎉 Booking & Payment Successful");
          navigate("/ticket");
        }
        
        ,

        prefill: {
          name: passengers[0].name,
          email: localStorage.getItem("email"),
          contact: "9999999999"
        },

        theme: {
          color: "#0f9d58"
        }
      };

      new window.Razorpay(options).open();

    } catch (err) {
      console.error(err);
      alert(err.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------
     UI
  ---------------------------------- */
  return (
    <div className="payment-boundary">
      <div className="payment-page">

        {/* BUS INFO */}
        <div className="bus-card">
          <h2>🚌 {selectedBus.busName} | {selectedBus.busType}</h2>
          <p>📍 {selectedBus.fromCity} → {selectedBus.toCity}</p>
          <p>⏰ Departure: {selectedBus.departureTime}</p>
          <p>💺 Seats: {selectedSeats.join(", ")}</p>
          <h3>💰 Total: ₹{paymentInfo.total}</h3>
        </div>

        {/* PASSENGERS */}
        <div className="passenger-section">
          <h3>Passenger Details</h3>

          {passengers.map((p, idx) => (
            <div key={p.seat} className="passenger-card">
              <h4>Seat {p.seat}</h4>

              <input
                type="text"
                placeholder="Name"
                value={p.name}
                onChange={e => handleChange(idx, "name", e.target.value)}
              />

              <input
                type="number"
                placeholder="Age"
                value={p.age}
                onChange={e => handleChange(idx, "age", e.target.value)}
              />

              <select
                value={p.gender}
                onChange={e => handleChange(idx, "gender", e.target.value)}
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          ))}
        </div>

        {/* PAY */}
        <button
          className="pay-button"
          disabled={!allFilled || loading}
          onClick={handlePayment}
        >
          {loading ? "Processing..." : `Pay ₹${paymentInfo.total}`}
        </button>

      </div>
    </div>
  );
}
