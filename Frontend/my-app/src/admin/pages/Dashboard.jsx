import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AddBus from "./buses/AddBus";
import BusList from "./buses/BusList";
import BookingList from "./buses/BookingList";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("add-bus");
  const [editingBus, setEditingBus] = useState(null);

  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================== LOGOUT ================== */
  const handleLogout = () => {
    navigate("/admin/login");
  };

  /* ================== FETCH BUSES ================== */
  const fetchBuses = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/bus/scheduled");

      // Normalize buses to always be an array
      const busesArray = Array.isArray(res.data)
        ? res.data
        : res.data?.scheduledBuses || [];

      setBuses(busesArray);
    } catch (err) {
      console.error(err);
      setError("Failed to load buses from server.");
      setBuses([]); // ensure buses is always an array
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeMenu === "buses-list") fetchBuses();
  }, [activeMenu]);

  /* ================== ADD BUS ================== */
  const handleAddBus = async (busData) => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post("/api/bus/full", busData);
      const newBus = res.data;
      setBuses((prev) => [...prev, newBus]);

      setActiveMenu("buses-list");
      setEditingBus(null);
    } catch (err) {
      console.error(err);
      setError("Failed to add bus.");
    } finally {
      setLoading(false);
    }
  };

  /* ================== UPDATE BUS ================== */
  const handleUpdateBus = async (busData) => {
    try {
      setLoading(true);
      setError("");

      await axios.put(`/api/bus/${busData.busId}`, busData);
      setBuses((prev) =>
        prev.map((b) => (b.busId === busData.busId ? { ...b, ...busData } : b))
      );

      setActiveMenu("buses-list");
      setEditingBus(null);
    } catch (err) {
      console.error(err);
      setError("Failed to update bus.");
    } finally {
      setLoading(false);
    }
  };

  /* ================== DELETE BUS ================== */
  const handleDeleteBus = async (busId) => {
    if (!window.confirm("Delete this bus?")) return;
    try {
      setLoading(true);
      setError("");

      await axios.delete(`/api/bus/${busId}`);
      setBuses((prev) => prev.filter((b) => b.busId !== busId));
    } catch (err) {
      console.error(err);
      setError("Failed to delete bus.");
    } finally {
      setLoading(false);
    }
  };

  /* ================== EDIT CLICK ================== */
  const handleEditClick = (bus) => {
    setEditingBus(bus);
    setActiveMenu("add-bus");
  };

  /* ================== RENDER CONTENT ================== */
  const renderContent = () => {
    switch (activeMenu) {
      case "add-bus":
        return (
          <AddBus
            mode={editingBus ? "edit" : "add"}
            initialData={editingBus}
            onSave={handleAddBus}
            onUpdate={handleUpdateBus}
            onCancelEdit={() => setEditingBus(null)}
          />
        );

      case "buses-list":
        return (
          <BusList
            buses={buses}
            loading={loading}
            error={error}
            onEdit={handleEditClick}
            onDelete={handleDeleteBus}
            onRefresh={fetchBuses}
          />
        );

      case "bookings":
        return <BookingList />;

      default:
        return <p>Select a menu option.</p>;
    }
  };

  return (
    <div className="admin-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-circle"></div>
          <span>Buzzo</span>
        </div>
        <ul className="nav">
          <li>
            <button
              className={activeMenu === "add-bus" ? "nav-link active" : "nav-link"}
              onClick={() => setActiveMenu("add-bus")}
            >
              {editingBus ? "Edit Bus" : "Add Bus"}
            </button>
          </li>
          <li>
            <button
              className={activeMenu === "buses-list" ? "nav-link active" : "nav-link"}
              onClick={() => setActiveMenu("buses-list")}
            >
              Buses List
            </button>
          </li>
          <li>
            <button
              className={activeMenu === "bookings" ? "nav-link active" : "nav-link"}
              onClick={() => setActiveMenu("bookings")}
            >
              Bookings
            </button>
          </li>
        </ul>
      </aside>

      {/* Main */}
      <div className="main">
        <header className="topbar">
          <span>Hi! Admin</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </header>
        <main className="content">
          {error && (
            <div
              style={{
                marginBottom: "10px",
                padding: "8px 12px",
                borderRadius: "6px",
                background: "#fee2e2",
                color: "#b91c1c",
                fontSize: "13px",
              }}
            >
              {error}
            </div>
          )}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
