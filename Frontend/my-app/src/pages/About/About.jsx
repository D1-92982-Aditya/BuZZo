import React from "react";
import { Bus, Shield, Zap, Users } from "lucide-react";

const About = () => {
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <div className="container py-5">
        {/* Title Section */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-md-8">
            <Bus size={50} className="text-primary mb-3" />
            <h1 className="fw-bold mb-3">About Buzzo</h1>
            <p className="text-muted">
              Buzzo is a simple and reliable bus ticket booking platform
              designed to make travel smooth, secure, and stress-free.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-md-10">
            <div className="row">
              <div className="col-6 col-md-3 mb-4">
                <Bus size={32} className="text-primary mb-2" />
                <h6 className="fw-semibold">Easy Booking</h6>
                <p className="text-muted small">
                  Book tickets quickly with a simple interface.
                </p>
              </div>

              <div className="col-6 col-md-3 mb-4">
                <Shield size={32} className="text-primary mb-2" />
                <h6 className="fw-semibold">Secure Payments</h6>
                <p className="text-muted small">
                  Your transactions are safe and encrypted.
                </p>
              </div>

              <div className="col-6 col-md-3 mb-4">
                <Zap size={32} className="text-primary mb-2" />
                <h6 className="fw-semibold">Fast Confirmation</h6>
                <p className="text-muted small">
                  Get instant booking confirmation.
                </p>
              </div>

              <div className="col-6 col-md-3 mb-4">
                <Users size={32} className="text-primary mb-2" />
                <h6 className="fw-semibold">Trusted Platform</h6>
                <p className="text-muted small">
                  Used by thousands of travelers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-md-8">
            <h3 className="fw-bold mb-3">Our Mission</h3>
            <p className="text-muted">
              Our mission is to simplify bus travel by connecting passengers
              with trusted operators through a fast, transparent, and
              user-friendly booking experience.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="row justify-content-center text-center mb-4">
          <div className="col-md-8">
            <h3 className="fw-bold mb-4">Our Team</h3>
          </div>
        </div>

        <div className="row justify-content-center text-center">
          {[
            { name: "Aditya", role: "Full Stack Developer" },
            { name: "Rashmi", role: "UI/UX Designer" },
            { name: "Vaishnavi", role: "Backend Developer" },
            { name: "Aryavrat", role: "Frontend Developer" }
          ].map((member, index) => (
            <div className="col-6 col-md-3 mb-4" key={index}>
              <div className="border rounded p-3 h-100">
                <div
                  className="mx-auto mb-2 rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                  style={{ width: "55px", height: "55px" }}
                >
                  {member.name.charAt(0)}
                </div>
                <h6 className="fw-semibold mb-1">{member.name}</h6>
                <small className="text-muted">{member.role}</small>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="row justify-content-center text-center mt-5">
          <div className="col-md-8">
            <p className="text-muted small mb-0">
              © {new Date().getFullYear()} Buzzo. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
