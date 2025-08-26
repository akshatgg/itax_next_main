'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileLayout({ children }) {
  const router = useRouter();
  // Use a ref to track if the component is mounted
  const isMountedRef = useRef(true);
  // Use a ref to store the AbortController
  const prefetchControllerRef = useRef(null);

  // Prefetch related routes for faster subsequent navigation
  useEffect(() => {
    // Mark this page type for performance optimization
    window._isSpecialPage = true;
    window._pageType = 'profile';
    
    // Optimize performance by temporarily disabling non-critical animations
    document.documentElement.classList.add('optimize-performance');
    document.documentElement.classList.add('profile-page');
    
    // Prefetch API data endpoints
    prefetchControllerRef.current = new AbortController();
    const signal = prefetchControllerRef.current.signal;
    
    // Use an async function to properly handle fetch errors
    const prefetchData = async () => {
      try {
        // Use fetch with low priority to prefetch common API endpoints
        await fetch('/api/user/profile', { 
          signal,
          priority: 'low',
          credentials: 'same-origin'
        });
      } catch (err) {
        // Only log if it's not an abort error
        if (err.name !== 'AbortError' && isMountedRef.current) {
          console.debug('Prefetch error (non-critical):', err);
        }
      }
    };
    
    // Start the prefetch
    prefetchData();
    
    return () => {
      // Clean up when navigating away
      document.documentElement.classList.remove('optimize-performance');
      document.documentElement.classList.remove('profile-page');
      window._isSpecialPage = false;
      window._pageType = '';
      
      // Mark component as unmounted
      isMountedRef.current = false;
      
      // Safely abort any in-progress fetch
      if (prefetchControllerRef.current) {
        try {
          prefetchControllerRef.current.abort();
        } catch (err) {
          // Ignore abort errors
          console.debug('Abort cleanup (non-critical)');
        }
      }
    };
  }, []);

  return (
    <div className="profile-container">
      {children}
    </div>
  );
}
