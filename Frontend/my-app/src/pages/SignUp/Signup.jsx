import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/');
  };

  // ✅ CONNECTED TO BACKEND
  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }
  
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      const res = await fetch("http://3.21.240.29:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          password: password
        })
      });
  
      // 🔥 HTTP safety
      if (!res.ok) {
        alert("Signup failed. Server error.");
        return;
      }
  
      let data;
      try {
        data = await res.json();
      } catch (err) {
        // 🔥 Backend responded but JSON not returned (Render issue)
        alert("Account created successfully! Please login.");
        navigate("/");
        return;
      }
  
      if (!data.success) {
        alert(data.message);
        return;
      }
  
      alert("Account created successfully! Please login.");
      navigate("/");
  
    } catch (error) {
      alert("Signup failed. Try again.");
    }
  };
  

  return (
    <>
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" 
        crossOrigin="anonymous"
      />

      <div className="signup-container">
        <div 
          className="background-image"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069')"
          }}
        ></div>
        <div className="background-overlay"></div>

        <div>
          <div className="signup-card">
            <div className="logo-section">
              <svg className="bus-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth={2} />
                <circle cx="7" cy="16" r="1" fill="currentColor" />
                <circle cx="17" cy="16" r="1" fill="currentColor" />
              </svg>
              <h1 className="brand-name">Buzzo</h1>
            </div>

            <h2 className="login-title">Create Your Account</h2>

            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-custom"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

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

            <div className="mb-3">
              <input
                type="password"
                className="form-control form-control-custom"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button 
              className="btn btn-login"
              onClick={handleSignup}
            >
              Create Account
            </button>

            <div className="footer-links">
              <span>Already have an account?</span>
              <button className="back-login-btn" onClick={goToLogin}>
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
