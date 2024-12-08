import { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext({});

const statuses = {
  pending: {
    label: "Pending",
    text: "#a16207",
    bg: "#fef08a",
  },
  approved: {
    label: "Approved",
    text: "#3bb500",
    bg: "#9fff9f",
  },
  closed: {
    label: "Closed",
    text: "#FF6347",
    bg: "#ff61612e",
  },
};

export default function StateProvider({ children }) {
  const [CITY, setCITY] = useState("");
  const [CityID, setCityID] = useState("");
  const [COUNTRY, setCOUNTRY] = useState("");

  return (
    <StateContext.Provider
      value={{
        CITY,
        setCITY,
        COUNTRY, 
        CityID, 
        setCityID, 
        setCOUNTRY, 
        statuses
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
