import React, { useState } from 'react';

const Tickit = () => {
  const [showReward, setShowReward] = useState(true);

  return (
    <div style={{ 
      backgroundColor: '#e8e8e8', 
      minHeight: '100vh', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        maxWidth: '600px',
        margin: '0 auto 20px auto'
      }}>
        <h4 style={{ margin: 0, fontSize: '20px', fontWeight: '500' }}>Your Ticket 🔗</h4>
        <button 
          style={{ 
            background: 'none',
            border: '2px solid #dc3545',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            fontSize: '28px',
            color: '#dc3545',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ×
        </button>
      </div>

      {/* Main Ticket Card */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '20px', 
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '15px',
        position: 'relative',
        maxWidth: '600px',
        margin: '0 auto 15px auto'
      }}>
        {/* Left Edge Cut */}
        <div style={{
          position: 'absolute',
          left: '-10px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '20px',
          height: '20px',
          backgroundColor: '#e8e8e8',
          borderRadius: '50%'
        }}></div>
        
        {/* Right Edge Cut */}
        <div style={{
          position: 'absolute',
          right: '-10px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '20px',
          height: '20px',
          backgroundColor: '#e8e8e8',
          borderRadius: '50%'
        }}></div>
        {/* Bus Details - No Icon */}
        <div style={{ marginBottom: '20px' }}>
          <h5 style={{ fontWeight: 'bold', margin: '0 0 8px 0', fontSize: '18px' }}>
            Volvo Multi-Axle Semi-Sleeper (2+2)
          </h5>
          <p style={{ color: '#666', margin: '0 0 4px 0', fontSize: '14px' }}>AC, Seater</p>
          <p style={{ color: '#666', margin: '0 0 8px 0', fontSize: '14px' }}>
            Sat, 06 Sep | 11:45 PM
          </p>
          <p style={{ color: '#666', margin: '0', fontSize: '13px' }}>
            From: Mumbai Central → To: Pune Station
          </p>
        </div>

        {/* Support Button */}
        <button 
          style={{ 
            width: '100%',
            backgroundColor: '#f5f5f5',
            border: 'none',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#666',
            cursor: 'pointer',
            marginBottom: '24px'
          }}
        >
          Tap for support, details & more actions
        </button>

        {/* QR Code and Booking Details */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
          <div style={{ flexShrink: 0 }}>
            {/* QR Code */}
            <div style={{
              width: '120px',
              height: '120px',
              backgroundColor: 'white',
              border: '2px solid #000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px'
            }}>
              <svg width="110" height="110" viewBox="0 0 100 100">
                <rect x="10" y="10" width="15" height="15" fill="black"/>
                <rect x="30" y="10" width="5" height="5" fill="black"/>
                <rect x="40" y="10" width="10" height="10" fill="black"/>
                <rect x="55" y="10" width="5" height="5" fill="black"/>
                <rect x="65" y="10" width="5" height="5" fill="black"/>
                <rect x="75" y="10" width="15" height="15" fill="black"/>
                
                <rect x="10" y="15" width="5" height="5" fill="white"/>
                <rect x="20" y="15" width="5" height="5" fill="white"/>
                <rect x="75" y="15" width="5" height="5" fill="white"/>
                <rect x="85" y="15" width="5" height="5" fill="white"/>
                
                <rect x="10" y="30" width="5" height="10" fill="black"/>
                <rect x="20" y="30" width="10" height="5" fill="black"/>
                <rect x="35" y="35" width="30" height="30" fill="black"/>
                <rect x="70" y="30" width="5" height="10" fill="black"/>
                <rect x="80" y="35" width="10" height="5" fill="black"/>
                
                <rect x="10" y="75" width="15" height="15" fill="black"/>
                <rect x="30" y="80" width="10" height="5" fill="black"/>
                <rect x="50" y="75" width="5" height="15" fill="black"/>
                <rect x="60" y="80" width="10" height="5" fill="black"/>
                <rect x="75" y="75" width="15" height="15" fill="black"/>
                
                <rect x="10" y="80" width="5" height="5" fill="white"/>
                <rect x="20" y="80" width="5" height="5" fill="white"/>
                <rect x="75" y="80" width="5" height="5" fill="white"/>
                <rect x="85" y="80" width="5" height="5" fill="white"/>
              </svg>
            </div>
          </div>
          
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '14px', color: '#666', margin: '0 0 8px 0' }}>1 Seat(s)</p>
            <h3 style={{ fontWeight: 'bold', margin: '0 0 4px 0', fontSize: '32px' }}>SEAT 04</h3>
            <p style={{ color: '#999', margin: '0 0 12px 0', fontSize: '14px' }}>UPPER DECK</p>
            <p style={{ fontWeight: 'bold', margin: '0', fontSize: '13px' }}>
              BOOKING ID: T4AQEPD
            </p>
          </div>
        </div>

        {/* Cancellation Info */}
        <p style={{ 
          textAlign: 'center', 
          color: '#999', 
          margin: '20px 0', 
          fontSize: '12px',
          lineHeight: '1.5'
        }}>
          Cancellation unavailable: cut-off time of 20 minutes before journey has passed
        </p>

        {/* Total Amount */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          paddingTop: '20px',
          borderTop: '1px solid #eee'
        }}>
          <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Total Amount</span>
          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>₹ 402.48</span>
        </div>
      </div>

      {/* Rate Button */}
      <button style={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto 15px auto',
        display: 'block',
        backgroundColor: 'white',
        border: 'none',
        padding: '16px',
        borderRadius: '15px',
        fontSize: '16px',
        fontWeight: '500',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        cursor: 'pointer'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>⭐</span>
          <span>Rate Journey</span>
        </div>
      </button>

      {/* Reward Card */}
      {showReward && (
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          padding: '30px 25px',
          color: 'white',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h5 style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: '18px' }}>
            You've won 1 Reward!
          </h5>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: '15px',
            padding: '50px 40px',
            textAlign: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '72px', marginBottom: '15px' }}>🎁</div>
            <p style={{ margin: '0', fontSize: '18px', fontWeight: '500' }}>Tap to open</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tickit;