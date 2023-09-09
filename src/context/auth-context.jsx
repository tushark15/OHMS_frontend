// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Load isAdmin status from local storage
    const isAdminStatus = localStorage.getItem('isAdmin');
    if (isAdminStatus) {
      setIsAdmin(JSON.parse(isAdminStatus));
    }
  }, []);

  const setAdminStatus = (status) => {
    setIsAdmin(status);
    localStorage.setItem('isAdmin', JSON.stringify(status));
  };

  return (
    <AuthContext.Provider value={{ isAdmin, setAdminStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

