'use client';
import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);

        const currentTime = Date.now() / 1000;
        const expiresIn = decoded.exp - currentTime;

        if (expiresIn <= 0) {
          logout();
        } else {
          const timeout = setTimeout(() => {
            logout();
          }, expiresIn * 1000);

          return () => clearTimeout(timeout);
        }
      } catch {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
