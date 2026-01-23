import React, { useEffect } from "react";

const BoardingDroppingModal = ({ onClose, schedule }) => {
  if (!schedule) return null;

  const { boardingPoints = [], droppingPoints = [] } = schedule;

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
          position: "relative",
        }}
      >
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

        <h3
          style={{
            color: "#1e40af",
            fontWeight: "600",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          🚌 Select Boarding & Dropping Points
        </h3>

        {/* Boarding Points */}
        <div style={{ marginBottom: "20px" }}>
          <h4 style={{ marginBottom: "10px" }}>🚏 Boarding Points</h4>
          {boardingPoints.length > 0 ? (
            boardingPoints.map((point) => (
              <label
                key={point.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "8px 10px",
                  marginBottom: "8px",
                }}
              >
                <input type="checkbox" />
                <span>
                  {point.locationName} ({point.boardingTime})
                </span>
              </label>
            ))
          ) : (
            <p>No boarding points found.</p>
          )}
        </div>

        {/* Dropping Points */}
        <div style={{ marginBottom: "25px" }}>
          <h4 style={{ marginBottom: "10px" }}>📍 Dropping Points</h4>
          {droppingPoints.length > 0 ? (
            droppingPoints.map((point) => (
              <label
                key={point.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "8px 10px",
                  marginBottom: "8px",
                }}
              >
                <input type="checkbox" />
                <span>
                  {point.locationName} ({point.droppingTime})
                </span>
              </label>
            ))
          ) : (
            <p>No dropping points found.</p>
          )}
        </div>

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
            cursor: "pointer",
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default BoardingDroppingModal;
