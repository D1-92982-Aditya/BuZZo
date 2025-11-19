import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useBus } from "../BusContext/BusContext";
import BoardingDroppingModal from "../BoardingDroppingModal/Modal";

// ⭐ Star Rating Component
const StarRating = ({ rating, size = "16px" }) => (
  <div style={{ display: "flex", gap: "2px" }}>
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

// ✅ Filter Checkbox Component
const FilterCheckbox = ({ id, label, checked, onChange }) => (
  <div style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
    <input
      style={{
        width: "18px",
        height: "18px",
        marginRight: "10px",
        cursor: "pointer",
        accentColor: "#0d6efd",
      }}
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
    />
    <label
      style={{ fontSize: "14px", color: "#333", cursor: "pointer" }}
      htmlFor={id}
    >
      {label}
    </label>
  </div>
);

// ✅ Filter Card Component
const FilterCard = ({
  priceRange,
  setPriceRange,
  selectedFilters,
  handleFilterChange,
  onClose,
  isMobile,
}) => (
  <div
    style={{
      backgroundColor: "#fff",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      color: "#000",
      width: "100%",
      maxWidth: isMobile ? "100%" : "280px",
    }}
  >
    <h6 style={{ fontWeight: "600", marginBottom: "20px" }}>Filter by</h6>

    <div style={{ marginBottom: "20px" }}>
      <h6 style={{ fontWeight: "600", fontSize: "14px" }}>Departure Time</h6>
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
    </div>

    <div style={{ marginBottom: "20px" }}>
      <h6 style={{ fontWeight: "600", fontSize: "14px" }}>Bus Type</h6>
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
    </div>

    <div style={{ marginBottom: "20px" }}>
      <h6 style={{ fontWeight: "600", fontSize: "14px" }}>Price Range</h6>
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
      <p style={{ fontSize: "12px", color: "#555" }}>
        ₹{priceRange[0]} - ₹{priceRange[1]}
      </p>
    </div>
    {isMobile && (
      <button
        style={{
          backgroundColor: "#dc3545",
          color: "#fff",
          border: "none",
          padding: "10px",
          borderRadius: "6px",
          width: "100%",
          cursor: "pointer",
          marginTop: "10px",
        }}
        onClick={onClose}
      >
        Apply Filters
      </button>
    )}
  </div>
);

// ✅ Bus Card Component
const BusCard = ({ bus, onSelectSeats }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "16px",
        color: "#000",
        boxShadow: hover
          ? "0 4px 12px rgba(0,0,0,0.15)"
          : "0 2px 8px rgba(0,0,0,0.1)",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.2s",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h5 style={{ fontWeight: "600" }}>
        {bus.name} | {bus.type}
      </h5>
      <StarRating rating={bus.rating} />
      <p>{bus.time} | From: {bus.from}</p>
      <p>Seats Available: {bus.seats}</p>
      <h3>₹{bus.discountPrice}</h3>
      <button
        style={{
          backgroundColor: "#0d6efd",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        onClick={() => onSelectSeats(bus)}
      >
        Select Seats
      </button>
    </div>
  );
};

// ✅ Main Component
const SelectBus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSelectedBus } = useBus();
  const [showModal, setShowModal] = useState(false);
  const { fromCity, toCity,travelDate } = location.state || {};

  useEffect(() => {
    setShowModal(true);
  }, []);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showFilters, setShowFilters] = useState(false);
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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectSeats = (bus) => {
    setSelectedBus(bus); // ✅ store globally
    navigate("/seat");
  };

  const buses = [
    {
      id: 1,
      name: "QuickBus",
      type: "AC Sleeper",
      rating: 4,
      time: "07:00 AM",
      date:travelDate,
      from: fromCity,
      to:toCity,
      seats: 23,
      discountPrice: 900,
    },
    {
      id: 2,
      name: "Express Shuttle",
      type: "Non-AC Seater",
      rating: 4,
      time: "01:00 PM",
      from: fromCity,
      to:toCity,
      date:travelDate,
      seats: 15,
      discountPrice: 700,
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#2c3e50",
        minHeight: "100vh",
        color: "#fff",
        padding: "20px",
      }}
    >
      <div>
        <h2>Select Bus Page</h2>
        {showModal && <BoardingDroppingModal onClose={() => setShowModal(false)} />}
      </div>

      <h2>
        Buses from {fromCity || "Source"} to {toCity || "Destination"}
      </h2>

      {/* 🖥️ Desktop layout */}
      {!isMobile ? (
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          {/* Left side filter */}
          <div style={{ flex: "0 0 280px" }}>
            <FilterCard
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedFilters={selectedFilters}
              handleFilterChange={handleFilterChange}
              isMobile={false}
            />
          </div>

          {/* Right side bus cards */}
          <div style={{ flex: "1" }}>
            {buses.map((bus) => (
              <BusCard key={bus.id} bus={bus} onSelectSeats={handleSelectSeats} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* 📱 Mobile layout */}
          <button
            style={{
              backgroundColor: "#0d6efd",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: "6px",
              marginTop: "10px",
              cursor: "pointer",
            }}
            onClick={() => setShowFilters(true)}
          >
            Show Filters
          </button>

          {showFilters && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.6)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 999,
              }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  padding: "20px",
                  width: "90%",
                  maxHeight: "80%",
                  overflowY: "auto",
                }}
              >
                <FilterCard
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedFilters={selectedFilters}
                  handleFilterChange={handleFilterChange}
                  onClose={() => setShowFilters(false)}
                  isMobile={true}
                />
              </div>
            </div>
          )}

          <div style={{ marginTop: "20px" }}>
            {buses.map((bus) => (
              <BusCard key={bus.id} bus={bus} onSelectSeats={handleSelectSeats} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SelectBus;
