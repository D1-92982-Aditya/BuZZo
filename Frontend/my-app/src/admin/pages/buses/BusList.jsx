import React, { useState } from "react";
import axios from "axios";

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch Scheduled Buses
  const getBuses = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        "https://localhost:7101/api/bus/scheduled"
      );

      console.log("API RESPONSE 👉", res.data);
      setBuses(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch buses");
    } finally {
      setLoading(false);
    }
  };

  // ❌ Cancel Bus Schedule
  const cancelBus = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this bus?"
    );

    if (!confirmCancel) return;

    try {
      await axios.delete(`https://localhost:7101/api/bus/cancel/${id}`)


      alert("Bus cancelled successfully");

      // 🔄 Refresh list
      getBuses();
    } catch (err) {
      console.error(err);
      alert("Failed to cancel bus");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🚌 Scheduled Bus List</h2>

      {/* BUTTON */}
      <button
        onClick={getBuses}
        style={{
          padding: "10px 20px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Get Buses
      </button>

      {/* LOADING */}
      {loading && <p>Loading buses...</p>}

      {/* ERROR */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* NO DATA */}
      {!loading && buses.length === 0 && (
        <p>No buses available</p>
      )}

      {/* TABLE */}
      {buses.length > 0 && (
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          width="100%"
        >
          <thead>
            <tr>
              <th>Schedule Id</th>
              <th>Bus Id</th>
              <th>From</th>
              <th>To</th>
              <th>Journey Date</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {buses.map((bus) => (
              <tr key={bus.id}>
                <td>{bus.id}</td>
                <td>{bus.busId}</td>
                <td>{bus.fromCity}</td>
                <td>{bus.toCity}</td>
                <td>
                  {new Date(bus.journeyDate).toLocaleDateString()}
                </td>
                <td>{bus.departureTime}</td>
                <td>{bus.arrivalTime}</td>
                <td>₹{bus.ticketPrice}</td>
                <td>
                  <button
                    onClick={() => cancelBus(bus.id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BusList;
