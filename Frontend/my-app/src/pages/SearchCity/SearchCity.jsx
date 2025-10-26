import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const SearchCity = () => {
 const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const cities = [
    'Pune', 'Mumbai',
'Nashik',
'Delhi', 'Jaipur',
'Bengaluru', 'Chennai',
'Hyderabad',
'Nagpur', 'Bhopal',
'Surat', 'Ahmedabad',
'Indore', 
'Goa'
  ];
  const boardingPointsData = {
   
  };
  const droppingPointsData = {
    
  };

  const buses = [
    { id: 1, name: 'QuickBus Express', type: 'AC Sleeper', time: '7:00 AM', duration: '4h 30m', price: 45, rating: 4.5, seats: 15 },
    { id: 2, name: 'Comfort Travels', type: 'AC Seater', time: '9:30 AM', duration: '5h 00m', price: 35, rating: 4.2, seats: 22 },
    { id: 3, name: 'Royal Coaches', type: 'AC Sleeper', time: '11:00 AM', duration: '4h 45m', price: 50, rating: 4.7, seats: 8 },
    { id: 4, name: 'Swift Express', type: 'Non-AC Seater', time: '2:00 PM', duration: '5h 30m', price: 25, rating: 3.9, seats: 30 },
    { id: 5, name: 'Premium Bus Service', type: 'AC Sleeper', time: '6:00 PM', duration: '4h 20m', price: 55, rating: 4.8, seats: 5 },
    { id: 6, name: 'City Link', type: 'AC Seater', time: '8:30 PM', duration: '5h 15m', price: 40, rating: 4.3, seats: 18 }
  ];

  const handleSearch = () => {
     if (!fromCity || !toCity || !travelDate) {
    navigate('/no-bus')
    return;
  }

 
  const filteredBuses = buses.filter(bus => true); 

  setSearchResults(filteredBuses);
  setHasSearched(true);

  
   navigate("/select-bus", { state: { fromCity, toCity, travelDate } });
  };

  const swapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  return(
  
  <div className="container">
        {/* Search Section */}
        <div className="header">
          <div className="search-box">
            <h2 className="search-title">Search Buses</h2>
            <div className="search-form">
              <div className="form-group">
                <label className="form-label">From</label>
                <select 
                  className="form-select"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                >
                  <option value="">Select city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <button className="swap-btn" onClick={swapCities} title="Swap cities">
                ⇄
              </button>

              <div className="form-group">
                <label className="form-label">To</label>
                <select 
                  className="form-select"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                >
                  <option value="">Select city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Date of Journey</label>
                <input 
                  type="date"
                  className="form-input"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  min={getTodayDate()}
                />
              </div>

              <button className="search-btn" onClick={handleSearch}>
                🔍 Search Buses
              </button>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div className="results-section">
            <h2 className="results-header">Available Buses</h2>
            <div className="route-info">
              {fromCity} → {toCity} | {travelDate} | {searchResults.length} buses found
            </div>

            {searchResults.length > 0 ? (
              searchResults.map(bus => (
                <div key={bus.id} className="bus-card">
                  <div className="bus-card-content">
                    <div className="bus-info">
                      <h3>{bus.name}</h3>
                      <div className="bus-type">
                        <span className="badge">{bus.type}</span>
                      </div>
                    </div>

                    <div className="time-info">
                      <div className="time">{bus.time}</div>
                      <div className="duration">⏱️ {bus.duration}</div>
                    </div>

                    <div className="rating-info">
                      <div className="rating">
                        ⭐ {bus.rating}
                      </div>
                      <div className="seats-available">
                        {bus.seats} seats available
                      </div>
                    </div>

                    <div className="price-info">
                      <div className="price">${bus.price}</div>
                      <div className="price-label">per seat</div>
                    </div>

                    <button className="select-btn">
                      View Seats
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                No buses found for the selected route and date. Please try different options.
              </div>
            )}
          </div>
        )}
      </div>);
}
export default SearchCity;