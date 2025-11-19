import React from "react";
import "./BusList.css";
import { FaBus } from "react-icons/fa";

const BusList = ({ buses, loading, error, onEdit, onDelete, onRefresh }) => {
  return (
    <div className="buslist-container">
      <div className="buslist-header">
        <h1 className="page-title">Buses List</h1>
        <button
          className="refresh-btn"
          type="button"
          onClick={onRefresh}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="buslist-card">
        {error && <p className="error-text">{error}</p>}

        {loading && buses.length === 0 && <p>Loading buses...</p>}

        {!loading && buses.length === 0 && !error && <p>No buses added yet.</p>}

        {buses.length > 0 && (
          <div className="table-wrapper">
            <table className="buslist-table">
              <thead>
                <tr>
                  <th scope="col">Bus Name</th>
                  <th scope="col">Bus Number</th>
                  <th scope="col">Route</th>
                  <th scope="col">Intermediate Points</th>
                  <th scope="col">Type</th>
                  <th scope="col">Departure</th>
                  <th scope="col">Arrival</th>
                  <th scope="col">Total Seats</th>
                  <th scope="col">Price (₹)</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {buses.map((bus) => (
                  <tr key={bus.id}>
                    <td>{bus.busName}</td>
                    <td>{bus.busNumber}</td>
                    <td>{bus.from} → {bus.to}</td>
                    <td>
                      {bus.intermediatePoints && bus.intermediatePoints.length > 0
                        ? bus.intermediatePoints.join(", ")
                        : "None"}
                    </td>
                    <td>{bus.busType}</td>
                    <td>{bus.departureTime}</td>
                    <td>{bus.arrivalTime}</td>
                    <td>{bus.totalSeats}</td>
                    <td>{bus.price}</td>
                    <td>
                      {bus.status === "active" ? (
                        <FaBus color="#16a34a" title="Active" />
                      ) : (
                        <FaBus color="#b91c1c" title="Inactive" />
                      )}
                    </td>
                    <td className="actions">
                      <button className="action-btn edit-btn" onClick={() => onEdit(bus)}>
                        Edit
                      </button>
                      <button className="action-btn delete-btn" onClick={() => onDelete(bus.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusList;
