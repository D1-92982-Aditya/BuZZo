import React, { useState } from "react";
import "./AddBus.css";

const AddBus = () => {
  const [form, setForm] = useState({
    busName: "",
    busNumber: "",
    from: "",
    to: "",
    totalSeats: "",
    price: "",
    departureTime: "",
    arrivalTime: "",
    busType: "",
    journeyDate: "",
  });

  const [points, setPoints] = useState([]);
  const [pointInput, setPointInput] = useState("");

  const addPoint = () => {
    if (pointInput.trim() === "") return;
    setPoints([...points, pointInput]);
    setPointInput("");
  };

  const removePoint = (i) => {
    setPoints(points.filter((_, index) => index !== i));
  };

  const handleSave = () => {
    const busData = { ...form, intermediatePoints: points };

    console.log("Saving Bus:", busData);
    alert("Bus saved successfully!");

    // Call your backend API here
  };

  return (
    <div className="add-container">
      <h2 className="add-title">Add Bus</h2>

      <div className="form-grid">

        <input
          type="text"
          placeholder="Bus Name"
          value={form.busName}
          onChange={(e) => setForm({ ...form, busName: e.target.value })}
        />

        <input
          type="text"
          placeholder="Bus Number"
          value={form.busNumber}
          onChange={(e) => setForm({ ...form, busNumber: e.target.value })}
        />

        <input
          type="text"
          placeholder="From"
          value={form.from}
          onChange={(e) => setForm({ ...form, from: e.target.value })}
        />

        <input
          type="text"
          placeholder="To"
          value={form.to}
          onChange={(e) => setForm({ ...form, to: e.target.value })}
        />

        <input
          type="number"
          placeholder="Total Seats"
          value={form.totalSeats}
          onChange={(e) => setForm({ ...form, totalSeats: e.target.value })}
        />

        <input
          type="number"
          placeholder="Ticket Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          type="date"
          value={form.journeyDate}
          onChange={(e) => setForm({ ...form, journeyDate: e.target.value })}
        />

        <input
          type="time"
          value={form.departureTime}
          onChange={(e) =>
            setForm({ ...form, departureTime: e.target.value })
          }
        />

        <input
          type="time"
          value={form.arrivalTime}
          onChange={(e) =>
            setForm({ ...form, arrivalTime: e.target.value })
          }
        />

        <select
          value={form.busType}
          onChange={(e) => setForm({ ...form, busType: e.target.value })}
        >
          <option value="">Select Bus Type</option>
          <option value="AC">AC</option>
          <option value="Non-AC">Non-AC</option>
          <option value="Sleeper">Sleeper</option>
          <option value="Seater">Seater</option>
        </select>
      </div>

      {/* Intermediate Points */}
      <h3 className="points-title">Intermediate Points</h3>

      <div className="points-add">
        <input
          type="text"
          placeholder="Add Point"
          value={pointInput}
          onChange={(e) => setPointInput(e.target.value)}
        />
        <button className="add-btn" onClick={addPoint}>+</button>
      </div>

      <ul className="points-list">
        {points.map((p, i) => (
          <li key={i}>
            {p}
            <button className="remove-point" onClick={() => removePoint(i)}>
              X
            </button>
          </li>
        ))}
      </ul>

      {/* Save Button */}
      <button className="save-btn" onClick={handleSave}>
        Save Bus
      </button>
    </div>
  );
};

export default AddBus;

