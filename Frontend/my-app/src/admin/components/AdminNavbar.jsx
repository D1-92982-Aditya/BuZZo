import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  return (
    <div className="admin-navbar">
      <span>Admin Panel</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
