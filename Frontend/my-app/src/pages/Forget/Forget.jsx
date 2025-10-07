import React, { useState } from 'react';
import './Forget.css';

const Forget = () => {
  const [step, setStep] = useState(1); // Step 1 = email/name, Step 2 = OTP
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);

  // Handle submit of name/email
  const handleSubmitInfo = (e) => {
    e.preventDefault();
    if (!fullName || !email) {
      alert('Please fill both fields');
      return;
    }
    // Normally you would send OTP here
    setStep(2);
  };

  // Handle OTP input
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = () => {
    if (otp.some((digit) => digit === '')) {
      alert('Please enter all 4 digits');
      return;
    }
    const enteredOtp = otp.join('');
    console.log('Entered OTP:', enteredOtp);
    alert('OTP Verified!');
    // Reset form or navigate back to login
    setStep(1);
    setFullName('');
    setEmail('');
    setOtp(['', '', '', '']);
  };

  return (
    <div className="forget-container">
      <div 
        className="background-image"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069')" 
        }}
      ></div>
      <div className="background-overlay"></div>

      <div className="forget-card">
        <h2 className="forget-title">
          {step === 1 ? 'Forgot Password' : 'Verify OTP'}
        </h2>

        {step === 1 && (
          <form onSubmit={handleSubmitInfo}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="form-control form-control-custom"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control form-control-custom"
              />
            </div>
            <button type="submit" className="btn btn-login">
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="otp-section">
            <p>Enter the 4-digit OTP sent to your email</p>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="otp-input"
                />
              ))}
            </div>
            <button 
              className="btn btn-login verify-btn"
              onClick={handleVerifyOtp}
            >
              Verify
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forget;
