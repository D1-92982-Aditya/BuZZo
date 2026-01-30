import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";
import { useBus } from "../BusContext/BusContext";
import BoardingDroppingModal from "../BoardingDroppingModal/Modal";

/* ⭐ STAR RATING */
const StarRating = ({ rating = 4, size = "16px" }) => (
  <div style={{ display: "flex", gap: "2px", marginBottom: "6px" }}>
    {[...Array(5)].map((_, i) => (
      <span
        key={i}
        style={{ color: i < rating ? "#ffc107" : "#e4e5e9", fontSize: size }}
      >
        ★
      </span>
    ))}
  </div>
);

/* ✅ FILTER CHECKBOX */
const FilterCheckbox = ({ id, label, checked, onChange }) => (
  <div style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      style={{
        width: "18px",
        height: "18px",
        marginRight: "10px",
        accentColor: "#0d6efd",
      }}
    />
    <label htmlFor={id} style={{ fontSize: "14px", color: "#333" }}>
      {label}
    </label>
  </div>
);

/* ✅ FILTER CARD */
const FilterCard = ({
  priceRange,
  setPriceRange,
  selectedFilters,
  handleFilterChange,
}) => (
  <div
    style={{
      backgroundColor: "#fff",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      color: "#000",
      width: "280px",
    }}
  >
    <h6 style={{ fontWeight: "600", marginBottom: "20px" }}>Filter by</h6>

    <h6>Departure Time</h6>
    <FilterCheckbox
      id="morning"
      label="Morning: 5am - 11am"
      checked={selectedFilters.morning}
      onChange={() => handleFilterChange("morning")}
    />
    <FilterCheckbox
      id="evening"
      label="Evening: 11am - 7pm"
      checked={selectedFilters.evening}
      onChange={() => handleFilterChange("evening")}
    />
    <FilterCheckbox
      id="night"
      label="Night: 7pm - 5am"
      checked={selectedFilters.night}
      onChange={() => handleFilterChange("night")}
    />

    <h6 style={{ marginTop: "15px" }}>Bus Type</h6>
    <FilterCheckbox
      id="ac"
      label="AC Sleeper"
      checked={selectedFilters.ac}
      onChange={() => handleFilterChange("ac")}
    />
    <FilterCheckbox
      id="nonac"
      label="Non-AC Seater"
      checked={selectedFilters.nonac}
      onChange={() => handleFilterChange("nonac")}
    />

    <h6 style={{ marginTop: "15px" }}>Price Range</h6>
    <input
      type="range"
      min="500"
      max="2000"
      value={priceRange[1]}
      onChange={(e) =>
        setPriceRange([priceRange[0], Number(e.target.value)])
      }
      style={{ width: "100%", accentColor: "#0d6efd" }}
    />
    <p style={{ fontSize: "12px" }}>
      ₹{priceRange[0]} - ₹{priceRange[1]}
    </p>
  </div>
);

/* ================= MAIN COMPONENT ================= */
const SelectBus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSelectedBus } = useBus();

  const { fromCity, toCity, journeyDate } = location.state || {};

  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [selectedFilters, setSelectedFilters] = useState({
    morning: false,
    evening: false,
    night: false,
    ac: false,
    nonac: false,
  });

  /* ✅ SMALL SCREEN FILTER */
  const [showFilter, setShowFilter] = useState(false);
  const isSmallScreen = window.innerWidth <= 768;

  /* ✅ FIX FOR DOUBLE API CALL (STRICT MODE) */
  const fetchedOnce = useRef(false);

  const handleFilterChange = (filter) => {
    setSelectedFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  useEffect(() => {
    if (!fromCity || !toCity || !journeyDate) return;
    if (fetchedOnce.current) return; // 🔥 PREVENT DOUBLE CALL

    fetchedOnce.current = true;

    const fetchBuses = async () => {
      setLoading(true);
      try {
        const res = await API.get("/search", {
          params: { fromCity, toCity, journeyDate },
        });

        const data = res.data || [];
        setBuses(data);

        if (data.length > 0) {
          setSelectedSchedule(data[0]);
          setShowModal(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, [fromCity, toCity, journeyDate]);

  const handleSelectSeat = (bus) => {
    const selectedBus = {
      scheduleId: bus.id,
      busName: bus.bus.busName,
      busType: bus.bus.busType,
      totalSeats: bus.bus.totalSeats,
      departureTime: bus.departureTime,
      arrivalTime: bus.arrivalTime,
      fromCity,
      toCity,
      journeyDate,
    };

    setSelectedBus(selectedBus);
    navigate("/seat", { state: { selectedBus } });
  };

  return (
    <div
      style={{
        backgroundColor: "#2c3e50",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2 style={{ color: "#fff" }}>
        Buses from {fromCity} to {toCity}
      </h2>

      {/* FILTER BUTTON – SMALL SCREEN */}
      {isSmallScreen && (
        <button
          onClick={() => setShowFilter(!showFilter)}
          style={{
            backgroundColor: "#0d6efd",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: "6px",
            margin: "10px 0",
          }}
        >
          {showFilter ? "Hide Filters" : "Show Filters"}
        </button>
      )}

      {/* MODAL */}
      {showModal && selectedSchedule && (
        <BoardingDroppingModal
          schedule={selectedSchedule}
          onClose={() => setShowModal(false)}
        />
      )}

      <div style={{ display: "flex", gap: "20px" }}>
        {/* FILTER */}
        {(!isSmallScreen || showFilter) && (
          <FilterCard
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedFilters={selectedFilters}
            handleFilterChange={handleFilterChange}
          />
        )}

        {/* BUS LIST */}
        <div style={{ flex: 1 }}>
          {loading ? (
            <p style={{ color: "#fff" }}>Loading buses...</p>
          ) : buses.length > 0 ? (
            buses.map((bus) => (
              <div
                key={bus.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "16px",
                  marginBottom: "16px",
                }}
              >
                <h4>
                  {bus.bus.busName} | {bus.bus.busType}
                </h4>

                <StarRating rating={4} />

                <p>
                  Departure: {bus.departureTime} | Arrival:{" "}
                  {bus.arrivalTime}
                </p>

                <p>Seats Available: {bus.bus.totalSeats}</p>
                <h3>₹{bus.ticketPrice}</h3>

                <button
                  onClick={() => handleSelectSeat(bus)}
                  style={{
                    backgroundColor: "#0d6efd",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "6px",
                  }}
                >
                  Select Seats
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: "#fff" }}>No buses found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectBus;
