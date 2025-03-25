"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initialisez à false par défaut // null means loading state
  const [loading, setLoading] = useState(true);  // Used for handling loading state while fetching auth info

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/check-auth");
        const data = await res.json();
        console.log(data); // Pour vérifier la réponse
        setIsAuthenticated(data.authenticated);
      } catch (error) {
        console.error("Error during auth check:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
  
    checkAuth();
  }, []);

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
