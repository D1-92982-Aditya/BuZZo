import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Bus } from "lucide-react";

const Login = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
   const isAdminLogin = location.pathname === "/admin/login";
  // 🔊 Splash screen audio + timeout
  useEffect(() => {
    const audio = new Audio(
      "https://www.soundjay.com/transportation/sounds/bus-horn-01.mp3"
    ); // Public bus horn sound
    audio.volume = 0.4;
    audio.play().catch((err) => console.log("Audio autoplay blocked:", err));

    const timer = setTimeout(() => setShowSplash(false), 3000); // Hide after 3s
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async () => {
    try {
      const res = await fetch("http://3.21.240.29:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          email: email,
          password: password
        })
      });
  
      if (!res.ok) {
        throw new Error("Invalid credentials");
      }
  
      const data = await res.json();
  
      // ✅ store JWT
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
  
      navigate("/search");
    } catch (err) {
      alert("Login failed. Check email or password.");
    }
  };
  

  const goToSignup = () => navigate("/sign-up");
  const goToForgot = () => navigate("/forget");

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      />

      {/* ✅ Splash Screen */}
      {showSplash ? (
        <div className="splash-screen">
          <div className="splash-content">
            <Bus size={60} color="#007bff" strokeWidth={3} className="bus-icon" />
            <h1 className="splash-title">Buzzo</h1>
          </div>
        </div>
      ) : (
        <div className="login-container">
          <div className="background-image"></div>
          <div className="background-overlay"></div>

          <div>
            <div className="login-card">
              <div className="logo-section d-flex align-items-center justify-content-center gap-2 mb-3">
                <Bus size={36} color="#007bff" strokeWidth={2.5} />
                <h1 className="brand-name m-0">Buzzo</h1>
              </div>

              <h2 className="login-title">Login to your Account</h2>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control form-control-custom"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control form-control-custom"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="btn btn-login" onClick={handleLogin}>
                {isAdminLogin ? "Admin Login" : "Login"}
              </button>
            </div>
            {!isAdminLogin &&(
            <div className="footer-links">
              <label className="d-flex align-items-center" onClick={goToForgot}>
                <input type="checkbox" />
                <span>Forgot Password?</span>
              </label>

              <button className="d-flex align-items-center" onClick={goToSignup}>
                <span className="me-1">?</span>
                <span>Create an account</span>
              </button>
            </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
