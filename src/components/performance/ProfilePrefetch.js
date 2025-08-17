'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useStrategicPrefetch } from '@/utils/prefetchStrategies';

/**
 * ProfilePrefetch Component
 * 
 * This component adds profile page prefetching when users hover over profile links
 * or perform actions that might lead to profile navigation.
 */
export default function ProfilePrefetch() {
  const router = useRouter();
  const pathname = usePathname();
  const { prefetchRoute } = useStrategicPrefetch();
  
  // Don't prefetch if we're already on the profile page
  const isProfilePage = pathname === '/profile';
  
  // Function to prefetch profile page
  const handlePrefetchProfile = useCallback(() => {
    if (!isProfilePage) {
      prefetchRoute('/profile');
    }
  }, [isProfilePage, prefetchRoute]);
  
  // Set up event listeners for prefetching
  useEffect(() => {
    // Only set up listeners if we're not already on the profile page
    if (isProfilePage) return;
    
    // Reference to track component mount state
    const isMounted = { current: true };
    
    // Find elements that might lead to profile navigation
    const profileLinks = document.querySelectorAll('a[href*="profile"], button[data-navigate="profile"]');
    const userAvatars = document.querySelectorAll('.user-avatar, .profile-icon');
    
    // Set up prefetch on hover/focus for these elements
    const elementsToWatch = [...profileLinks, ...userAvatars];
    
    const handleHover = () => {
      // Only trigger if component is still mounted
      if (isMounted.current) {
        handlePrefetchProfile();
      }
    };
    
    elementsToWatch.forEach(el => {
      el.addEventListener('mouseover', handleHover, { once: true });
      el.addEventListener('focus', handleHover, { once: true });
    });
    
    // Clean up event listeners
    return () => {
      // Mark as unmounted to prevent any late callbacks
      isMounted.current = false;
      
      elementsToWatch.forEach(el => {
        try {
          el.removeEventListener('mouseover', handleHover);
          el.removeEventListener('focus', handleHover);
        } catch (err) {
          // Safely ignore any cleanup errors
        }
      });
    };
  }, [isProfilePage, handlePrefetchProfile]);
  
  // This is a client component but doesn't render anything visible
  return null;
}
