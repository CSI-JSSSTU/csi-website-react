// context/authProvider.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user information

  const signIn = (userData) => {
    setUser(userData); // Implement your sign-in logic
  };

  const signOut = () => {
    setUser(null); // Implement your sign-out logic
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
