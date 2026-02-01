import React, { useState, useEffect } from "react";
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
        setPriceRange([priceRange[0], parseInt(e.target.value)])
      }
      style={{ width: "100%", accentColor: "#0d6efd" }}
    />
    <p style={{ fontSize: "12px" }}>
      Up to ₹{priceRange[1]}
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
  const [filteredBuses, setFilteredBuses] = useState([]);
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

  const handleFilterChange = (filter) => {
    setSelectedFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  /* 🔹 FETCH BUSES */
  useEffect(() => {
    if (!fromCity || !toCity || !journeyDate) return;

    const fetchBuses = async () => {
      setLoading(true);
      try {
        const res = await API.get("/search", {
          params: { fromCity, toCity, journeyDate },
        });

        const data = res.data || [];
        setBuses(data);
        setFilteredBuses(data);

        if (data.length > 0) {
          setSelectedSchedule(data[0]);
          setShowModal(true);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, [fromCity, toCity, journeyDate]);

  /* 🔹 APPLY FILTERS */
  useEffect(() => {
    const isAnyFilterApplied =
      selectedFilters.morning ||
      selectedFilters.evening ||
      selectedFilters.night ||
      selectedFilters.ac ||
      selectedFilters.nonac ||
      priceRange[1] !== 2000;

    if (!isAnyFilterApplied) {
      setFilteredBuses(buses);
      return;
    }

    let result = [...buses];

    // 💰 PRICE FILTER (MAX ONLY — FIXED)
    if (priceRange[1] !== 2000) {
      result = result.filter(
        (bus) => bus.ticketPrice <= priceRange[1]
      );
    }

    // 🕒 TIME FILTER
    if (
      selectedFilters.morning ||
      selectedFilters.evening ||
      selectedFilters.night
    ) {
      result = result.filter((bus) => {
        const hour = parseInt(bus.departureTime.split(":")[0]);
        if (selectedFilters.morning && hour >= 5 && hour < 11) return true;
        if (selectedFilters.evening && hour >= 11 && hour < 19) return true;
        if (selectedFilters.night && (hour >= 19 || hour < 5)) return true;
        return false;
      });
    }

    // 🚌 BUS TYPE FILTER
    if (selectedFilters.ac || selectedFilters.nonac) {
      result = result.filter((bus) => {
        const type = bus.bus.busType.toLowerCase();
        if (selectedFilters.ac && type.includes("ac")) return true;
        if (selectedFilters.nonac && !type.includes("ac")) return true;
        return false;
      });
    }

    setFilteredBuses(result);
  }, [buses, priceRange, selectedFilters]);

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
    <div style={{ backgroundColor: "#2c3e50", minHeight: "100vh", padding: "20px" }}>
      <h2 style={{ color: "#fff" }}>
        Buses from {fromCity} to {toCity}
      </h2>

      {showModal && selectedSchedule && (
        <BoardingDroppingModal
          schedule={selectedSchedule}
          onClose={() => setShowModal(false)}
        />
      )}

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <FilterCard
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
        />

        <div style={{ flex: 1 }}>
          {loading ? (
            <p style={{ color: "#fff" }}>Loading buses...</p>
          ) : filteredBuses.length > 0 ? (
            filteredBuses.map((bus) => (
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
                  Departure: {bus.departureTime} | Arrival: {bus.arrivalTime}
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
