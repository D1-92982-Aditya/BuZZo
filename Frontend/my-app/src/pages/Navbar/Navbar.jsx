import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { LogOut, Bus } from "lucide-react"; // icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); // example
    console.log("User logged out");
   navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        {/* Brand with Bus Logo */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <Bus size={28} className="me-2 text-primary" />
          Buzzo
        </Link>

        {/* Toggler (Hamburger) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav items">
            <li className="nav-item">
              <Link className="nav-link" to="/search">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="manageBookings"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Manage Bookings
              </Link>
              <ul className="dropdown-menu" aria-labelledby="manageBookings">
                <li><Link className="dropdown-item" to="/bookings">My Bookings</Link></li>
                <li><Link className="dropdown-item" to="/reschedule">Reschedule</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>

          {/* Logout Logo (icon only) */}
          <div className="LogoutIcon ms-auto">
            <LogOut
              size={26}
              className="text-danger logout-icon"
              onClick={handleLogout}
              role="button"
              title="Logout"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


