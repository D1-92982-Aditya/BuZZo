import { NavLink } from "react-router-dom";
import "./AdminSidebar.css"

export default function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <h2>Buzzo Admin</h2>

      <NavLink to="/admin/login/dashboard">Dashboard</NavLink>
      <NavLink to="/admin/buses">Manage Buses</NavLink>
    </div>
  );
}
