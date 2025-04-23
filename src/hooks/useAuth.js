"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getCookie, deleteCookie } from 'cookies-next';
import { useState, useEffect } from 'react';

export default function useAuth() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    // Access cookies safely on the client side
    const tokenCookie = getCookie('token');
    const userCookie = getCookie('currentUser');
    
    setToken(tokenCookie || null);
    setCurrentUser(userCookie ? JSON.parse(userCookie) : {});
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
    deleteCookie('currentUser');
    deleteCookie('token');
    setToken(null);
    setCurrentUser({});
    router.replace('/login');
  };

  return {
    token,
    currentUser,
    handleLogin,
    handleSignup,
    handleLogOut,
  };
}