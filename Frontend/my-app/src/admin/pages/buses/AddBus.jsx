import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddBus.css";

const API = "https://localhost:7101/api";

export default function AddBus() {
  const [activeTab, setActiveTab] = useState("bus");

  const [busId, setBusId] = useState("");
  const [scheduleId, setScheduleId] = useState("");
  const [buses, setBuses] = useState([]);

  /* ---------------- BUS ---------------- */
  const [bus, setBus] = useState({
    busName: "",
    busNumber: "",
    busType: "",
    totalSeats: ""
  });

  /* ---------------- SCHEDULE ---------------- */
  const [schedule, setSchedule] = useState({
    fromCity: "",
    toCity: "",
    journeyDate: "",
    departureTime: "",
    arrivalTime: "",
    ticketPrice: ""
  });

  /* ---------------- BOARDING / DROPPING ---------------- */
  const [boardingPoints, setBoardingPoints] = useState([{ locationName: "", time: "" }]);
  const [droppingPoints, setDroppingPoints] = useState([{ locationName: "", time: "" }]);

  /* ---------------- LOAD BUSES ---------------- */
  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const res = await axios.get(`${API}/bus`);
      setBuses(res.data);
    } catch (err) {
      console.error("Error fetching buses:", err);
      alert("Failed to load buses");
    }
  };

  /* ---------------- HANDLERS ---------------- */
  const handleBusChange = (e) => setBus({ ...bus, [e.target.name]: e.target.value });
  const handleScheduleChange = (e) => setSchedule({ ...schedule, [e.target.name]: e.target.value });

  /* ---------------- API CALLS ---------------- */
  const saveBus = async () => {
    if (!bus.busName || !bus.busNumber) {
      alert("Bus name and number are required");
      return;
    }

    try {
      const res = await axios.post(`${API}/bus`, {
        ...bus,
        totalSeats: Number(bus.totalSeats)
      });

      alert("Bus added successfully");
      setBusId(res.data.id);
      fetchBuses();
      setBus({ busName: "", busNumber: "", busType: "", totalSeats: "" });
    } catch (err) {
      if (err.response) {
        console.error("Bus save error:", err.response.data);
        alert("Error saving bus: " + JSON.stringify(err.response.data.errors || err.response.data));
      } else {
        console.error(err);
        alert("Unknown error occurred while saving bus");
      }
    }
  };

  const saveSchedule = async () => {
    if (!busId) {
      alert("Please select a bus");
      return;
    }

    const { fromCity, toCity, journeyDate, departureTime, arrivalTime, ticketPrice } = schedule;
    if (!fromCity || !toCity || !journeyDate || !departureTime || !arrivalTime || !ticketPrice) {
      alert("Please fill all schedule fields");
      return;
    }

    try {
      const res = await axios.post(`${API}/bus/bus-schedule`, {
        busId: Number(busId),
        fromCity,
        toCity,
        journeyDate, // "YYYY-MM-DD" works for DateTime
        departureTime: departureTime + ":00", // TimeSpan expects HH:mm:ss
        arrivalTime: arrivalTime + ":00",
        ticketPrice: Number(ticketPrice)
      });

      alert("Schedule added");
      setScheduleId(res.data.id);
      setSchedule({ fromCity: "", toCity: "", journeyDate: "", departureTime: "", arrivalTime: "", ticketPrice: "" });
    } catch (err) {
      if (err.response) {
        console.error("Schedule save error:", err.response.data);
        alert("Error saving schedule: " + JSON.stringify(err.response.data.errors || err.response.data));
      } else {
        console.error(err);
        alert("Unknown error occurred while saving schedule");
      }
    }
  };

  const saveBoarding = async () => {
    if (!scheduleId) {
      alert("Add schedule first");
      return;
    }

    const payload = boardingPoints
      .filter(p => p.locationName && p.time)
      .map(p => ({ busScheduleId: scheduleId, locationName: p.locationName, boardingTime: p.time + ":00" }));

    if (!payload.length) {
      alert("No valid boarding points to save");
      return;
    }

    try {
      await axios.post(`${API}/bus/boardingpoints`, payload);
      alert("Boarding points saved");
      setBoardingPoints([{ locationName: "", time: "" }]);
    } catch (err) {
      if (err.response) {
        console.error("Boarding save error:", err.response.data);
        alert("Error saving boarding points: " + JSON.stringify(err.response.data.errors || err.response.data));
      } else {
        console.error(err);
        alert("Unknown error occurred while saving boarding points");
      }
    }
  };

  const saveDropping = async () => {
    if (!scheduleId) {
      alert("Add schedule first");
      return;
    }

    const payload = droppingPoints
      .filter(p => p.locationName && p.time)
      .map(p => ({ busScheduleId: scheduleId, locationName: p.locationName, droppingTime: p.time + ":00" }));

    if (!payload.length) {
      alert("No valid dropping points to save");
      return;
    }

    try {
      await axios.post(`${API}/bus/droppingpoints`, payload);
      alert("Dropping points saved");
      setDroppingPoints([{ locationName: "", time: "" }]);
    } catch (err) {
      if (err.response) {
        console.error("Dropping save error:", err.response.data);
        alert("Error saving dropping points: " + JSON.stringify(err.response.data.errors || err.response.data));
      } else {
        console.error(err);
        alert("Unknown error occurred while saving dropping points");
      }
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="addbus-container">
      <h2>Bus Management</h2>

      <div className="tabs">
        {["bus", "schedule", "boarding", "dropping"].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ---------------- BUS ---------------- */}
      {activeTab === "bus" && (
        <>
          <input name="busName" placeholder="Bus Name" value={bus.busName} onChange={handleBusChange} />
          <input name="busNumber" placeholder="Bus Number" value={bus.busNumber} onChange={handleBusChange} />
          <input name="busType" placeholder="Bus Type" value={bus.busType} onChange={handleBusChange} />
          <input name="totalSeats" type="number" placeholder="Total Seats" value={bus.totalSeats} onChange={handleBusChange} />
          <button onClick={saveBus}>Save Bus</button>
        </>
      )}

      {/* ---------------- SCHEDULE ---------------- */}
      {activeTab === "schedule" && (
        <>
          <select value={busId} onChange={e => setBusId(e.target.value)}>
            <option value="">Select Bus</option>
            {buses.map(b => (
              <option key={b.id} value={b.id}>
                {b.busName} ({b.busNumber})
              </option>
            ))}
          </select>

          <input name="fromCity" placeholder="From City" value={schedule.fromCity} onChange={handleScheduleChange} />
          <input name="toCity" placeholder="To City" value={schedule.toCity} onChange={handleScheduleChange} />
          <input type="date" name="journeyDate" value={schedule.journeyDate} onChange={handleScheduleChange} />
          <input type="time" name="departureTime" value={schedule.departureTime} onChange={handleScheduleChange} />
          <input type="time" name="arrivalTime" value={schedule.arrivalTime} onChange={handleScheduleChange} />
          <input type="number" name="ticketPrice" placeholder="Ticket Price" value={schedule.ticketPrice} onChange={handleScheduleChange} />

          <button onClick={saveSchedule}>Save Schedule</button>
        </>
      )}

      {/* ---------------- BOARDING ---------------- */}
      {activeTab === "boarding" && (
        <>
          {boardingPoints.map((p, i) => (
            <div key={i}>
              <input placeholder="Location" value={p.locationName} onChange={e => {
                const copy = [...boardingPoints];
                copy[i].locationName = e.target.value;
                setBoardingPoints(copy);
              }} />
              <input type="time" value={p.time} onChange={e => {
                const copy = [...boardingPoints];
                copy[i].time = e.target.value;
                setBoardingPoints(copy);
              }} />
            </div>
          ))}
          <button onClick={() => setBoardingPoints([...boardingPoints, { locationName: "", time: "" }])}>+ Add</button>
          <button onClick={saveBoarding}>Save Boarding</button>
        </>
      )}

      {/* ---------------- DROPPING ---------------- */}
      {activeTab === "dropping" && (
        <>
          {droppingPoints.map((p, i) => (
            <div key={i}>
              <input placeholder="Location" value={p.locationName} onChange={e => {
                const copy = [...droppingPoints];
                copy[i].locationName = e.target.value;
                setDroppingPoints(copy);
              }} />
              <input type="time" value={p.time} onChange={e => {
                const copy = [...droppingPoints];
                copy[i].time = e.target.value;
                setDroppingPoints(copy);
              }} />
            </div>
          ))}
          <button onClick={() => setDroppingPoints([...droppingPoints, { locationName: "", time: "" }])}>+ Add</button>
          <button onClick={saveDropping}>Save Dropping</button>
        </>
      )}
    </div>
  );
}
