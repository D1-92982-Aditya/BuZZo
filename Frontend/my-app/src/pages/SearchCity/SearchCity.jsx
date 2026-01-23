import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const SearchCity = () => {
  const navigate = useNavigate();

  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [loading, setLoading] = useState(false);

  const cities = [
    "Pune",
    "Mumbai",
    "Nashik",
    "Delhi",
    "Jaipur",
    "Bengaluru",
    "Chennai",
    "Hyderabad",
    "Nagpur",
    "Bhopal",
    "Surat",
    "Ahmedabad",
    "Indore",
    "Goa",
  ];

  const getTodayDate = () => new Date().toISOString().split("T")[0];

  /* 🔍 SEARCH HANDLER */
  const handleSearch = async () => {
    if (!fromCity || !toCity || !travelDate) {
      alert("Please select all fields");
      return;
    }
    if (fromCity === toCity) {
      alert("From and To city cannot be same");
      return;
    }

    setLoading(true);
    try {
      const response = await API.get("/search", {
        params: { fromCity, toCity, journeyDate: travelDate },
      });

      const buses = response.data || [];
      if (buses.length === 0) {
        navigate("/no-bus");
        return;
      }

      navigate("/select-bus", {
        state: {
          fromCity,
          toCity,
          journeyDate: travelDate,
          buses,
          openBoardingModal: true, // ✅ REQUIRED FLAG
        },
      });
    } catch (err) {
      console.error("Search error:", err);
      alert("Server error while searching buses");
    } finally {
      setLoading(false);
    }
  };

  const swapCities = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  return (
    <div className="container">
      <div className="search-box">
        <h2 className="search-title">Search Buses</h2>

        <div className="search-form">
          {/* FROM */}
          <div className="form-group">
            <label>From</label>
            <select value={fromCity} onChange={(e) => setFromCity(e.target.value)}>
              <option value="">Select city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* SWAP */}
          <button type="button" className="swap-btn" onClick={swapCities}>
            ⇄
          </button>

          {/* TO */}
          <div className="form-group">
            <label>To</label>
            <select value={toCity} onChange={(e) => setToCity(e.target.value)}>
              <option value="">Select city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* DATE */}
          <div className="form-group">
            <label>Date of Journey</label>
            <input
              type="date"
              value={travelDate}
              min={getTodayDate()}
              onChange={(e) => setTravelDate(e.target.value)}
            />
          </div>

          {/* SEARCH BUTTON */}
          <button className="search-btn" onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "🔍 Search Buses"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchCity;
