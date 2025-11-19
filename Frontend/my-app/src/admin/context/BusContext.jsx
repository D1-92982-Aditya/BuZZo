import { createContext, useState } from "react";

export const BusContext = createContext();

export default function BusProvider({ children }) {
  const [buses, setBuses] = useState([]);

  const addBus = (bus) => setBuses([...buses, bus]);

  const updateBus = (updated) => {
    setBuses(buses.map((bus) => (bus.id === updated.id ? updated : bus)));
  };

  const deleteBus = (id) => {
    setBuses(buses.filter((b) => b.id !== id));
  };

  return (
    <BusContext.Provider value={{ buses, addBus, updateBus, deleteBus }}>
      {children}
    </BusContext.Provider>
  );
}
