import React from 'react';
import SeatLayout from '../SeatLayout/SeatLayout';
import BookingSummary from '../BookingSummary/BookingSummary';
import { useBus } from "../BusContext/BusContext";
import './SeatDesign.css';

export default function BusSeatSelector() {
const { selectedBus, selectedSeats } = useBus();

// Hardcoded booked seats for now; can be moved to context or fetched from API
const bookedSeats = ['2E', '4D', '4F'];
const seatPrice = selectedBus?.discountPrice || 400; // fallback if not set

return (
<> <div className="main-container"> <div className="p-4"> <div className="row">
{/* Left: Seat Selection */} <div className="col-left"> <div className="content-area">
{selectedBus && (
<> <h2 className="bus-title">{selectedBus.name} | {selectedBus.type}</h2> <p className="bus-subtitle">{selectedBus.time} from {selectedBus.from}</p>
</>
)} <SeatLayout bookedSeats={bookedSeats} /> </div> </div>

```
        {/* Right: Booking Summary */}
        <div className="col-right">
          <BookingSummary
            selectedBus={selectedBus}
            selectedSeats={selectedSeats}
            seatPrice={seatPrice}
          />
        </div>
      </div>
    </div>
  </div>
</>


);
}