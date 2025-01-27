import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/recipe';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  toggleFavorite: (recipeId: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // Mock login - replace with real authentication
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      favoriteRecipes: [],
    };
    setUser(mockUser);
  };

  const register = async (email: string, password: string, name: string) => {
    // Mock registration - replace with real authentication
    const mockUser: User = {
      id: '1',
      email,
      name,
      favoriteRecipes: [],
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const toggleFavorite = (recipeId: number) => {
    if (!user) return;

    setUser(prev => {
      if (!prev) return prev;
      const favorites = prev.favoriteRecipes.includes(recipeId)
        ? prev.favoriteRecipes.filter(id => id !== recipeId)
        : [...prev.favoriteRecipes, recipeId];

      return {
        ...prev,
        favoriteRecipes: favorites,
      };
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, toggleFavorite }}>
      {children}
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