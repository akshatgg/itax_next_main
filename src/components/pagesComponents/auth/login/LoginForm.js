// 'use client';
// import { useForm } from 'react-hook-form';
// import Link from 'next/link';
// import { I } from '@/components/iconify/I';
// import { setCookie } from 'cookies-next';
// import regex from '@/utils/regex';
// import { toast } from 'react-toastify';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import userbackAxios from '@/lib/userbackAxios';


// const formClassName = {
//   Label: 'text-sm font-medium',
//   Input: 'w-full py-2 px-3 mt-1 outline-none border focus:border-primary rounded',
// };

// export default function LoginForm() {
//   const router = useRouter();
//   const { register, handleSubmit } = useForm();
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const onLogin = async ({ email, password }) => {
//     try {
//       if (email && password) {
//         setLoading(true);
//         const response = await userbackAxios.post('/user/login', {
//           email,
//           password,

//         });
//           // const response = await userAxios.post('/api/auth/login', { email, password });
//           const { data } = response; // Extract data separately
//           console.log(data);                
        
//         console.log(data?.data?.token);
//         console.log(data?.data?.user);
        
//         if (response.status === 200 && data?.data?.token) {
//           setCookie('token', data.data.token);
//           setCookie('currentUser', data.data.user);
//           toast.success('Login successful');
//           console.log("login successsfully");
          
//           router.push('/');
//         } else {
//           toast.error(data.message);
//         }
//       }
//     } catch (error) {
//       console.log(error);

//       if (error.response && error.response.data) {
//         // Handle specific response errors
//         if (error.response.status === 301) {
//           toast.info(error.response.data.message);
//           router.push(`/verify-otp?email=${email}`);
//         } else {
//           toast.error(error.response.data.message || 'Something went wrong. Please try again.');
//         }
//       } else {
//         // Handle general network or unknown errors
//         toast.error('Something went wrong. Please try again later.');
//       }
//     } finally {
//       setLoading(false);     
      
//     }
//   };

//   return (
//     <form
//       className="shadow-lg bg-neutral-50 p-4 sm:max-w-sm mx-auto rounded-lg py-4 sm:p-8"
//       onSubmit={handleSubmit(onLogin)}
//     >
//       <h1 className="text-2xl font-bold text-center mb-8">Login</h1>
//       <ul className="grid gap-2">
//         <li>
//           <label className={formClassName.Label} htmlFor="email">
//             Email <span className="font-semibold text-red-600">*</span>
//           </label>
//           <input
//             type="email"
//             placeholder="📧 Enter your email address"
//             id="email"
//             className={formClassName.Input}
//             {...register('email', {
//               pattern: regex.EMAIL_RGX,
//               required: 'Email is required',
//             })}
//           />
//         </li>
//         <li className="relative">
//           <label className={formClassName.Label} htmlFor="password">
//             Password <span className="font-semibold text-red-600">*</span>
//           </label>
//           <div className="relative">
//             <input
//               type={isPasswordVisible ? 'text' : 'password'}
//               placeholder="🔑 Enter your password"
//               id="password"
//               className={formClassName.Input}
//               {...register('password', { required: 'Password is required' })}
//             />
//             <I
//               onClick={() => setIsPasswordVisible(!isPasswordVisible)}
//               icon={isPasswordVisible ? 'mdi:eye' : 'mdi:eye-off'}
//               className="select-none text-zinc-500 absolute top-[50%] right-[10px] translate-y-[-40%] text-xl cursor-pointer"
//             />
//           </div>
//         </li>
//       </ul>
//       <div className="pt-4 text-center">
//         <button className="py-2 px-4 w-[50%] bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl">
//           {loading ? (
//             <span className="inline-block w-4 h-4 border-white border-b-zinc-400 border-r-zinc-400 border-2 border-solid rounded-full animate-spin"></span>
//           ) : (
//             'Login'
//           )}
//         </button>
//       </div>
//       <div className="flex text-sm justify-center pt-2 font-semibold">
//         Forgot Password?
//         <Link className="ml-2 hover:underline text-blue-600" href="/reset-password">
//           Reset
//         </Link>
//       </div>
//       <div className="flex justify-center font-semibold text-sm">
//         Don&apos;t have an account?
//         <Link className="ml-2 hover:underline text-blue-600" href="/signup">
//           Signup
//         </Link>
//       </div>
//     </form>
//   );
// }

// export async function generateMetadata({ params }) {
//   return {
//     title: 'Img to PDF',
//   };
// }

// 'use client';
// import { useForm } from 'react-hook-form';
// import Link from 'next/link';
// import { I } from '@/components/iconify/I';
// import { setCookie } from 'cookies-next';
// import regex from '@/utils/regex';
// import { toast } from 'react-toastify';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import userbackAxios from '@/lib/userbackAxios';

// const formClassName = {
//   Label: 'text-sm font-medium',
//   Input:
//     'w-full py-2 px-3 mt-1 outline-none border rounded focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed',
//   Error: 'text-xs text-red-600 mt-1',
// };

// export default function LoginForm() {
//   const router = useRouter();
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const onLogin = async ({ email, password }) => {
//     if (loading) return;

//     try {
//       setLoading(true);

//       const EMAIL_RGX =
//         regex?.EMAIL_RGX instanceof RegExp
//           ? regex.EMAIL_RGX
//           : /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//       if (!EMAIL_RGX.test(email)) {
//         toast.error('Please enter a valid email address.');
//         return;
//       }
//       if (!password) {
//         toast.error('Password is required.');
//         return;
//       }

//       const response = await userbackAxios.post('/user/login', { email, password });
//       const { data } = response;

//       const token = data?.data?.token;
//       const user = data?.data?.user;

//       if (response.status === 200 && token) {
//         setCookie('token', token, { path: '/', sameSite: 'lax' });
//         setCookie('currentUser', JSON.stringify(user ?? {}), { path: '/', sameSite: 'lax' });

//         toast.success('Login successful');
//         router.push('/');
//       } else {
//         toast.error(data?.message || 'Login failed. Please try again.');
//       }
//     } catch (error) {
//       const status = error?.response?.status;
//       const message = error?.response?.data?.message;

//       if (status === 301) {
//         toast.info(message || 'Please verify your email to continue.');
//         const payloadEmail =
//           typeof error?.config?.data === 'string'
//             ? (() => {
//                 try { return JSON.parse(error.config.data)?.email || ''; }
//                 catch { return ''; }
//               })()
//             : error?.config?.data?.email || '';
//         router.push(`/verify-otp?email=${encodeURIComponent(payloadEmail)}`);
//       } else {
//         toast.error(message || 'Something went wrong. Please try again later.');
//       }
//       console.error('Login error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       className="shadow-lg bg-neutral-50 p-4 sm:max-w-sm mx-auto rounded-lg py-4 sm:p-8"
//       onSubmit={handleSubmit(onLogin)}
//       noValidate
//     >
//       <h1 className="text-2xl font-bold text-center mb-8">Login</h1>

//       <ul className="grid gap-3">
//         <li>
//           <label className={formClassName.Label} htmlFor="email">
//             Email <span className="font-semibold text-red-600">*</span>
//           </label>
//           <input
//             type="email"
//             placeholder="📧 Enter your email address"
//             id="email"
//             className={formClassName.Input}
//             disabled={loading}
//             {...register('email', {
//               required: 'Email is required',
//               pattern:
//                 regex?.EMAIL_RGX instanceof RegExp
//                   ? { value: regex.EMAIL_RGX, message: 'Enter a valid email address' }
//                   : { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
//             })}
//           />
//           {errors.email && <p className={formClassName.Error}>{errors.email.message}</p>}
//         </li>

//         <li>
//           <label className={formClassName.Label} htmlFor="password">
//             Password <span className="font-semibold text-red-600">*</span>
//           </label>
//           <div className="relative">
//             <input
//               type={isPasswordVisible ? 'text' : 'password'}
//               placeholder="🔑 Enter your password"
//               id="password"
//               className={formClassName.Input}
//               disabled={loading}
//               {...register('password', { required: 'Password is required' })}
//             />
//             <I
//               onClick={() => setIsPasswordVisible(v => !v)}
//               icon={isPasswordVisible ? 'mdi:eye' : 'mdi:eye-off'}
//               className="select-none text-zinc-500 absolute top-[50%] right-[10px] -translate-y-[40%] text-xl cursor-pointer"
//               role="button"
//               aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
//             />
//           </div>
//           {errors.password && <p className={formClassName.Error}>{errors.password.message}</p>}
//         </li>
//       </ul>

//       <div className="pt-4 text-center">
//         <button
//           type="submit"
//           disabled={loading}
//           className="py-2 px-4 w-[50%] bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl disabled:opacity-60 disabled:cursor-not-allowed"
//         >
//           {loading ? (
//             <span className="inline-block w-4 h-4 border-white border-b-zinc-400 border-r-zinc-400 border-2 border-solid rounded-full animate-spin" />
//           ) : (
//             'Login'
//           )}
//         </button>
//       </div>

//       <div className="flex text-sm justify-center pt-2 font-semibold">
//         Forgot Password?
//         <Link className="ml-2 hover:underline text-blue-600" href="/reset-password">
//           Reset
//         </Link>
//       </div>
//       <div className="flex justify-center font-semibold text-sm">
//         Don&apos;t have an account?
//         <Link className="ml-2 hover:underline text-blue-600" href="/signup">
//           Signup
//         </Link>
//       </div>
//     </form>
//   );
// }






'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
// If you want to avoid loading the icon lib, replace <I .../> with a simple <button>Show/Hide</button> below.
import { I } from '@/components/iconify/I';
import { setCookie } from 'cookies-next';
import regex from '@/utils/regex';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import userbackAxios from '@/lib/userbackAxios';

const formClassName = {
  Label: 'text-sm font-medium',
  Input:
    'w-full py-2 px-3 mt-1 outline-none border rounded focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed',
  Error: 'text-xs text-red-600 mt-1',
};

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Stable, precomputed regex to avoid re-creating every render
  const EMAIL_RGX = useMemo(
    () =>
      regex?.EMAIL_RGX instanceof RegExp
        ? regex.EMAIL_RGX
        : /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    []
  );

  // Abort in-flight request when component unmounts
  const abortRef = useRef(null);
  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const onLogin = useCallback(
    async ({ email, password }) => {
      // react-hook-form provides isSubmitting; no need for extra state
      if (!EMAIL_RGX.test(email)) {
        toast.error('Please enter a valid email address.');
        return;
      }
      if (!password) {
        toast.error('Password is required.');
        return;
      }

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await userbackAxios.post(
          '/user/login',
          { email, password },
          { signal: controller.signal }
        );
        const { data } = response;

        const token = data?.data?.token;
        const user = data?.data?.user;

        if (response.status === 200 && token) {
          // keep cookie light: only store what you actually need on client
          const lightUser = user
            ? {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                userType: user.userType,
                verified: user.verified,
              }
            : {};

          setCookie('token', token, { path: '/', sameSite: 'lax' });
          setCookie('currentUser', JSON.stringify(lightUser), {
            path: '/',
            sameSite: 'lax',
          });

          toast.success('Login successful');
          router.push('/');
        } else {
          toast.error(data?.message || 'Login failed. Please try again.');
        }
      } catch (error) {
        // Ignore abort errors
        if (error?.name === 'CanceledError' || error?.name === 'AbortError') return;

        const status = error?.response?.status;
        const message = error?.response?.data?.message;

        if (status === 301) {
          toast.info(message || 'Please verify your email to continue.');
          router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
        } else {
          toast.error(message || 'Something went wrong. Please try again later.');
        }
      } finally {
        abortRef.current = null;
      }
    },
    [EMAIL_RGX, router]
  );

  return (
    <form
      className="shadow-lg bg-neutral-50 p-4 sm:max-w-sm mx-auto rounded-lg py-4 sm:p-8"
      onSubmit={handleSubmit(onLogin)}
      noValidate
    >
      <h1 className="text-2xl font-bold text-center mb-8">Login</h1>

      <ul className="grid gap-3">
        <li>
          <label className={formClassName.Label} htmlFor="email">
            Email <span className="font-semibold text-red-600">*</span>
          </label>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="📧 Enter your email address"
            id="email"
            className={formClassName.Input}
            disabled={isSubmitting}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: EMAIL_RGX,
                message: 'Enter a valid email address',
              },
            })}
          />
          {errors.email && <p className={formClassName.Error}>{errors.email.message}</p>}
        </li>

        <li>
          <label className={formClassName.Label} htmlFor="password">
            Password <span className="font-semibold text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="🔑 Enter your password"
              id="password"
              className={formClassName.Input}
              disabled={isSubmitting}
              {...register('password', { required: 'Password is required' })}
            />
            <I
              onClick={() => setIsPasswordVisible((v) => !v)}
              icon={isPasswordVisible ? 'mdi:eye' : 'mdi:eye-off'}
              className="select-none text-zinc-500 absolute top-[50%] right-[10px] -translate-y-[40%] text-xl cursor-pointer"
              role="button"
              aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            />
          </div>
          {errors.password && <p className={formClassName.Error}>{errors.password.message}</p>}
        </li>
      </ul>

      <div className="pt-4 text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="py-2 px-4 w-[50%] bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="inline-block w-4 h-4 border-white border-b-zinc-400 border-r-zinc-400 border-2 border-solid rounded-full animate-spin" />
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
