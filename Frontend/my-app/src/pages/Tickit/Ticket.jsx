import React, { useRef, useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import axios from "axios";
import { useBus } from "../BusContext/BusContext"; // ✅ import global context

const Ticket = () => {
  const ticketRef = useRef();
  const [cloudURL, setCloudURL] = useState("");
  const [showReward, setShowReward] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const [loading, setLoading] = useState(false);

  const { selectedBus, selectedSeats } = useBus(); // ✅ access global state

  if (!selectedBus) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h3>No Bus Selected</h3>
        <p>Please go back and select a bus to continue.</p>
      </div>
    );
  }

  const bookingId = `T${Math.random()
    .toString(36)
    .substring(2, 7)
    .toUpperCase()}`;

  const ticketData = {
    busName: selectedBus.name,
    type: selectedBus.type,
    date: selectedBus.time,
    from: selectedBus.from,
    to: "Pune Station",
    seat: selectedSeats?.join(", ") || "04",
    deck: "UPPER DECK",
    total: `₹${selectedBus.discountPrice}`,
  };

  const uploadTicketToCloudinary = async () => {
    if (cloudURL) return;

    setLoading(true);
    const qrElement = ticketRef.current.querySelector("canvas");
    if (qrElement) qrElement.style.display = "none";

    const canvas = await html2canvas(ticketRef.current, {
      useCORS: true,
      scale: 2,
    });

    if (qrElement) qrElement.style.display = "block";

    const imgData = canvas.toDataURL("image/png").split(",")[1];
    const formData = new FormData();
    formData.append("file", `data:image/png;base64,${imgData}`);
    formData.append("upload_preset", "unsigned_preset");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dt6eeo5u2/image/upload",
        formData
      );
      setCloudURL(res.data.secure_url);
      setShowQR(true);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      uploadTicketToCloudinary();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const qrData = cloudURL
    ? cloudURL
    : `http://192.168.0.114:5173/ticketDetails/${bookingId}`;

  return (
    <div
      style={{
        backgroundColor: "#e8e8e8",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <h4 style={{ margin: 0, fontSize: "20px", fontWeight: "500" }}>
          Your Ticket 🎟️
        </h4>
      </div>

      {/* Ticket Card */}
      <div
        ref={ticketRef}
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          maxWidth: "600px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Side Cuts */}
        <div
          style={{
            position: "absolute",
            left: "-10px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "20px",
            height: "20px",
            backgroundColor: "#e8e8e8",
            borderRadius: "50%",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            right: "-10px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "20px",
            height: "20px",
            backgroundColor: "#e8e8e8",
            borderRadius: "50%",
          }}
        ></div>

        {/* Bus Details */}
        <div style={{ marginBottom: "15px" }}>
          <h5
            style={{ fontWeight: "bold", margin: "0 0 8px 0", fontSize: "18px" }}
          >
            {ticketData.busName}
          </h5>
          <p style={{ color: "#666", margin: "0 0 4px 0", fontSize: "14px" }}>
            {ticketData.type}
          </p>
          <p style={{ color: "#666", margin: "0 0 8px 0", fontSize: "14px" }}>
            {ticketData.date}
          </p>
        </div>

        {/* Passenger + Route Info */}
        <div style={{ marginBottom: "15px" }}>
          <p style={{ margin: "4px 0", fontSize: "15px", fontWeight: "bold" }}>
            Passenger: {ticketData.passengerName || "Vaishnavi"}
          </p>
          <p style={{ margin: "4px 0", fontSize: "14px" }}>
            Booking ID: <strong>{bookingId}</strong>
          </p>
          <p style={{ margin: "4px 0", fontSize: "14px" }}>
            From: <strong>{ticketData.from}</strong> → To:{" "}
            <strong>{ticketData.to}</strong>
          </p>
          <p style={{ margin: "4px 0", fontSize: "14px" }}>
            Seat: <strong>{ticketData.seat}</strong> ({ticketData.deck})
          </p>
        </div>

        {/* ✅ QR Code or Loader inside card */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
            minHeight: "140px",
          }}
        >
          {loading ? (
            <div
              style={{
                width: "60px",
                height: "60px",
                border: "6px solid #ccc",
                borderTop: "6px solid #28a745",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
          ) : (
            showQR && (
              <QRCodeCanvas
                value={qrData}
                size={140}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin={true}
                style={{
                  borderRadius: "8px",
                  border: "2px solid #000",
                  padding: "5px",
                }}
              />
            )
          )}
        </div>

        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>

        {/* Total */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "20px",
            borderTop: "1px solid #eee",
            marginTop: "15px",
          }}
        >
          <span style={{ fontWeight: "bold", fontSize: "16px" }}>
            Total Amount
          </span>
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            {ticketData.total}
          </span>
        </div>
      </div>

      {/* Reward Section */}
      {showReward && (
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "20px",
            padding: "30px 25px",
            color: "white",
            maxWidth: "600px",
            margin: "20px auto 0 auto",
          }}
        >
          <h5 style={{ fontWeight: "bold", marginBottom: "20px", fontSize: "18px" }}>
            You've won 1 Reward!
          </h5>
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              borderRadius: "15px",
              padding: "50px 40px",
              textAlign: "center",
              cursor: "pointer",
              backdropFilter: "blur(10px)",
            }}
          >
            <div style={{ fontSize: "72px", marginBottom: "15px" }}>🎁</div>
            <p style={{ margin: "0", fontSize: "18px", fontWeight: "500" }}>
              Tap to open
            </p>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default Ticket;
