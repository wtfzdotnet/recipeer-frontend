import React, { useState, useEffect } from 'react';
import { AuthContext } from './context';
import type { AuthState, User, AuthContextType, AuthProviderProps } from './types';

/**
 * Authentication provider component
 * Manages user authentication state and provides auth methods
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem('recipeer_user');
        const storedToken = localStorage.getItem('recipeer_token');
        
        if (storedUser && storedToken) {
          const user = JSON.parse(storedUser);
          setAuthState({
            isAuthenticated: true,
            user,
            isLoading: false,
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setAuthState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login method - placeholder implementation
   */
  const login = async (email: string): Promise<void> => {
    try {
      // TODO: Replace with actual API call
      // For now, simulate login with demo user
      const mockUser: User = {
        id: 'demo-user',
        email: email,
        name: 'Demo User',
        avatar: undefined,
      };

      const mockToken = 'demo-token-123';

      // Store in localStorage
      localStorage.setItem('recipeer_user', JSON.stringify(mockUser));
      localStorage.setItem('recipeer_token', mockToken);

      setAuthState({
        isAuthenticated: true,
        user: mockUser,
        isLoading: false,
      });
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    }
  };

  /**
   * Logout method
   */
  const logout = (): void => {
    localStorage.removeItem('recipeer_user');
    localStorage.removeItem('recipeer_token');
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
  };

  /**
   * Register method - placeholder implementation
   */
  const register = async (email: string, name: string): Promise<void> => {
    try {
      // TODO: Replace with actual API call
      // For now, simulate registration
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email: email,
        name: name,
        avatar: undefined,
      };

      const mockToken = `token-${Date.now()}`;

      // Store in localStorage
      localStorage.setItem('recipeer_user', JSON.stringify(mockUser));
      localStorage.setItem('recipeer_token', mockToken);

      setAuthState({
        isAuthenticated: true,
        user: mockUser,
        isLoading: false,
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    }
  };

  const contextValue: AuthContextType = {
    ...authState,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};