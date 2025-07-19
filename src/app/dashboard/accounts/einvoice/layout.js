'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import BackButton from '@/components/pagesComponents/dashboard/BackButton';
import SideBar from '@/components/pagesComponents/dashboard/sidebar/SideBar';
import Loader from '@/components/partials/loading/Loader.js';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  {
    upcoming: false,
    title: 'overview',
    linkTo: '/dashboard/accounts/invoice',
    iconName: 'material-symbols:dashboard',
    subMenu: false,
  },
  {
    upcoming: true,
    title: 'create einvoice',
    linkTo: '#',
    iconName: 'oui:dot',
    subMenu: false,
    // subMenuItems: [
    //   {
    //     upcoming: false,
    //     title: 'sales',
    //     linkTo: '/dashboard/accounts/invoice/sales',
    //     iconName: 'mdi:cart-sale',
    //   },
    //   {
    //     upcoming: false,
    //     title: 'purchase',
    //     linkTo: '/dashboard/accounts/invoice/purchase',
    //     iconName: 'carbon:purchase',
    //   },
    //   {
    //     upcoming: false,
    //     title: 'expenses',
    //     linkTo: '/dashboard/accounts/invoice/expense',
    //     iconName: 'mdi:cash-return',
    //   },
    // ],
  },
  {
    upcoming: false,
    title: 'manage inventory',
    linkTo: '#',
    iconName: 'oui:dot',
    subMenu: true,
    subMenuItems: [
      {
        upcoming: false,
        title: 'Items',
        linkTo: '/dashboard/accounts/invoice/items',
        iconName: 'solar:box-broken',
      },
    ],
  },
  {
    upcoming: false,
    title: 'parties',
    linkTo: '#',
    iconName: 'oui:dot',
    subMenu: true,
    subMenuItems: [
      {
        upcoming: false,
        title: 'all parties',
        linkTo: '/dashboard/accounts/invoice/parties',
        iconName: 'eva:person-fill',
      },
      {
        upcoming: false,
        title: 'customers',
        linkTo: '/dashboard/accounts/invoice/parties/customer',
        iconName: 'eva:person-fill',
      },
      {
        upcoming: false,
        title: 'supplier',
        linkTo: '/dashboard/accounts/invoice/parties/supplier',
        iconName: 'eva:person-outline',
      },
    ],
  },
  {
    upcoming: true,
    title: 'others',
    linkTo: '#',
    iconName: 'oui:dot',
    subMenu: true,
    subMenuItems: [
      {
        upcoming: false,
        title: 'reports',
        linkTo: '#',
        iconName: 'tabler:report',
      },
      {
        upcoming: false,
        title: 'settings',
        linkTo: '#',
        iconName: 'uil:setting',
      },
    ],
  },
];

export default function AccountLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  return (
    <>
      {/* Global loader overlay */}
      {isNavigating && (
        <div className="fixed inset-0 bg-white/60 z-50 flex items-center justify-center">
          <Loader />
        </div>
      )}
      <SideBar
        data={sidebarItems}
        isSidebarOpen={isSidebarOpen}
        handleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        setIsNavigating={setIsNavigating}
        topOffset={"3 rem"}
      />

      {/* Overlay for mobile when sidebar is open */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={` ${isSidebarOpen ? 'lg:hidden fixed inset-0 z-30 bg-black bg-opacity-30' : 'hidden'}`}
      ></div>

      <main className={`${isSidebarOpen ? 'lg:pl-[16rem]' : ''} pl-[4rem]`}>
        <BackButton />
        {children}
      </main>
    </>
  );
}
