'use client'

import { createContext, useContext, useState } from 'react';

export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

export function UserProvider({ user: initialUser, children }) {
  const [user, setUser] = useState(initialUser);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be inside UserProvider");
  return context;
}

