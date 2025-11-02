import React, { createContext, useContext, useState } from "react";

const BusContext = createContext();

export const BusProvider = ({ children }) => {
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState(null);

  return (
    <BusContext.Provider
      value={{
        selectedBus,
        setSelectedBus,
        selectedSeats,
        setSelectedSeats,
        paymentInfo,
        setPaymentInfo,
      }}
    >
      {children}
    </BusContext.Provider>
  );
};

export const useBus = () => useContext(BusContext);
