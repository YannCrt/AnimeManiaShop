"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

// Crée le contexte
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider pour envelopper ton application et fournir l'état d'authentification
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/check-auth", { cache: "no-store" });
        const data = await res.json();
        setIsAuthenticated(data.authenticated);
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification :", error);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setIsAuthenticated(false); // On met à jour immédiatement l'état après la déconnexion
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
