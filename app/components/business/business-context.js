'use client'

import { createContext, useContext, useState } from 'react';

export const BusinessContext = createContext({
  user: null,
  setUser: () => {},
});

export function BusinessProvider({ user: initialUser, children }) {
  const [user, setUser] = useState(initialUser);
  return (
    <BusinessContext.Provider value={{ user, setUser }}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (!context) throw new Error("useBusiness must be inside BusinessProvider");
  return context;
}

