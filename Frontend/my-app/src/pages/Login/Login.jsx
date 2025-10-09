import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { Bus } from 'lucide-react'; // ✅ Import Lucide Bus icon

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/search');
    console.log('Login attempt:', { email, password });
  };

  const goToSignup = () => {
    console.log('Button clicked');
    navigate('/sign-up');
  };

  const goToForgot = () => {
    console.log('Button clicked');
    navigate('/forget');
  };

  return (
    <>
      {/* Bootstrap CDN */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      />

      <div className="login-container">
        <div className="background-image"></div>
        <div className="background-overlay"></div>

        <div>
          <div className="login-card">
            {/* ✅ Logo and Brand using Lucide Bus icon */}
            <div className="logo-section d-flex align-items-center justify-content-center gap-2 mb-3">
              <Bus size={36} color="#007bff" strokeWidth={2.5} /> {/* Lucide Bus icon */}
              <h1 className="brand-name m-0">Buzzo</h1>
            </div>

            <h2 className="login-title">Login to your Account</h2>

            {/* Email Input */}
            <div className="mb-3">
              <input
                type="email"
                className="form-control form-control-custom"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <input
                type="password"
                className="form-control form-control-custom"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Login Button */}
            <button className="btn btn-login" onClick={handleLogin}>
              Login
            </button>
          </div>

          {/* Footer Links */}
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
        </div>
      </div>
    </>
  );
};

export default Login;
