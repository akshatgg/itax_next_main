"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getCookie, deleteCookie, setCookie } from 'cookies-next';
import { useState, useEffect } from 'react';
import userbackAxios from '@/lib/userbackAxios';

export default function useAuth() {

  const router = useRouter();
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [authInitialized, setAuthInitialized] = useState(false);

  // Function to check if token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  // Function to handle logout and redirect
  const handleAutoLogout = () => {
    deleteCookie('currentUser');
    deleteCookie('token');
    setToken(null);
    setCurrentUser({});
    router.replace('/login');
  };

  useEffect(() => {
    // Function to check authentication state from cookies
    const checkAuthState = () => {
      // Access cookies safely on the client side
      const tokenCookie = getCookie('token');
      const userCookie = getCookie('currentUser');
      
      // Check if token exists and is not expired
      if (tokenCookie && !isTokenExpired(tokenCookie)) {
        setToken(tokenCookie);
        try {
          setCurrentUser(userCookie ? JSON.parse(userCookie) : {});
        } catch (e) {
          console.error('Error parsing user cookie:', e);
          // If user cookie is invalid, try to recover by not crashing
          setCurrentUser({});
        }
      } else if (tokenCookie && isTokenExpired(tokenCookie)) {
        // Token is expired, auto logout
        handleAutoLogout();
      }
      setAuthInitialized(true);
    };

    // Initial check
    checkAuthState();

    // Setup event listener for storage changes (in case of login/logout in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'currentUser') {
        checkAuthState();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Periodic check for token expiration (every minute)
    const intervalId = setInterval(() => {
      const tokenCookie = getCookie('token');
      if (tokenCookie && isTokenExpired(tokenCookie)) {
        handleAutoLogout();
      }
    }, 60000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set up axios interceptor to handle 401 responses
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          handleAutoLogout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (formData) => {
    try {
      const response = await userbackAxios.post('/user/login', {
        email: formData.email,
        password: formData.password,
      });
      
      // Immediately update auth state when login succeeds
      if (response.status === 200 && response.data?.data?.token) {
        // Get the correct token and user from the nested data structure
        const token = response.data.data.token;
        const user = response.data.data.user;
        
        // Update the auth state immediately
        setToken(token);
        setCurrentUser(user || {});
        setAuthInitialized(true);
        
        // Also update cookies for persistence
        setCookie('token', token);
        setCookie('currentUser', JSON.stringify(user));
        
        // Dispatch a custom event to notify components about the auth state change
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('auth-state-changed'));
        }
      }
      
      return response;
    } catch (error) {
      return error;
    }
  };

  const handleSignup = async (formData) => {
    try {
      const response = await axios.post('/user/sign-up', {
        ...formData,
      });
      return response;
    } catch (error) {
      return error;
    }
  };

  const handleLogOut = async () => {
    handleAutoLogout();
  };

  return {
    token,
    currentUser,
    handleLogin,
    handleSignup,
    handleLogOut,
    isTokenExpired: () => isTokenExpired(token),
    authInitialized, // Export this state to know when auth check is complete
  };
}