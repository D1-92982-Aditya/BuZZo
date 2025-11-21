import React, { useState, useEffect } from 'react';
import { Bus, Users, Shield, Zap, Award, Heart } from 'lucide-react';
 {/* aditya waghmare */}


const About = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const developers = [
    { name: 'Aditya', role: 'Full Stack Developer', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { name: 'Rashmi', role: 'UI/UX Designer', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { name: 'Vaishnavi', role: 'Backend Developer', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { name: 'Aryavrat', role: 'Frontend Developer', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }
  ];

  const features = [
    { icon: <Bus size={40} />, title: 'Easy Booking', desc: 'Book your bus tickets in just a few clicks' },
    { icon: <Shield size={40} />, title: 'Secure Payments', desc: 'Your transactions are safe with us' },
    { icon: <Zap size={40} />, title: 'Instant Confirmation', desc: 'Get instant booking confirmations' },
    { icon: <Award size={40} />, title: 'Best Routes', desc: 'Access to premium bus routes' }
  ];

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      
      <style>{`
        * {
          cursor: none !important;
        }
        
        .custom-cursor {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          transition: transform 0.1s ease;
        }
        
        .cursor-circle {
          width: 24px;
          height: 24px;
          border: 2px solid white;
          border-radius: 50%;
        }
        
        .bg-gradient-main {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%, #f093fb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        
        .team-card {
          transition: all 0.3s ease;
        }
        
        .team-card:hover {
          transform: translateY(-15px) scale(1.05);
        }
        
        .stat-card {
          transition: all 0.3s ease;
        }
        
        .stat-card:hover {
          transform: scale(1.1);
        }
        
        .floating {
          animation: floating 3s ease-in-out infinite;
        }
        
        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .pulse-animation {
          animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .bg-glass {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #fce7f3 50%, #ddd6fe 100%)', position: 'relative', overflow: 'hidden' }}>
        
        {/* Custom Cursor */}
        <div
          className="custom-cursor"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`
          }}
        >
          <div className="cursor-circle"></div>
        </div>

        {/* Animated Background Circles */}
        <div style={{ position: 'absolute', top: '80px', left: '40px', width: '300px', height: '300px', background: 'rgba(167, 139, 250, 0.3)', borderRadius: '50%', filter: 'blur(80px)', animation: 'pulse 4s ease-in-out infinite' }}></div>
        <div style={{ position: 'absolute', top: '160px', right: '40px', width: '300px', height: '300px', background: 'rgba(244, 114, 182, 0.3)', borderRadius: '50%', filter: 'blur(80px)', animation: 'pulse 4s ease-in-out infinite 1s' }}></div>

        <div className="container py-5">
          {/* Hero Section */}
          <div className="text-center mb-5 floating">
            <div className="d-inline-block mb-4">
              <div className="d-flex align-items-center justify-content-center bg-gradient-main rounded-4 shadow-lg" style={{ width: '80px', height: '80px' }}>
                <Bus size={48} color="white" />
              </div>
            </div>
            <h1 className="display-1 fw-bold mb-4 gradient-text">Buzzo</h1>
            <p className="lead fs-3 text-secondary mx-auto" style={{ maxWidth: '800px' }}>
              Your trusted companion for seamless bus travel. We're revolutionizing the way you book and travel.
            </p>
          </div>

          {/* Features Section */}
          <div className="row g-4 mb-5">
            {features.map((feature, index) => (
              <div className="col-12 col-sm-6 col-lg-3" key={index}>
                <div 
                  className="card h-100 border-0 shadow bg-glass card-hover"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="card-body text-center p-4">
                    <div className="text-primary mb-3">{feature.icon}</div>
                    <h5 className="card-title fw-bold mb-3">{feature.title}</h5>
                    <p className="card-text text-muted">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mission Section */}
          <div className="card border-0 shadow-lg mb-5 bg-glass card-hover">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <Heart size={48} className="text-danger pulse-animation" />
              </div>
              <h2 className="text-center fw-bold mb-4 gradient-text display-5">Our Mission</h2>
              <p className="lead text-center text-secondary" style={{ maxWidth: '900px', margin: '0 auto' }}>
                At Buzzo, we believe travel should be simple, safe, and enjoyable. We're committed to providing 
                the best bus booking experience with cutting-edge technology, transparent pricing, and 24/7 customer support. 
                Our platform connects thousands of travelers with reliable bus operators across the country.
              </p>
            </div>
          </div>

          {/* Developers Section */}
          <div className="mb-5">
            <div className="d-flex align-items-center justify-content-center mb-5">
              <Users size={40} className="text-primary me-3" />
              <h2 className="fw-bold gradient-text display-5 mb-0">Meet Our Team</h2>
            </div>
            <div className="row g-4">
              {developers.map((dev, index) => (
                <div className="col-12 col-sm-6 col-lg-3" key={index}>
                  <div 
                    className="card border-0 shadow-lg bg-glass team-card"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <div className="card-body text-center p-4">
                      <div 
                        className="mx-auto mb-3 d-flex align-items-center justify-content-center text-white fw-bold rounded-circle shadow-lg"
                        style={{ 
                          width: '100px', 
                          height: '100px', 
                          background: dev.color,
                          fontSize: '2rem'
                        }}
                      >
                        {dev.name.charAt(0)}
                      </div>
                      <h4 className="fw-bold mb-2">{dev.name}</h4>
                      <p className="text-primary fw-semibold mb-0">{dev.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="row g-4">
            {[
              { number: '50K+', label: 'Happy Travelers' },
              { number: '500+', label: 'Bus Routes' },
              { number: '100+', label: 'Partner Operators' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <div className="col-6 col-md-3" key={index}>
                <div 
                  className="card border-0 shadow-lg text-white text-center stat-card"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="card-body p-4">
                    <h2 className="display-4 fw-bold mb-2">{stat.number}</h2>
                    <p className="mb-0 opacity-75">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;