'use client';

import { useState, lazy, Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react'; // use any icon library or SVG

// Lazy load the profile components for better performance
const UserProfile = lazy(() => import('@/components/pagesComponents/profile/UserProfile'));
const BusinessProfile = lazy(() => import('@/components/pagesComponents/profile/BusinessProfile'));

export default function ProfileIndex() {
  const [activetav, setActiveTab] = useState(1);
  const router = useRouter();

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  const handleBack = () => {
    router.back();
  };

  // Prefetch the inactive tab after the active one has loaded
  useEffect(() => {
    // Set a small delay to prioritize current tab rendering
    const timer = setTimeout(() => {
      if (activetav === 1) {
        // Prefetch BusinessProfile if we're on UserProfile
        import('@/components/pagesComponents/profile/BusinessProfile');
      } else {
        // Prefetch UserProfile if we're on BusinessProfile
        import('@/components/pagesComponents/profile/UserProfile');
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [activetav]);

  // Component for tab content loading state
  const TabContentLoading = () => (
    <div className="w-full h-64 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500">Loading profile data...</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Header Row with Back Arrow + Tabs */}
      <div className="flex justify-between items-center px-4 border-b border-gray-200 dark:border-gray-700">
        {/* Back Arrow */}
        <button
          onClick={handleBack}
          className="text-blue-600 dark:text-blue-400 p-3 hover:scale-110 transition"
        >
          <ArrowLeft size={28} />
        </button>

        {/* Tabs */}
        <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <ul className="flex space-x-4">
            <li>
              <button
                className={
                  activetav === 1
                    ? 'p-2 text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                    : 'p-2 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }
                onClick={() => handleTab(1)}
              >
                User Profile
              </button>
            </li>
            <li>
              <button
                className={
                  activetav === 2
                    ? 'p-2 text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                    : 'p-2 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }
                onClick={() => handleTab(2)}
              >
                Business Profile
              </button>
            </li>
          </ul>
        </div>

        {/* Spacer to balance layout */}
        <div className="w-[40px]"></div>
      </div>

      {/* Tab Content */}
      <div className="w-[min(1100px,90%)] mx-auto mt-6">
        <Suspense fallback={<TabContentLoading />}>
          {activetav === 1 && <UserProfile />}
          {activetav === 2 && <BusinessProfile />}
        </Suspense>
      </div>
    </>
  );
}
