'use client';

import { useState } from 'react';
import UserProfile from '@/components/pagesComponents/profile/UserProfile';
import BusinessProfile from '@/components/pagesComponents/profile/BusinessProfile';

export default function ProfileIndex() {
  const [activetav, setActiveTab] = useState(1);

  const handleTab = (e) => {
    setActiveTab(e);
  };

  return (
    <>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap justify-center">
          <li className="me-2">
            <button
              className={
                activetav === 1
                  ? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg  dark:text-blue-500 dark:border-blue-500'
                  : 'inline-block p-4  border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              }
              onClick={(e) => handleTab(1)}
            >
              User Profile
            </button>
          </li>
          <li className="me-2">
            <button
              className={
                activetav === 2
                  ? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg  dark:text-blue-500 dark:border-blue-500'
                  : 'inline-block p-4  border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              }
              onClick={(e) => handleTab(2)}
            >
              Business Profile
            </button>
          </li>
        </ul>
      </div>
      <div className="w-[min(1100px,90%)] mx-auto">
        {activetav === 1 && (
          <>
            <UserProfile />
          </>
        )}
        {activetav === 2 && (
          <>
            <BusinessProfile />
          </>
        )}
      </div>
    </>
  );
}
