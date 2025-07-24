import React, { createContext, useContext, useState } from 'react';
import { signOut } from '../../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login updates the user state
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Optional: Persist user
  };

  // Logout clears user state and calls the API
  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error during sign-out:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
    }
  };

  // Load user from localStorage (optional)
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
