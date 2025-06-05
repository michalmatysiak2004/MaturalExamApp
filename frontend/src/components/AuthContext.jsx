// src/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { ACCESS_TOKEN } from "../constants";
import api from "../api";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem(ACCESS_TOKEN));
  const [user,setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await api.get("/api/user/");
      setUser(res.data);
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Błąd przy pobieraniu danych użytkownika:", err);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoadingUser(false);
    }
  };

  const login = (token) => {
    localStorage.setItem(ACCESS_TOKEN, token);
    setIsLoggedIn(true);
    fetchUser();
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    
    setIsLoggedIn(false);
  };

  useEffect(() => {

    if (localStorage.getItem(ACCESS_TOKEN)) {
      fetchUser(); // przy starcie, jeśli token jest – pobierz usera
    } else {
      setLoadingUser(false);
    }

    const syncLoginState = () => {
      setIsLoggedIn(!!localStorage.getItem(ACCESS_TOKEN));
    };
    window.addEventListener("storage", syncLoginState);
    return () => window.removeEventListener("storage", syncLoginState);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loadingUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
