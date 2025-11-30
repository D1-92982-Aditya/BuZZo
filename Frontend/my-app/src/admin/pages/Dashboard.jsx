import React, { useState /*, useEffect */ } from "react";
import "./Dashboard.css";
import AddBus from "./buses/AddBus";
import BusList from "./buses/BusList";
import { useNavigate } from "react-router-dom";
import BookingList from "./buses/BookingList";
// import api from "./buses/api"; // uncomment when backend is ready

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState("add-bus");
  const [buses, setBuses] = useState([]);
  const [editingBus, setEditingBus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate=useNavigate();

  const handleLogout=()=>{
    navigate("/admin/login");
  }

  /* ========= AXIOS VERSION (for future) ========= */

  // useEffect(() => {
  //   fetchBuses();
  // }, []);

  // const fetchBuses = async () => {
  //   try {
  //     setLoading(true);
  //     setError("");
  //     const res = await api.get("/buses");
  //     setBuses(res.data); // expect array of buses
  //   } catch (err) {
  //     console.error(err);
  //     setError("Failed to load buses.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const createBusOnServer = async (busData) => {
  //   const res = await api.post("/buses", busData);
  //   return res.data; // new bus with id
  // };

  // const updateBusOnServer = async (busData) => {
  //   const res = await api.put(`/buses/${busData.id}`, busData);
  //   return res.data;
  // };

  // const deleteBusOnServer = async (id) => {
  //   await api.delete(`/buses/${id}`);
  // };

  /* ========= CURRENT LOCAL STATE VERSION ========= */

  // ADD
  const handleAddBus = async (busData) => {
    try {
      setLoading(true);
      setError("");

      // when backend ready:
      // const savedBus = await createBusOnServer(busData);
      // setBuses((prev) => [...prev, savedBus]);

      // for now: local only
      const newBus = { id: Date.now(), ...busData };
      setBuses((prev) => [...prev, newBus]);

      setActiveMenu("buses-list");
      setEditingBus(null);
    } catch (err) {
      console.error(err);
      setError("Failed to add bus (front-end).");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE
  const handleUpdateBus = async (updatedBus) => {
    try {
      setLoading(true);
      setError("");

      // when backend ready:

      // const savedBus = await updateBusOnServer(updatedBus);
      // setBuses((prev) =>
      //   prev.map((b) => (b.id === savedBus.id ? savedBus : b))
      // );

      // for now:
      setBuses((prev) =>
        prev.map((b) => (b.id === updatedBus.id ? updatedBus : b))
      );

      setActiveMenu("buses-list");
      setEditingBus(null);
    } catch (err) {
      console.error(err);
      setError("Failed to update bus (front-end).");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDeleteBus = async (id) => {
    const ok = window.confirm("Delete this bus?");
    if (!ok) return;

    try {
      setLoading(true);
      setError("");

      // when backend ready:
      // await deleteBusOnServer(id);

      // local only:
      setBuses((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete bus (front-end).");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (bus) => {
    setEditingBus(bus);
    setActiveMenu("add-bus");
  };

  const renderContent = () => {
    if (activeMenu === "add-bus") {
      return (
        <AddBus
          mode={editingBus ? "edit" : "add"}
          initialData={editingBus}
          onSave={handleAddBus}
          onUpdate={handleUpdateBus}
          onCancelEdit={() => setEditingBus(null)}
        />
      );
    }

    if (activeMenu === "buses-list") {
      return (
        <BusList
          buses={buses}
          loading={loading}
          error={error}
          onEdit={handleEditClick}
          onDelete={handleDeleteBus}
          // onRefresh={fetchBuses} // backend
          onRefresh={() => {}} // dummy now
        />
      );
    }

    if (activeMenu === "bookings") {
      return <BookingList />; // 🔥 NEW
    }

    return <p>Select a menu option.</p>;
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
              className={
                activeMenu === "add-bus" ? "nav-link active" : "nav-link"
              }
              onClick={() => setActiveMenu("add-bus")}
            >
              {editingBus ? "Edit Bus" : "Add Bus"}
            </button>
          </li>
          <li>
            <button
              className={
                activeMenu === "buses-list" ? "nav-link active" : "nav-link"
              }
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
          <button className="logout-btn" onClick={handleLogout} >Logout</button>
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

