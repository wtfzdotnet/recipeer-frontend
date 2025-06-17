import { ReactNode } from 'react';

/**
 * Authentication state interface
 */
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

/**
 * User interface for authenticated users
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

/**
 * Authentication context methods
 */
export interface AuthContextType extends AuthState {
  login: (email: string) => Promise<void>;
  logout: () => void;
  register: (email: string, name: string) => Promise<void>;
}

/**
 * AuthProvider Props
 */
export interface AuthProviderProps {
  children: ReactNode;
}