import { useState, useEffect } from 'react';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { User } from '../types';
import { AuthService } from '../services/authService';

interface AuthState {
  user: FirebaseUser | null;
  userData: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    userData: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await AuthService.getCurrentUserData();
          setAuthState({
            user: firebaseUser,
            userData,
            loading: false,
            error: null
          });
        } catch (error) {
          console.error('Error getting user data:', error);
          setAuthState({
            user: firebaseUser,
            userData: null,
            loading: false,
            error: 'Failed to load user data'
          });
        }
      } else {
        setAuthState({
          user: null,
          userData: null,
          loading: false,
          error: null
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const { user, userData } = await AuthService.login({ email, password });
      setAuthState({
        user,
        userData,
        loading: false,
        error: null
      });
      return { success: true };
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
      return { success: false, error: error.message };
    }
  };

  const signup = async (signupData: any) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const { user, userData } = await AuthService.signup(signupData);
      setAuthState({
        user,
        userData,
        loading: false,
        error: null
      });
      return { success: true };
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setAuthState({
        user: null,
        userData: null,
        loading: false,
        error: null
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  return {
    ...authState,
    login,
    signup,
    logout,
    isAuthenticated: !!authState.user
  };
};