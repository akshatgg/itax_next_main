'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { I } from '@/components/iconify/I';
import { setCookie } from 'cookies-next';
import regex from '@/utils/regex';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import userbackAxios from '@/lib/userbackAxios';
import useAuth from '@/hooks/useAuth.js';

const formClassName = {
  Label: 'text-sm font-medium',
  Input: 'w-full py-2 px-3 mt-1 outline-none border focus:border-primary rounded',
};

export default function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token, currentUser, handleLogin: authLogin } = useAuth();

  const onLogin = async ({ email, password }) => {
    try {
      if (email && password) {
        setLoading(true);
        
        // First use the shared auth hook's login function to update the global auth state
        const formData = { email, password };
        const authResponse = await authLogin(formData);
        
        // Then proceed with normal login flow
        const response = await userbackAxios.post('/user/login', {
          email,
          password,
        });
        const { data } = response; // Extract data separately

        if (response.status === 200 && data?.data?.token) {
          // Set cookies (already done in the authLogin function, but doing again for redundancy)
          const token = data.data.token;
          const user = data.data.user;
          
          setCookie('token', token);
          setCookie('currentUser', JSON.stringify(user));
          toast.success('Login successful');

          // Use a more specific CustomEvent with user data for immediate access
          const authEvent = new CustomEvent('auth-state-changed', { 
            detail: { token, user, loggedIn: true } 
          });
          window.dispatchEvent(authEvent);
          
          // Also dispatch a cart update event
          window.dispatchEvent(new Event('cart-update'));
          
          // Update localStorage to force refresh across tabs
          localStorage.setItem('auth_timestamp', Date.now().toString());
          
          // Pre-fetch cart data
          try {
            // Try to pre-fetch cart data silently
            Promise.all([
              userbackAxios.get('/cart/'),
              userbackAxios.get('/cartStartup/')
            ]).then(([serviceResponse, startupResponse]) => {
              const serviceCount = serviceResponse.data?.services?.length || 0;
              const startupCount = startupResponse.data?.itemCount || 0;
              const totalCount = serviceCount + startupCount;
              
              // Store cart count in localStorage for immediate access
              localStorage.setItem('cart_count', totalCount.toString());
              
              // Dispatch another cart update event with the actual count
              const cartEvent = new CustomEvent('cart-count-update', { 
                detail: { count: totalCount } 
              });
              window.dispatchEvent(cartEvent);
            }).catch(() => {
              // Silent catch - don't disrupt the login flow
            });
          } catch (e) {
            // Ignore errors here - don't disrupt login flow
          }
          
          // Small delay to ensure state is updated before navigation
          setTimeout(() => {
            // Force a state update before navigation
            router.refresh(); // Refresh the current route's data
            router.push('/');
          }, 100);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data) {
        // Handle specific response errors
        if (error.response.status === 301) {
          toast.info(error.response.data.message);
          router.push(`/verify-otp?email=${email}`);
        } else {
          toast.error(error.response.data.message || 'Something went wrong. Please try again.');
        }
      } else {
        // Handle general network or unknown errors
        toast.error('Something went wrong. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="shadow-lg bg-neutral-50 p-4 sm:max-w-sm mx-auto rounded-lg py-4 sm:p-8"
      onSubmit={handleSubmit(onLogin)}
    >
      <h1 className="text-2xl font-bold text-center mb-8">Login</h1>
      <ul className="grid gap-2">
        <li>
          <label className={formClassName.Label} htmlFor="email">
            Email <span className="font-semibold text-red-600">*</span>
          </label>
          <input
            type="email"
            placeholder="📧 Enter your email address"
            id="email"
            className={formClassName.Input}
            {...register('email', {
              pattern: regex.EMAIL_RGX,
              required: 'Email is required',
            })}
          />
        </li>
        <li className="relative">
          <label className={formClassName.Label} htmlFor="password">
            Password <span className="font-semibold text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="🔑 Enter your password"
              id="password"
              className={formClassName.Input}
              {...register('password', { required: 'Password is required' })}
            />
            <I
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              icon={isPasswordVisible ? 'mdi:eye' : 'mdi:eye-off'}
              className="select-none text-zinc-500 absolute top-[50%] right-[10px] translate-y-[-40%] text-xl cursor-pointer"
            />
          </div>
        </li>
      </ul>
      <div className="pt-4 text-center">
        <button className="py-2 px-4 w-[50%] bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl">
          {loading ? (
            <span className="inline-block w-4 h-4 border-white border-b-zinc-400 border-r-zinc-400 border-2 border-solid rounded-full animate-spin"></span>
          ) : (
            'Login'
          )}
        </button>
      </div>
      <div className="flex text-sm justify-center pt-2 font-semibold">
        Forgot Password?
        <Link className="ml-2 hover:underline text-blue-600" href="/reset-password">
          Reset
        </Link>
      </div>
      <div className="flex justify-center font-semibold text-sm">
        Don&apos;t have an account?
        <Link className="ml-2 hover:underline text-blue-600" href="/signup">
          Signup
        </Link>
      </div>
    </form>
  );
}

export async function generateMetadata({ params }) {
  return {
    title: 'Img to PDF',
  };
}
