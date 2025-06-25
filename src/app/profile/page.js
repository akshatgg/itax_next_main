'use client';

import { useState } from 'react';
import UserProfile from '@/components/pagesComponents/profile/UserProfile';
import BusinessProfile from '@/components/pagesComponents/profile/BusinessProfile';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react'; // use any icon library or SVG

export default function ProfileIndex() {
  const [activetav, setActiveTab] = useState(1);
  const router = useRouter();

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  const handleBack = () => {
    router.back();
  };

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
        {activetav === 1 && <UserProfile />}
        {activetav === 2 && <BusinessProfile />}
      </div>
    </>
  );
}
