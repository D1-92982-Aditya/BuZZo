import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BoardingDroppingModal = ({ onClose }) => {
  const location = useLocation();
  const { fromCity, toCity } = location.state || {};

  const routePoints = {
    "Pune-Mumbai": {
      boarding: ["Shivaji Nagar", "Kothrud", "Wakad", "Swargate"],
      dropping: ["Bandra", "Andheri", "Borivali", "Thane"],
    },
    "Mumbai-Goa": {
      boarding: ["Borivali", "Dadar", "Bandra"],
      dropping: ["Mapusa", "Panaji", "Margao"],
    },
    "Delhi-Agra": {
      boarding: ["Kashmere Gate", "Sarojini Nagar"],
      dropping: ["Agra Fort", "Sikandra"],
    },
    "Chennai-Bangalore": {
      boarding: ["T. Nagar", "Guindy", "CMBT"],
      dropping: ["Silk Board", "Majestic", "Hebbal"],
    },
  };

  const routeKey = `${fromCity}-${toCity}`;
  const currentRoute = routePoints[routeKey] || { boarding: [], dropping: [] };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
        padding: "10px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "24px",
          width: "95%",
          maxWidth: "420px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
          overflowY: "auto",
          maxHeight: "85vh",
          animation: "fadeIn 0.25s ease-in-out",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: "22px",
            color: "#555",
            position: "absolute",
            top: "10px",
            right: "14px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        {/* Title */}
        <h3
          style={{
            color: "#1e40af",
            fontWeight: "600",
            textAlign: "center",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          🚌 Select Boarding & Dropping Points
        </h3>

        {/* Boarding Points */}
        <div style={{ marginBottom: "20px" }}>
          <h4
            style={{
              color: "#0f172a",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            🚏 Boarding Points
          </h4>
          {currentRoute.boarding.length > 0 ? (
            currentRoute.boarding.map((point, i) => (
              <label
                key={i}
                htmlFor={`boarding-${i}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "8px 10px",
                  marginBottom: "8px",
                  cursor: "pointer",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f8fafc")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fff")
                }
              >
                <input
                  type="checkbox"
                  id={`boarding-${i}`}
                  style={{
                    width: "18px",
                    height: "18px",
                    accentColor: "#2563eb",
                  }}
                />
                <span style={{ fontSize: "15px", color: "#334155" }}>{point}</span>
              </label>
            ))
          ) : (
            <p style={{ fontSize: "14px", color: "#6b7280" }}>No boarding points found.</p>
          )}
        </div>

        {/* Dropping Points */}
        <div style={{ marginBottom: "25px" }}>
          <h4
            style={{
              color: "#0f172a",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            📍 Dropping Points
          </h4>
          {currentRoute.dropping.length > 0 ? (
            currentRoute.dropping.map((point, i) => (
              <label
                key={i}
                htmlFor={`dropping-${i}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "8px 10px",
                  marginBottom: "8px",
                  cursor: "pointer",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f8fafc")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fff")
                }
              >
                <input
                  type="checkbox"
                  id={`dropping-${i}`}
                  style={{
                    width: "18px",
                    height: "18px",
                    accentColor: "#2563eb",
                  }}
                />
                <span style={{ fontSize: "15px", color: "#334155" }}>{point}</span>
              </label>
            ))
          ) : (
            <p style={{ fontSize: "14px", color: "#6b7280" }}>No dropping points found.</p>
          )}
        </div>

        {/* Save Button */}
        <button
          onClick={onClose}
          style={{
            width: "100%",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px 0",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "15px",
            cursor: "pointer",
            letterSpacing: "0.3px",
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default BoardingDroppingModal;
