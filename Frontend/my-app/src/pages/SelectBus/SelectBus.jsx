import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


// Star Rating Component
const StarRating = ({ rating, size = '16px' }) => {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ color: i < rating ? '#ffc107' : '#e4e5e9', fontSize: size }}>★</span>
      ))}
    </div>
  );
};

// Filter Checkbox Component
const FilterCheckbox = ({ id, label, checked, onChange }) => {
  const styles = {
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
    }
  };

  return (
    <div style={styles.checkbox}>
      <input 
        style={styles.checkboxInput}
        type="checkbox" 
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label style={styles.checkboxLabel} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

// Filter Section Component
const FilterCard = ({ priceRange, setPriceRange, selectedFilters, handleFilterChange, onClose, isMobile }) => {
  const styles = {
    filterCard: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: '16px'
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
    closeButton: {
      backgroundColor: '#dc3545',
      color: '#fff',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      marginTop: '12px',
      width: '100%'
    }
  };

  return (
    <div style={styles.filterCard}>
      <h6 style={styles.filterTitle}>Filter by</h6>

      <div style={styles.filterSection}>
        <h6 style={styles.filterSectionTitle}>Departure Time</h6>
        <FilterCheckbox 
          id="morning"
          label="Morning: 5am-11am"
          checked={selectedFilters.morning}
          onChange={() => handleFilterChange('morning')}
        />
        <FilterCheckbox 
          id="evening"
          label="Evening: 11am-7pm"
          checked={selectedFilters.evening}
          onChange={() => handleFilterChange('evening')}
        />
        <FilterCheckbox 
          id="night"
          label="Night: 7pm-5am"
          checked={selectedFilters.night}
          onChange={() => handleFilterChange('night')}
        />
      </div>

      <div style={styles.filterSection}>
        <h6 style={styles.filterSectionTitle}>Bus Type</h6>
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>Price Range (AC)</div>
        <input 
          type="range" 
          style={styles.rangeInput}
          min="500" 
          max="2000" 
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
        />
        <div style={styles.rangeLabels}>
          <span>₹{priceRange[0]} - ₹2000</span>
        </div>
      </div>

      <div style={styles.filterSection}>
        <h6 style={styles.filterSectionTitle}>Seat Type</h6>
        <FilterCheckbox 
          id="acNonAc"
          label="AC Non-AC"
          checked={selectedFilters.acNonAc}
          onChange={() => handleFilterChange('acNonAc')}
        />
        <FilterCheckbox 
          id="sleeper"
          label="Sleeper"
          checked={selectedFilters.sleeper}
          onChange={() => handleFilterChange('sleeper')}
        />
        <FilterCheckbox 
          id="seaterFilter"
          label="Seater"
          checked={selectedFilters.seaterFilter}
          onChange={() => handleFilterChange('seaterFilter')}
        />
      </div>

      <div style={styles.filterSection}>
        <h6 style={styles.filterSectionTitle}>Bus Operator</h6>
        <FilterCheckbox 
          id="acManager"
          label="AC Manager"
          checked={selectedFilters.acManager}
          onChange={() => handleFilterChange('acManager')}
        />
        <FilterCheckbox 
          id="himlat"
          label="Himlat Miti Patel"
          checked={selectedFilters.himlat}
          onChange={() => handleFilterChange('himlat')}
        />
        <FilterCheckbox 
          id="appotiam"
          label="Appotiam Pnis"
          checked={selectedFilters.appotiam}
          onChange={() => handleFilterChange('appotiam')}
        />
      </div>

      {isMobile && (
        <button style={styles.closeButton} onClick={onClose}>
          Apply Filters
        </button>
      )}
    </div>
  );
};

// Bus Card Component
const BusCard = ({ bus, onSelectSeats, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);
 

  const styles = {
    busCard: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: isMobile ? '16px' : '20px',
      marginBottom: '16px',
      boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.1)',
      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
      transition: 'transform 0.2s, box-shadow 0.2s'
    },
    contentWrapper: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '16px',
      alignItems: isMobile ? 'stretch' : 'center',
      justifyContent: 'space-between'
    },
    busInfo: {
      flex: 1
    },
    busName: {
      color: '#000',
      fontSize: isMobile ? '16px' : '18px',
      fontWeight: '600',
      marginBottom: '8px'
    },
    busTime: {
      color: '#000',
      fontSize: isMobile ? '15px' : '16px',
      fontWeight: '600'
    },
    busFrom: {
      color: '#666',
      fontSize: '14px',
      marginLeft: '6px'
    },
    seatsInfo: {
      color: '#666',
      fontSize: '14px',
      marginTop: '8px'
    },
    priceSection: {
      display: 'flex',
      flexDirection: isMobile ? 'row' : 'column',
      alignItems: isMobile ? 'center' : 'flex-end',
      justifyContent: isMobile ? 'space-between' : 'flex-start',
      gap: isMobile ? '12px' : '8px',
      minWidth: isMobile ? '100%' : '140px'
    },
    priceWrapper: {
      display: 'flex',
      flexDirection: isMobile ? 'row' : 'column',
      alignItems: isMobile ? 'center' : 'flex-end',
      gap: isMobile ? '12px' : '4px'
    },
    price: {
      color: '#999',
      fontSize: isMobile ? '18px' : '24px',
      fontWeight: '600',
      textDecoration: 'line-through'
    },
    discountPrice: {
      color: '#28a745',
      fontSize: isMobile ? '20px' : '28px',
      fontWeight: '700'
    },
    selectButton: {
      backgroundColor: '#0d6efd',
      color: '#fff',
      border: 'none',
      padding: '10px 24px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'background-color 0.2s',
      whiteSpace: 'nowrap'
    }
  };

  return (
    <div 
      style={styles.busCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.contentWrapper}>
        <div style={styles.busInfo}>
          <h5 style={styles.busName}>
            {bus.name} | {bus.type}
          </h5>
          <div style={{ marginBottom: '8px' }}>
            <StarRating rating={bus.rating} />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <span style={styles.busTime}>{bus.time}</span>
            <span style={styles.busFrom}>{bus.from}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <StarRating rating={Math.floor(parseFloat(bus.ratingCount))} />
            <span style={{ color: '#666', fontSize: '14px' }}>{bus.ratingCount}</span>
          </div>
          <div style={styles.seatsInfo}>{bus.seats} Seats Available</div>
        </div>
        
        <div style={styles.priceSection}>
          <div style={styles.priceWrapper}>
            <div style={styles.price}>₹{bus.price.toFixed(2)}</div>
            <div style={styles.discountPrice}>₹{bus.discountPrice.toFixed(2)}</div>
          </div>
          <button 
            style={styles.selectButton}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0b5ed7'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0d6efd'}
            onClick={onSelectSeats}
          >
            Select Seats
          </button>
        </div>
      </div>
    </div>
  );
};

// Sort Bar Component
const SortBar = ({ sortBy, setSortBy }) => {
  const styles = {
    sortContainer: {
      padding: '20px',
      display: 'flex',
      gap: '15px',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    sortButton: {
      background: 'none',
      border: 'none',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '14px',
      padding: '6px 12px',
      opacity: 0.8,
      transition: 'opacity 0.2s',
      borderRadius: '4px'
    },
    sortButtonActive: {
      opacity: 1,
      fontWeight: '600',
      backgroundColor: 'rgba(255,255,255,0.1)'
    }
  };

  return (
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
  );
};

// Main Component
const SelectBus = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [sortBy, setSortBy] = useState('departure');
  const [selectedFilters, setSelectedFilters] = useState({
    morning: false,
    evening: false,
    night: false,
    acNonAc: true,
    sleeper: false,
    seaterFilter: false,
    acManager: true,
    himlat: true,
    appotiam: true
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const buses = [
    {
      id: 1,
      name: 'QuickBus',
      type: 'AC Sleeper',
      rating: 4,
      time: '07:00 AM',
      from: 'from Boston',
      price: 1100,
      discountPrice: 900,
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
      price: 750,
      discountPrice: 600,
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
      price: 1500,
      discountPrice: 1200,
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
      price: 1300,
      discountPrice: 1000,
      seats: 18,
      ratingCount: '4.5/5',
      operator: 'AC Manager'
    }
  ];

  const handleFilterChange = (filter) => {
    setSelectedFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
  };
  const navigate =useNavigate();

  const handleSelectSeats = () => {
    navigate('/seat')
  };

  const styles = {
    container: {
      backgroundColor: '#2c3e50',
      minHeight: '100vh',
      color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    mainContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 20px',
      paddingBottom: '40px'
    },
    filterButton: {
      backgroundColor: '#0d6efd',
      color: '#fff',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '16px',
      width: '100%',
      display: isMobile ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    filterOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 999,
      display: showFilters && isMobile ? 'block' : 'none'
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '280px 1fr',
      gap: '20px'
    },
    filterSidebar: {
      position: isMobile ? 'fixed' : 'relative',
      top: isMobile ? '50%' : 'auto',
      left: isMobile ? '50%' : 'auto',
      transform: isMobile ? 'translate(-50%, -50%)' : 'none',
      zIndex: isMobile ? 1000 : 'auto',
      maxWidth: isMobile ? '90%' : 'auto',
      maxHeight: isMobile ? '85vh' : 'auto',
      overflowY: isMobile ? 'auto' : 'visible',
      display: isMobile && !showFilters ? 'none' : 'block',
      width: isMobile ? '90%' : 'auto'
    }
  };

  return (
    <div style={styles.container}>
      <SortBar sortBy={sortBy} setSortBy={setSortBy} />

      <div style={styles.mainContent}>
        {isMobile && (
          <button 
            style={styles.filterButton}
            onClick={() => setShowFilters(true)}
          >
            <span>🔍</span>
            <span>Show Filters</span>
          </button>
        )}

        <div 
          style={styles.filterOverlay}
          onClick={() => setShowFilters(false)}
        />

        <div style={styles.gridContainer}>
          <div style={styles.filterSidebar}>
            <FilterCard 
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedFilters={selectedFilters}
              handleFilterChange={handleFilterChange}
              onClose={() => setShowFilters(false)}
              isMobile={isMobile}
            />
          </div>

          <div>
            {buses.map((bus) => (
              <BusCard 
                key={bus.id}
                bus={bus}
                onSelectSeats={handleSelectSeats}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectBus;