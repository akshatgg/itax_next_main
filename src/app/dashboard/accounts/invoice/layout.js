'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
// import Breadcrumb from '@/components/navigation/Breadcrumb';
import Link from 'next/link';
import BackButton from '@/components/pagesComponents/dashboard/BackButton';

const sidebarItems = [
  {
    upcoming: false,
    title: 'overview',
    linkTo: '/dashboard/accounts/invoice',
    iconName: 'material-symbols:dashboard',
  },
  {
    upcoming: false,
    title: 'create invoice',
    linkTo: '#',
    iconName: 'oui:dot',
    subMenuItems: [
      {
        upcoming: false,
        title: 'sales',
        linkTo: '/dashboard/accounts/invoice/sales',
        iconName: 'mdi:cart-sale',
      },
      {
        upcoming: false,
        title: 'purchase',
        linkTo: '/dashboard/accounts/invoice/purchase',
        iconName: 'carbon:purchase',
      },
      {
        upcoming: false,
        title: 'expenses',
        linkTo: '/dashboard/accounts/invoice/expense',
        iconName: 'mdi:cash-return',
      },
    ],
  },
  {
    upcoming: false,
    title: 'manage inventory',
    linkTo: '#',
    iconName: 'oui:dot',
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
    upcoming: false,
    title: 'others',
    linkTo: '#',
    iconName: 'oui:dot',
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

function SidebarToggle({ isSidebarOpen, handleSidebar }) {
  return (
    <div
      className="
			sticky top-0 pt-2
			w-full 
			text-2xl font-bold
            pl-3
            my-3
             shadow-md
             bg-neutral-50 text-blue-500
			"
    >
      <button onClick={handleSidebar}>
        <Icon className="rounded-sm" icon="pepicons-pop:menu" />
      </button>
    </div>
  );
}

function SideBarItem(props) {
  const { data } = props;
  if (data.subMenuItems) {
    return (
      <li className="grid gap-2 mt-4">
        <div className="pt-2 uppercase font-light ml-3 flex items-center gap-2 ">
          <span className="mr-6 bg-blue-500 text-neutral-50 rounded-full text-lg p-1">
            <Icon icon={data.iconName} />
          </span>
          <span className="text-sm">{data.title}</span>
        </div>
        <ul className="grid gap-2 p-1">
          {data.subMenuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.linkTo}
                className="ml-2 flex items-center gap-2 font-medium capitalize"
              >
                <span className="mr-6 bg-blue-500 text-neutral-50 rounded-full text-lg p-1">
                  <Icon icon={item.iconName} />
                </span>
                <span className="text-sm">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </li>
    );
  }
  return (
    <li>
      <Link
        href={data.linkTo}
        className="uppercase font-light ml-3 flex items-center gap-2"
      >
        <span className="mr-6 bg-neutral-50 text-blue-500 rounded-full text-lg p-1">
          <Icon icon={data.iconName} />
        </span>
        <span className="text-sm">{data.title}</span>
      </Link>
    </li>
  );
}
function AccountSideBar(props
  // import ClientWrapper from '@/components/ClientWrapper';
  // import InvoiceDashboard_Index from '@/components/pagesComponents/dashboard/accounts/invoice/InvoiceDashboard_index';
  // import Invoice_Dashboard from '@/components/pagesComponents/dashboard/superAdmin/accounts/invoice/Invoice_Dashboard';
  // import { getBusinessProfile } from '@/hooks/authProvider';
  // import { getUserOnServer } from '@/lib/getServerSideToken';
  // import { USER_ROLES } from '@/utils/globals';
  
  // export default async function InvoicePage() {
  //   const user = getUserOnServer();
  //   const businessProfile = await getBusinessProfile();
  
  //   const isSuperAdmin = user?.userType === USER_ROLES.superAdmin;
  
  //   return (
  //     <>
  //       {isSuperAdmin ? (
  //         <Invoice_Dashboard />
  //       ) : (
  //         <InvoiceDashboard_Index
  //           businessProfile={businessProfile?.response?.data?.profile}
  //         />
  //       )}
  //     </>
  //   );
  // }
  ) {
  const { data, isSidebarOpen, handleSidebar, className } = props;
  const [activeItem, setActiveItem] = useState(0);

  // const handleActive = (e) => {
  //   if (activeItem == e) {
  //     return setActiveItem(null);
  //   }
  //   setActiveItem(e);
  // };

  return (
    <>
      <div
        className={`
                    transition-width duration-300
                    ${isSidebarOpen ? 'w-[14rem]' : ' w-[4rem]'}
                    hover:w-[16rem]
                    border
                    overflow-hidden
                    bg-neutral-50 text-blue-500
                    ${className}
                `}
      >
        <nav
          className={`
                        transition-transform duration-500
                        overflow-y-auto
                        overflow-x-hidden
                        pb-28 pl-1
                        h-full
                        w-[16rem]
                        relative
                    `}
        >
          <SidebarToggle
            isSidebarOpen={isSidebarOpen}
            handleSidebar={handleSidebar}
          />
          <ul>
            {data.map((item, index) => (
              <SideBarItem key={index} data={item} />
            ))}
          </ul>
        </nav>
      </div>
      <div
        onClick={handleSidebar}
        className={` ${isSidebarOpen ? 'lg:hidden absolute inset-[0_0_0_0] z-30 ' : 'hidden'}`}
      ></div>
    </>
  );
}
export default function AccountLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* <div className="grid lg:grid-cols-[0fr,1fr] grid-cols-1 min-h-screen w-screen"> */}
      <AccountSideBar
        data={sidebarItems}
        className="z-40 fixed inset-[0,auto,0,0] h-screen"
        isSidebarOpen={isSidebarOpen}
        handleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />
      <main className={` ${isSidebarOpen ? 'lg:pl-[16rem]' : ''} pl-[4rem]`}>
        <BackButton />
        {/* <Breadcrumb /> */}
        {children}
      </main>
      {/* </div> */}
    </>
  );
}
