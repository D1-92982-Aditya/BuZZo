import React, { useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import busImage from '../../assets/bus.jpeg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/search');
    console.log('Login attempt:', { email, password });
  };
  const goToSignup = () => {
    console.log('Button clixke')
    navigate('/sign-up'); // <-- navigate to signup path
  };
  const goToForgot = () => {
    console.log('Button clix')
    navigate('/forget'); // <-- navigate to signup path
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
            {/* Logo and Brand */}
            <div className="logo-section">
              <svg className="bus-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth={2} />
                <circle cx="7" cy="16" r="1" fill="currentColor" />
                <circle cx="17" cy="16" r="1" fill="currentColor" />
              </svg>
              <h1 className="brand-name">Buzzo</h1>
            </div>

            <h2 className="login-title">LoginS to your Account</h2>

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
            <button 
              className="btn btn-login"
              onClick={handleLogin}
            >
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
}

export default Login;