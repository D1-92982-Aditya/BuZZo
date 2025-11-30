import React, { useState } from "react";
import { motion } from "framer-motion";
import busImage from "../../assets/buzzo.jpg";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return alert("Name is required!");
    if (!formData.email.trim()) return alert("Email is required!");

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      await res.json();
      alert("Form submitted successfully!");

      setFormData({ name: "", email: "", message: "" });

    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="contact-page" style={{ backgroundImage: `url(${busImage})` }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        className="contact-wrapper"
      >
        <h1 className="contact-title">Contact Us</h1>

        <div className="contact-card">
          <form onSubmit={handleSubmit} className="contact-form">

            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="contact-input"
            />

            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="contact-input"
            />

            <textarea
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="contact-textarea"
            />

            <button type="submit" className="contact-button">
              Send Message
            </button>

          </form>
        </div>
      </motion.div>
    </div>
  );
}
