import React, { useEffect, useState } from "react";

const MyBooking = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===============================
  // FETCH MY TICKETS
  // ===============================
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("/api/tickets/myticket", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error("Failed to fetch tickets");
        }

        const data = await res.json();
        setTickets(data);
      } catch (err) {
        console.error(err);
        alert("Unable to load tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // ===============================
  // CANCEL TICKET
  // ===============================
  const cancelTicket = async (id) => {
    const confirm = window.confirm("Are you sure you want to cancel this ticket?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/tickets/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error("Cancel failed");
      }

      // Remove ticket from UI
      setTickets(prev => prev.filter(ticket => ticket.id !== id));

    } catch (err) {
      console.error(err);
      alert("Failed to cancel ticket");
    }
  };

  // ===============================
  // UI
  // ===============================
  if (loading) {
    return <div style={{ padding: "30px" }}>Loading tickets...</div>;
  }

  return (
    <div style={{ backgroundColor: "#f2f2f2", minHeight: "100vh", padding: "30px" }}>
      <h2 style={{ marginBottom: "20px", fontWeight: "500" }}>
        My Tickets
      </h2>

      {tickets.length === 0 && (
        <div style={{ background: "#fff", padding: "20px", borderRadius: "6px" }}>
          No bookings found.
        </div>
      )}

      {tickets.map(ticket => (
        <div
          key={ticket.id}
          style={{
            backgroundColor: "#ffffff",
            padding: "18px 20px",
            borderRadius: "6px",
            marginBottom: "12px",
            border: "1px solid #e0e0e0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          {/* Ticket Info */}
          <div style={{ lineHeight: "1.7" }}>
            <div style={{ fontSize: "14px", color: "#555" }}>
              Booking ID
            </div>
            <div style={{ fontWeight: "600", marginBottom: "8px" }}>
              {ticket.bookingId}
            </div>

            <div style={{ fontSize: "14px" }}>
              Passenger: <b>{ticket.passengerName}</b>
            </div>

            <div style={{ fontSize: "14px" }}>
              Route: {ticket.fromCity} → {ticket.toCity}
            </div>

            <div style={{ fontSize: "14px" }}>
              Date: {ticket.journeyDate}
            </div>

            <div style={{ fontSize: "14px" }}>
              Seat: {ticket.seatNumber}
            </div>
          </div>

          {/* Cancel Button */}
          <button
            style={{
              backgroundColor: "transparent",
              border: "1px solid #d32f2f",
              color: "#d32f2f",
              padding: "8px 14px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px"
            }}
            onClick={() => cancelTicket(ticket.id)}
          >
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyBooking;
