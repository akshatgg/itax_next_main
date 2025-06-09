"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getCookie, deleteCookie } from 'cookies-next';
import { useState, useEffect } from 'react';

export default function useAuth() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

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
    // Access cookies safely on the client side
    const tokenCookie = getCookie('token');
    const userCookie = getCookie('currentUser');
    
    // Check if token exists and is not expired
    if (tokenCookie && !isTokenExpired(tokenCookie)) {
      setToken(tokenCookie);
      setCurrentUser(userCookie ? JSON.parse(userCookie) : {});
    } else if (tokenCookie && isTokenExpired(tokenCookie)) {
      // Token is expired, auto logout
      handleAutoLogout();
    }
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
  }, []);

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post('/users/login', {
        email: formData.email,
        password: formData.password,
      });
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
  };
}