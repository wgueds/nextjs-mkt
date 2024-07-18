"use client";

import { User } from "@/interfaces/User";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  userData: User | null;
  login: (userData: User) => void;
  logout: () => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userData,
        login,
        logout,
        setIsLoggedIn,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
