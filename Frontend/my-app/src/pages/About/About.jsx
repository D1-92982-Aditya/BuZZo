import React from "react";
import { Bus, Shield, Zap, Users } from "lucide-react";

const About = () => {
  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <Bus size={48} color="#2563eb" />
        <h1 style={styles.title}>About Buzzo</h1>
        <p style={styles.subtitle}>
          A simple and reliable bus ticket booking platform built for smooth,
          secure, and stress-free travel.
        </p>
      </div>

      {/* Features */}
      <div style={styles.features}>
        <Feature
          icon={<Bus size={28} />}
          title="Easy Booking"
          desc="Book tickets quickly with a clean interface."
        />
        <Feature
          icon={<Shield size={28} />}
          title="Secure Payments"
          desc="Encrypted and safe transactions."
        />
        <Feature
          icon={<Zap size={28} />}
          title="Fast Confirmation"
          desc="Instant booking confirmation."
        />
        <Feature
          icon={<Users size={28} />}
          title="Trusted Platform"
          desc="Used by thousands of travelers."
        />
      </div>

      {/* Mission */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Mission</h2>
        <p style={styles.text}>
          To simplify bus travel by connecting passengers with trusted operators
          through a fast, transparent, and user-friendly booking experience.
        </p>
      </div>

      {/* Team */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Team</h2>
        <div style={styles.team}>
          {[
            { name: "Aditya", role: "Full Stack Developer" },
            { name: "Rashmi", role: "UI/UX Designer" },
            { name: "Vaishnavi", role: "Backend Developer" },
            { name: "Aryavrat", role: "Frontend Developer" }
          ].map((member, i) => (
            <div key={i} style={styles.card}>
              <div style={styles.avatar}>{member.name[0]}</div>
              <div>
                <h4 style={styles.name}>{member.name}</h4>
                <p style={styles.role}>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        © {new Date().getFullYear()} Buzzo. All rights reserved.
      </footer>
    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div style={styles.featureCard}>
    <div style={styles.featureIcon}>{icon}</div>
    <h4 style={styles.featureTitle}>{title}</h4>
    <p style={styles.featureDesc}>{desc}</p>
  </div>
);

const styles = {
  page: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "system-ui, sans-serif",
    color: "#1f2937",
    textAlign: "center"
  },

  header: {
    marginBottom: "40px"
  },

  title: {
    fontSize: "2.2rem",
    fontWeight: 700,
    margin: "10px 0"
  },

  subtitle: {
    fontSize: "1rem",
    color: "#6b7280",
    maxWidth: "600px",
    margin: "0 auto"
  },

  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "50px"
  },

  featureCard: {
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    background: "#ffffff"
  },

  featureIcon: {
    color: "#2563eb",
    marginBottom: "10px"
  },

  featureTitle: {
    fontSize: "1rem",
    fontWeight: 600
  },

  featureDesc: {
    fontSize: "0.9rem",
    color: "#6b7280"
  },

  section: {
    marginBottom: "50px"
  },

  sectionTitle: {
    fontSize: "1.6rem",
    fontWeight: 600,
    marginBottom: "10px"
  },

  text: {
    maxWidth: "650px",
    margin: "0 auto",
    fontSize: "0.95rem",
    color: "#4b5563"
  },

  team: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "25px"
  },

  card: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    background: "#ffffff",
    textAlign: "left"
  },

  avatar: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600
  },

  name: {
    margin: 0,
    fontSize: "1rem"
  },

  role: {
    margin: 0,
    fontSize: "0.85rem",
    color: "#6b7280"
  },

  footer: {
    fontSize: "0.8rem",
    color: "#9ca3af",
    marginTop: "40px"
  }
};

export default About;
