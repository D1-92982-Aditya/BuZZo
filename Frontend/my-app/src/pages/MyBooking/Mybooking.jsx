import React, { useState } from 'react';

const Mybooking = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Seat configuration
    const lowerDeckSeats = [
      [
        { id: 'L1', price: 912, status: 'available', position: 'window' },
        { id: 'L2', price: 850, status: 'available', position: 'aisle' }
      ],
      [
        { id: 'L3', price: 900, status: 'available', position: 'window' },
        { id: 'L4', price: 1026, status: 'available', position: 'aisle' }
      ],
      [
        { id: 'L5', price: 850, status: 'available', position: 'window' },
        { id: 'L6', price: 850, status: 'available', position: 'aisle' }
      ],
      [
        { id: 'L7', price: 900, status: 'available', position: 'window' },
        { id: 'L8', price: 900, status: 'available', position: 'aisle' }
      ],
      [
        { id: 'L9', price: 950, status: 'available', position: 'window' },
        { id: 'L10', price: 950, status: 'available', position: 'aisle' }
      ],
      [
        { id: 'L11', price: 1026, status: 'available', position: 'window' },
        { id: 'L12', price: 1026, status: 'available', position: 'aisle' }
      ],
      [
        { id: 'L13', price: 786, status: 'available', position: 'window' },
        { id: 'L14', price: 786, status: 'available', position: 'aisle' }
      ],
      [
        { id: 'L15', price: 750, status: 'available', position: 'single' }
      ]
    ];
  
    const upperDeckSeats = [
      [
        { id: 'U1', price: 850, status: 'available', position: 'window' },
        { id: 'U2', price: 912, status: 'available', position: 'aisle' }
      ],
      [
        { id: 'U3', price: 900, status: 'available', position: 'window' },
        { id: 'U4', price: 900, status: 'available', position: 'aisle' }
      ],
      [
        { id: 'U5', price: 850, status: 'available', position: 'window' },
        { id: 'U6', price: 850, status: 'available', position: 'aisle' }
      ],
      [
        { id: 'U7', price: 900, status: 'available', position: 'window' },
        { id: 'U8', price: 900, status: 'available', position: 'aisle' }
      ],
      [
        { id: 'U9', price: 950, status: 'available', position: 'window' },
        { id: 'U10', price: 950, status: 'available', position: 'aisle' }
      ],
      [
        { id: 'U11', price: 1000, status: 'available', position: 'window' },
        { id: 'U12', price: 1000, status: 'available', position: 'aisle' }
      ],
      [
        { id: 'U13', price: 1169, status: 'available', position: 'single' }
      ],
      [
        { id: 'U14', price: 786, status: 'available', position: 'window' },
        { id: 'U15', price: 786, status: 'available', position: 'aisle' }
      ]
    ];
  
    const toggleSeat = (seatId) => {
      
      setSelectedSeats(prev => 
        prev.includes(seatId) 
          ? prev.filter(id => id !== seatId)
          : [...prev, seatId]
      );
    };
  
    const getSeatClass = (seat) => {
      if (selectedSeats.includes(seat.id)) return 'seat-selected';
      return 'seat-available';
    };
  
    const renderSeat = (seat, deck) => {
      const isSelected = selectedSeats.includes(seat.id);
  
      return (
        <div
          key={seat.id}
          className={`seat ${getSeatClass(seat)} ${seat.position === 'single' ? 'seat-single' : ''}`}
          onClick={() => toggleSeat(seat.id)}
          style={{ cursor: 'pointer' }}
        >
          <div className="seat-price">
            {seat.price ? `₹${seat.price}` : ''}
          </div>
        </div>
      );
    };
  
    return (
      <>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        
        <style>{`
          .bus-layout-container {
            background: #f5f5f5;
            min-height: 100vh;
            padding: 20px;
          }
  
          .deck-container {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
  
          .deck-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 2px solid #e0e0e0;
          }
  
          .deck-title {
            font-size: 18px;
            font-weight: 600;
            color: #333;
            margin: 0;
          }
  
          .steering-icon {
            width: 40px;
            height: 40px;
            border: 3px solid #666;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
            font-size: 24px;
          }
  
          .seats-grid {
            display: flex;
            flex-direction: column;
            gap: 12px;
            align-items: center;
          }
  
          .seat-row {
            display: flex;
            gap: 60px;
            justify-content: center;
          }
  
          .seat {
            width: 65px;
            height: 90px;
            border: 2px solid #ddd;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            transition: all 0.3s ease;
            background: white;
          }
  
          .seat-single {
            margin-left: 0;
          }
  
          .seat-available {
            border-color: #4CAF50;
            background: white;
          }
  
          .seat-available:hover {
            background: #e8f5e9;
            transform: scale(1.05);
          }
  
          .seat-selected {
            background: #4CAF50;
            border-color: #4CAF50;
            color: white;
          }
  
          .seat-sold {
            background: #f5f5f5;
            border-color: #e0e0e0;
            color: #999;
          }
  
          .seat-icon {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 5px;
          }
  
          .seat-icon.male {
            color: #2196F3;
          }
  
          .seat-icon.female {
            color: #E91E63;
          }
  
          .seat-price {
            font-size: 11px;
            font-weight: 600;
            text-align: center;
          }
  
          .seat-sold .seat-price {
            color: #999;
          }
  
          .legend {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin-top: 30px;
            padding: 15px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
  
          .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
          }
  
          .legend-box {
            width: 30px;
            height: 30px;
            border-radius: 4px;
            border: 2px solid;
          }
  
          .legend-available {
            background: white;
            border-color: #4CAF50;
          }
  
          .legend-selected {
            background: #4CAF50;
            border-color: #4CAF50;
          }
  
          .selected-info {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            font-weight: 600;
          }
  
          @media (max-width: 768px) {
            .seat-row {
              gap: 30px;
            }
            
            .seat {
              width: 55px;
              height: 75px;
            }
          }
        `}</style>
  
        <div className="bus-layout-container">
          <div className="container-fluid">
            <div className="row gx-2">
              {/* Lower Deck */}
              <div className="col-6">
                <div className="deck-container">
                  <div className="deck-header">
                    <h3 className="deck-title">Lower deck</h3>
                    <div className="steering-icon">⊕</div>
                    <div style={{ width: '40px' }}></div>
                  </div>
                  <div className="seats-grid">
                    {lowerDeckSeats.map((row, index) => (
                      <div key={index} className="seat-row">
                        {row.map(seat => renderSeat(seat, 'lower'))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
  
              {/* Upper Deck */}
              <div className="col-6">
                <div className="deck-container">
                  <div className="deck-header">
                    <div style={{ width: '40px' }}></div>
                    <h3 className="deck-title">Upper deck</h3>
                    <div style={{ width: '40px' }}></div>
                  </div>
                  <div className="seats-grid">
                    {upperDeckSeats.map((row, index) => (
                      <div key={index} className="seat-row">
                        {row.map(seat => renderSeat(seat, 'upper'))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
  
            {/* Legend */}
            <div className="legend">
              <div className="legend-item">
                <div className="legend-box legend-available"></div>
                <span>Available</span>
              </div>
              <div className="legend-item">
                <div className="legend-box legend-selected"></div>
                <span>Selected</span>
              </div>
            </div>
          </div>
  
          {/* Selected Seats Info */}
          {selectedSeats.length > 0 && (
            <div className="selected-info">
              Selected Seats: {selectedSeats.length}
            </div>
          )}
        </div>
      </>
    );
  };

export default Mybooking