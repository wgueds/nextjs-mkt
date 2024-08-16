"use client";

import { User } from "@/interfaces/User";
import Cookies from "js-cookie";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  userData: User | null;
  userToken: null;
  login: (userData: User) => void;
  logout: () => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userData, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = Cookies.get("_user");
    const storedUserToken = Cookies.get("_token");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }

    if (storedUserToken) setUserToken(storedUserToken);
  }, []);

  const login = (userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);

    Cookies.remove("_user");
    Cookies.remove("_token");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userData,
        userToken,
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
