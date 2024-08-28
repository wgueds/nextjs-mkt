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
  userToken: string | null;
  login: (userData: User) => void;
  logout: () => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userData, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = Cookies.get("_user");
    const storedUserToken = Cookies.get("_token");
    const storedIsLoggedIn = Cookies.get("_isLoggedIn");

    if (storedIsLoggedIn === "1" && storedUser && storedUserToken) {
      setUser(JSON.parse(storedUser));
      setUserToken(storedUserToken);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setUserToken(null);
    }
  }, []);

  const login = (userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setUserToken(null);

    Cookies.remove("_user");
    Cookies.remove("_token");
    Cookies.remove("_isLoggedIn");
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
