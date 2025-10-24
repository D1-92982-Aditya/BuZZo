import React, { useState } from 'react';

const BusIllustration = () => (
  <svg 
    viewBox="0 0 400 300" 
    style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
    role="img"
    aria-label="No buses available illustration"
  >
    {/* Bus Body */}
    <rect x="50" y="100" width="300" height="120" rx="15" fill="#FFD700" stroke="#FFA500" strokeWidth="2"/>
    
    {/* Front Bumper */}
    <rect x="50" y="220" width="300" height="10" fill="#333"/>
    
    {/* Windows */}
    <rect x="70" y="120" width="45" height="35" rx="3" fill="#87CEEB"/>
    <rect x="130" y="120" width="45" height="35" rx="3" fill="#87CEEB"/>
    <rect x="190" y="120" width="45" height="35" rx="3" fill="#87CEEB"/>
    <rect x="250" y="120" width="45" height="35" rx="3" fill="#87CEEB"/>
    
    {/* Door */}
    <rect x="305" y="120" width="35" height="100" fill="#FF8C00"/>
    <circle cx="335" cy="170" r="4" fill="#333"/>
    
    {/* Headlight */}
    <circle cx="55" cy="140" r="8" fill="#FFF8DC"/>
    
    {/* Wheels */}
    <circle cx="100" cy="230" r="20" fill="#2c3e50"/>
    <circle cx="100" cy="230" r="15" fill="#34495e"/>
    <circle cx="300" cy="230" r="20" fill="#2c3e50"/>
    <circle cx="300" cy="230" r="15" fill="#34495e"/>
    
    {/* Prohibition Circle & Line */}
    <circle cx="200" cy="130" r="50" fill="none" stroke="#e74c3c" strokeWidth="6"/>
    <line x1="160" y1="170" x2="240" y2="90" stroke="#e74c3c" strokeWidth="6" strokeLinecap="round"/>
  </svg>
);

const Button = ({ variant = 'primary', onClick, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const styles = {
    primary: {
      backgroundColor: isHovered ? '#0056b3' : '#007bff',
      color: 'white',
      border: 'none',
    },
    secondary: {
      backgroundColor: isHovered ? '#e8e8e8' : '#f0f0f0',
      color: '#2c3e50',
      border: '2px solid #e0e0e0',
    }
  };

  const baseStyle = {
    padding: '12px 28px',
    borderRadius: '50px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    fontSize: '16px',
    ...styles[variant]
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={baseStyle}
      aria-label={children}
    >
      {children}
    </button>
  );
};

export default function NoBusAvailable({ onSearchAgain, onCheckOtherDates }) {
  const handleBookNow = () => {
    if (onSearchAgain) {
      onSearchAgain();
    } else {
      alert('Search again');
    }
  };

  const handleOtherDates = () => {
    if (onCheckOtherDates) {
      onCheckOtherDates();
    } else {
      alert('Other dates');
    }
  };

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <div 
          style={{ 
            backgroundColor: 'white',
            border: 'none', 
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            padding: '50px 40px'
          }}
        >
          {/* Illustration */}
          <div style={{
            height: '280px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '30px'
          }}>
            <BusIllustration />
          </div>

          {/* Content */}
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '700', 
            color: '#2c3e50', 
            marginBottom: '15px',
            textAlign: 'center',
            margin: '0 0 15px 0'
          }}>
            No Buses Available
          </h1>
          
          <p style={{ 
            fontSize: '16px', 
            color: '#7f8c8d', 
            marginBottom: '30px', 
            lineHeight: '1.6',
            textAlign: 'center',
            margin: '0 0 30px 0'
          }}>
            Sorry! All buses are currently booked. 
            Please try another date or time.
          </p>

          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Button variant="primary" onClick={handleBookNow}>
              Search Again
            </Button>
            
            <Button variant="secondary" onClick={handleOtherDates}>
              Other Dates
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}