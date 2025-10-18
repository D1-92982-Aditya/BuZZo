import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SelectBus = () => {
    const navigate = useNavigate();
    const busBook =()=>{
        navigate('/seat')
    }
  const [priceRange, setPriceRange] = useState([30, 80]);
  const [sortBy, setSortBy] = useState('departure');
  const [selectedFilters, setSelectedFilters] = useState({
    morning: false,
    evening: false,
    seater: false,
    night: false,
    acNonAc: true,
    paitee: false,
    seaterFilter: false,
    acManager: true,
    himlat: true,
    appotiam: true
  });

  const buses = [
    {
      id: 1,
      name: 'QuickBus',
      type: 'AC Sleeper',
      rating: 4,
      time: '07:00 AM',
      from: 'from Boston',
      price: 55,
      discountPrice: 30,
      seats: 23,
      ratingCount: '4.2/5',
      operator: 'AC Manager'
    },
    {
      id: 2,
      name: 'Express Shuttle',
      type: 'Non-AC Seater',
      rating: 4,
      time: '01:00 AM',
      from: 'from Boston',
      price: 30,
      discountPrice: 30,
      seats: 23,
      ratingCount: '4.2/5',
      operator: 'Himlat Miti Patel'
    },
    {
      id: 3,
      name: 'Express Shuttle',
      type: 'Non-AC Seater',
      rating: 4,
      time: '01:00 AM',
      from: 'from Boston',
      price: 80,
      discountPrice: 80,
      seats: 23,
      ratingCount: '4/5',
      operator: 'Appotiam Pnis'
    },
    {
      id: 4,
      name: 'Express Lines',
      type: 'AC Seater',
      rating: 5,
      time: '09:00 AM',
      from: 'from Boston',
      price: 65,
      discountPrice: 45,
      seats: 18,
      ratingCount: '4.5/5',
      operator: 'AC Manager'
    }
  ];

  const handleFilterChange = (filter) => {
    setSelectedFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < rating ? '#ffc107' : '#e4e5e9', fontSize: '16px' }}>★</span>
    ));
  };

  const styles = {
    container: {
      backgroundColor: '#2c3e50',
      minHeight: '100vh',
      color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    navbar: {
      backgroundColor: '#1a252f',
      padding: '15px 30px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginRight: '30px',
      display: 'flex',
      alignItems: 'center'
    },
    busIcon: {
      marginRight: '8px',
      fontSize: '28px'
    },
    routeBox: {
      backgroundColor: '#0d1117',
      borderRadius: '8px',
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center'
    },
    badge: {
      backgroundColor: '#0d6efd',
      borderRadius: '50%',
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '12px',
      fontSize: '16px'
    },
    navButton: {
      background: 'none',
      border: 'none',
      color: '#fff',
      padding: '8px 16px',
      cursor: 'pointer',
      fontSize: '14px',
      textDecoration: 'none'
    },
    modifyButton: {
      backgroundColor: '#0d6efd',
      color: '#fff',
      border: 'none',
      padding: '8px 20px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500'
    },
    sortContainer: {
      padding: '20px 30px',
      display: 'flex',
      gap: '20px',
      alignItems: 'center'
    },
    sortButton: {
      background: 'none',
      border: 'none',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '14px',
      padding: '4px 8px',
      opacity: 0.8,
      transition: 'opacity 0.2s'
    },
    sortButtonActive: {
      opacity: 1,
      fontWeight: '600'
    },
    filterCard: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    filterTitle: {
      color: '#000',
      fontSize: '16px',
      fontWeight: '600',
      marginBottom: '20px'
    },
    filterSection: {
      marginBottom: '28px'
    },
    filterSectionTitle: {
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '12px',
      color: '#000'
    },
    checkbox: {
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center'
    },
    checkboxInput: {
      width: '18px',
      height: '18px',
      marginRight: '10px',
      cursor: 'pointer',
      accentColor: '#0d6efd'
    },
    checkboxLabel: {
      fontSize: '14px',
      color: '#333',
      cursor: 'pointer',
      userSelect: 'none'
    },
    rangeInput: {
      width: '100%',
      height: '6px',
      borderRadius: '3px',
      outline: 'none',
      accentColor: '#0d6efd',
      cursor: 'pointer'
    },
    rangeLabels: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '12px',
      color: '#666',
      marginTop: '8px'
    },
    busCard: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s'
    },
    busCardHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    },
    busName: {
      color: '#000',
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '8px'
    },
    busTime: {
      color: '#000',
      fontSize: '16px',
      fontWeight: '600'
    },
    busFrom: {
      color: '#666',
      fontSize: '14px',
      marginLeft: '6px'
    },
    busInfo: {
      color: '#666',
      fontSize: '14px',
      marginTop: '8px'
    },
    price: {
      color: '#000',
      fontSize: '32px',
      fontWeight: '700',
      marginBottom: '8px'
    },
    discountPrice: {
      color: '#000',
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '16px'
    },
    selectButton: {
      backgroundColor: '#0d6efd',
      color: '#fff',
      border: 'none',
      padding: '10px 32px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      

      {/* Sort By Options */}
      <div style={styles.sortContainer}>
        <span style={{ color: '#aaa', fontSize: '14px' }}>Sort by:</span>
        <button 
          style={{...styles.sortButton, ...(sortBy === 'departure' ? styles.sortButtonActive : {})}}
          onClick={() => setSortBy('departure')}
        >
          Departure
        </button>
        <button 
          style={{...styles.sortButton, ...(sortBy === 'arrival' ? styles.sortButtonActive : {})}}
          onClick={() => setSortBy('arrival')}
        >
          Arrival
        </button>
        <button 
          style={{...styles.sortButton, ...(sortBy === 'price' ? styles.sortButtonActive : {})}}
          onClick={() => setSortBy('price')}
        >
          Price
        </button>
        <button 
          style={{...styles.sortButton, ...(sortBy === 'rating' ? styles.sortButtonActive : {})}}
          onClick={() => setSortBy('rating')}
        >
          Rating
        </button>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '20px' }}>
          {/* Left Sidebar - Filters */}
          <div>
            <div style={styles.filterCard}>
              <h6 style={styles.filterTitle}>Filter by</h6>

              {/* Departure Time */}
              <div style={styles.filterSection}>
                <h6 style={styles.filterSectionTitle}>Departure Time</h6>
                <div style={styles.checkbox}>
                  <input 
                    style={styles.checkboxInput}
                    type="checkbox" 
                    id="morning"
                    checked={selectedFilters.morning}
                    onChange={() => handleFilterChange('morning')}
                  />
                  <label style={styles.checkboxLabel} htmlFor="morning">
                    Morning: 5am-11am
                  </label>
                </div>
                <div style={styles.checkbox}>
                  <input 
                    style={styles.checkboxInput}
                    type="checkbox" 
                    id="evening"
                    checked={selectedFilters.evening}
                    onChange={() => handleFilterChange('evening')}
                  />
                  <label style={styles.checkboxLabel} htmlFor="evening">
                    Evening: 11am-19pm
                  </label>
                </div>
                <div style={styles.checkbox}>
                  <input 
                    style={styles.checkboxInput}
                    type="checkbox" 
                    id="seater"
                    checked={selectedFilters.seater}
                    onChange={() => handleFilterChange('seater')}
                  />
                  <label style={styles.checkboxLabel} htmlFor="seater">
                    Seater
                  </label>
                </div>
                <div style={styles.checkbox}>
                  <input 
                    style={styles.checkboxInput}
                    type="checkbox" 
                    id="night"
                    checked={selectedFilters.night}
                    onChange={() => handleFilterChange('night')}
                  />
                  <label style={styles.checkboxLabel} htmlFor="night">
                    Night 11.am-11am
                  </label>
                </div>
              </div>

              {/* Bus Type */}
              <div style={styles.filterSection}>
                <h6 style={styles.filterSectionTitle}>Bus Type</h6>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>Ewi AC</div>
                <input 
                  type="range" 
                  style={styles.rangeInput}
                  min="30" 
                  max="80" 
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                />
                <div style={styles.rangeLabels}>
                  <span>${priceRange[0]} - 80</span>
                </div>
              </div>

              {/* Price Range */}
              <div style={styles.filterSection}>
                <h6 style={styles.filterSectionTitle}>Price Range</h6>
                <div style={styles.checkbox}>
                  <input 
                    style={styles.checkboxInput}
                    type="checkbox" 
                    id="acNonAc"
                    checked={selectedFilters.acNonAc}
                    onChange={() => handleFilterChange('acNonAc')}
                  />
                  <label style={styles.checkboxLabel} htmlFor="acNonAc">
                    AC Non-AC
                  </label>
                </div>
                <div style={styles.checkbox}>
                  <input 
                    style={styles.checkboxInput}
                    type="checkbox" 
                    id="paitee"
                    checked={selectedFilters.paitee}
                    onChange={() => handleFilterChange('paitee')}
                  />
                  <label style={styles.checkboxLabel} htmlFor="paitee">
                    Paitee
                  </label>
                </div>
                <div style={styles.checkbox}>
                  <input 
                    style={styles.checkboxInput}
                    type="checkbox" 
                    id="seaterFilter"
                    checked={selectedFilters.seaterFilter}
                    onChange={() => handleFilterChange('seaterFilter')}
                  />
                  <label style={styles.checkboxLabel} htmlFor="seaterFilter">
                    Seater
                  </label>
                </div>
              </div>

              {/* Bus Operator */}
              <div style={styles.filterSection}>
                <h6 style={styles.filterSectionTitle}>Bus Operator</h6>
                <div style={styles.checkbox}>
                  <input 
                    style={styles.checkboxInput}
                    type="checkbox" 
                    id="acManager"
                    checked={selectedFilters.acManager}
                    onChange={() => handleFilterChange('acManager')}
                  />
                  <label style={styles.checkboxLabel} htmlFor="acManager">
                    AC Manager
                  </label>
                </div>
                <div style={styles.checkbox}>
                  <input 
                    style={styles.checkboxInput}
                    type="checkbox" 
                    id="himlat"
                    checked={selectedFilters.himlat}
                    onChange={() => handleFilterChange('himlat')}
                  />
                  <label style={styles.checkboxLabel} htmlFor="himlat">
                    Himlat Miti Patel
                  </label>
                </div>
                <div style={styles.checkbox}>
                  <input 
                    style={styles.checkboxInput}
                    type="checkbox" 
                    id="appotiam"
                    checked={selectedFilters.appotiam}
                    onChange={() => handleFilterChange('appotiam')}
                  />
                  <label style={styles.checkboxLabel} htmlFor="appotiam">
                    Appotiam Pnis
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Bus List */}
          <div>
            {buses.map((bus, index) => (
              <div 
                key={bus.id} 
                style={styles.busCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', alignItems: 'center' }}>
                  <div>
                    <h5 style={styles.busName}>
                      {bus.name} | {bus.type}
                    </h5>
                    <div style={{ marginBottom: '8px' }}>{renderStars(bus.rating)}</div>
                    <div style={{ marginBottom: '12px' }}>
                      <span style={styles.busTime}>{bus.time}</span>
                      <span style={styles.busFrom}>{bus.from}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      {renderStars(Math.floor(parseFloat(bus.ratingCount)))}
                      <span style={{ color: '#666', fontSize: '14px' }}>{bus.ratingCount}</span>
                    </div>
                    <div style={styles.busInfo}>{bus.seats} Seats Available</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={styles.price}>${bus.price.toFixed(2)}</div>
                    <div style={styles.discountPrice}>${bus.discountPrice.toFixed(2)}</div>
                    <button 
                      style={styles.selectButton}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0b5ed7'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0d6efd'}
                      onClick={busBook}
                    >
                      Select Seats
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectBus;