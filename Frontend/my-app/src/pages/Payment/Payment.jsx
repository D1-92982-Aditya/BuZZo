import React from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    const options = {
      key: "rzp_test_RSGpEdKhXwSQdu",
      amount: 50000,
      currency: "INR",
      name: "Aditya's Project",
      description: "Test Transaction using Razorpay",
      image: "https://razorpay.com/favicon.png",
      handler: function (response) {
        navigate("/ticket");
        alert("Payment Successful!");
        alert("Payment ID: " + response.razorpay_payment_id);

        // ✅ Redirect to /tickit
       
      },
      prefill: {
        name: "Aditya Waghmare",
        email: "aditya@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Dummy Transaction",
      },
      theme: {
        color: "#0f9d58",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f7f9fb",
      }}
    >
      <h2>💳 Dummy Payment Gateway</h2>
      <button
        onClick={handlePayment}
        style={{
          padding: "12px 24px",
          backgroundColor: "#0f9d58",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Pay ₹1000
      </button>
    </div>
  );
};

export default Payment;
