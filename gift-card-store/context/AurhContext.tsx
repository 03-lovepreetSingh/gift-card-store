'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  walletAddress?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  connectWallet: (address: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        if (typeof window !== 'undefined') {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error('Failed to load user from storage', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Persist user to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // In a real app, you would make an API call here
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: email,
    };
    setUser(mockUser);
  };

  const register = async (name: string, email: string, password: string) => {
    // In a real app, you would make an API call here
    const mockUser = {
      id: '1',
      name: name,
      email: email,
    };
    setUser(mockUser);
  };

  const logout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
    setUser(null);
  };

  const connectWallet = (address: string) => {
    setUser(prevUser => {
      if (!prevUser) return prevUser;
      return {
        ...prevUser,
        walletAddress: address,
      };
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    connectWallet,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}