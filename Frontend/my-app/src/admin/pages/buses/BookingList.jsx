import React, { useState, useEffect } from "react";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;

  useEffect(() => {
    setBookings([
      { id: 1, passengerName: "John", busName: "Bus A", date: "2025-01-20", seat: "A1", amount: 250 },
      { id: 2, passengerName: "Rita", busName: "Bus B", date: "2025-01-21", seat: "A2", amount: 300 },
    ]);
  }, []);

  const filtered = filterDate
    ? bookings.filter((b) => b.date === filterDate)
    : bookings;

  const totalPages = Math.ceil(filtered.length / pageSize);

  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages) setCurrentPage(p);
  };

  return (
    <div className="booking-container">
      <h2 className="booking-title">Bookings</h2>

      {/* Filter */}
      <div className="filter-box">
        <label>Filter by Date:</label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => {
            setFilterDate(e.target.value);
            setCurrentPage(1);
          }}
        />
        {filterDate && (
          <button className="clear-btn" onClick={() => setFilterDate("")}>
            Clear
          </button>
        )}
      </div>

      {paginated.length === 0 && <p>No bookings found.</p>}

      {paginated.length > 0 && (
        <>
          <div className="table-outer-wrapper">
            <div className="table-inner-wrapper">
              <table className="booking-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Passenger</th>
                    <th>Bus</th>
                    <th>Date</th>
                    <th>Seat</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((b) => (
                    <tr key={b.id}>
                      <td>{b.id}</td>
                      <td>{b.passengerName}</td>
                      <td>{b.busName}</td>
                      <td>{b.date}</td>
                      <td>{b.seat}</td>
                      <td>₹{b.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pagination">
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingList;
