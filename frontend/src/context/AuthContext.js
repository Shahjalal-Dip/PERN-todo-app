import React, { createContext, useState, useContext, useEffect } from 'react';
import { login, register, logout, checkAuth } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const userData = await checkAuth(); // Check if the user is still authenticated
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false); // Ensure unauthenticated state is handled
        }
      } catch (error) {
        console.error('Authentication error:', error);
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    initAuth(); // Initialize authentication state on app load
  }, []);

  const authLogin = async (username, password) => {
    try {
      const data = await login(username, password);
      setUser(data.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const authRegister = async (username, password) => {
    try {
      const data = await register(username, password);
      setUser(data.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const authLogout = async () => {
    await logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login: authLogin,
    register: authRegister,
    logout: authLogout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};