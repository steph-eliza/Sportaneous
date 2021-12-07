import React from "react"
import { createContext, ReactNode, useState } from 'react';

export const UserContext = createContext<any>(undefined);

export const UserProvider = ({ children }: {children: ReactNode}) => {
  const [currentUser, setCurrentUser] = useState('');

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
