// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import { authService } from "../services/authService";

type AuthContextType = {
  isAuthenticated: boolean;
  userData: ReturnType<typeof authService.getUserData>;
  login: (data: Parameters<typeof authService.login>[0]) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userData: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: authService.isAuthenticated(),
    userData: authService.getUserData(),
  });

  const login = (data: Parameters<typeof authService.login>[0]) => {
    authService.login(data);
    setAuthState({
      isAuthenticated: true,
      userData: authService.getUserData(),
    });
  };

  const logout = () => {
    authService.logout();
    setAuthState({
      isAuthenticated: false,
      userData: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
