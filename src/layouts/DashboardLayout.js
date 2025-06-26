'use client';

import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { USER_ROLES } from '@/utils/globals';
import { usePathname } from 'next/navigation';
import { DashboardSidebarItemsData } from './staticData.js';
import Navbar from '@/components/partials/topNavbar/Navbar.js';
import BackButton from '@/components/pagesComponents/dashboard/BackButton';
import SideBar from '@/components/pagesComponents/dashboard/sidebar/SideBar';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const { currentUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebar = () => setIsSidebarOpen((prev) => !prev);

  if (pathname.startsWith('/dashboard/accounts/invoice')) {
    return <>{children}</>;
  }

  const userType = currentUser?.userType;

  const getSidebarByRole = {
    [USER_ROLES.normal]: DashboardSidebarItemsData.normal,
    [USER_ROLES.admin]: DashboardSidebarItemsData.admin,
    [USER_ROLES.superAdmin]: DashboardSidebarItemsData.superAdmin,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - fixed */}
      <SideBar
        data={getSidebarByRole[userType]}
        userType={userType}
        isSidebarOpen={isSidebarOpen}
        handleSidebar={handleSidebar}
      />

      {/* Top Navbar - full width, sticky */}
      <Navbar handleSidebar={handleSidebar} isSidebarOpen={isSidebarOpen} />

      {/* Main content area - padded left based on sidebar */}
      <main
        className={`
          ${isSidebarOpen ? 'lg:pl-64' : 'lg:pl-16'}
          pt-[60px]  /* adjust if your TopNavbar height differs */
          px-4
          transition-all duration-200
        `}
      >
        <BackButton />
        {children}
      </main>
    </div>
  );
}
