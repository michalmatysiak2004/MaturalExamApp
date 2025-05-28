// src/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { ACCESS_TOKEN } from "../constants";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem(ACCESS_TOKEN));

  const login = (token) => {
    localStorage.setItem(ACCESS_TOKEN, token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const syncLoginState = () => {
      setIsLoggedIn(!!localStorage.getItem(ACCESS_TOKEN));
    };
    window.addEventListener("storage", syncLoginState);
    return () => window.removeEventListener("storage", syncLoginState);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
