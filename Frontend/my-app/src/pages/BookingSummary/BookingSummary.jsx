import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useBus } from "../BusContext/BusContext";

export default function BookingSummary() {
const navigate = useNavigate();

// Access global state
const { selectedBus, selectedSeats, setPaymentInfo } = useBus();

// Price calculation
const seatPrice = selectedBus?.discountPrice || 400; // fallback
const subtotal = selectedSeats.length * seatPrice;
const gst = subtotal * 0.18;
const total = subtotal + gst;

const handleProceed = () => {
if (!selectedSeats.length) {
toast.error("❌ No seats selected! Please select at least one seat.");
return;
}


// Save payment details globally
setPaymentInfo({
  bus: selectedBus,
  seats: selectedSeats,
  subtotal,
  gst,
  total,
});

navigate("/payment"); // Navigate without passing state


};

return (
<> <div className="summary-card"> <h3 className="summary-title">Booking Summary</h3>


    <div className="price-display">₹{subtotal.toFixed(2)}</div>

    <div className="seat-list">
      <strong>Seats Selected:</strong> {selectedSeats.join(', ')}
    </div>

    <div className="price-row">
      <span>Subtotal</span>
      <span>₹{subtotal.toFixed(2)}</span>
    </div>

    <div className="price-row">
      <span>GST (18%)</span>
      <span>₹{gst.toFixed(2)}</span>
    </div>

    <hr className="divider" />

    <div className="price-total">
      <span>Total</span>
      <span>₹{total.toFixed(2)}</span>
    </div>

    <p className="note">Prices are inclusive of taxes</p>

    <button className="btn-payment" onClick={handleProceed}>
      Proceed to Payment
    </button>
  </div>

  <ToastContainer position="top-right" autoClose={3000} />
</>


);
}