'use client';

import dynamic from 'next/dynamic';
import { memo } from 'react';
import { Icon } from '@iconify/react';
import {
  invoiceDashboardNavItems,
  EinvoiceDashboardNavItems,
} from './staticData';

// 🔹 Lazy load heavy subcomponents
const GridContainer = dynamic(
  () => import('@/components/pagesComponents/grid/GridContainer'),
  { ssr: false },
);
const GridItem = dynamic(
  () => import('@/components/pagesComponents/grid/GridItem'),
  { ssr: false },
);
const DashSection = dynamic(
  () => import('@/components/pagesComponents/pageLayout/DashSection'),
  { ssr: false },
);

function InvoiceDashboardNavItem({ navCardData, einvoice }) {
  const navItems = einvoice
    ? EinvoiceDashboardNavItems
    : invoiceDashboardNavItems;
  const dashboardTitle = einvoice ? 'E-Invoice Overview' : 'Invoice Overview';

  return (
    <DashSection
      className="mt-4"
      title={dashboardTitle}
      titleRight="Current Year - 2025"
    >
      <GridContainer className="p-4">
        {navItems.map(({ icon, cssClass, title, linkTo }, idx) => {
          const list = navCardData[title] || [];
          const totalAmount = list.reduce(
            (sum, inv) => sum + (inv.totalAmount || 0),
            0,
          );

          // 🔹 Cash/Bank special calculation
          const cashBankAmount =
            (navCardData.sale || []).reduce(
              (sum, inv) => sum + inv.totalAmount,
              0,
            ) -
            (navCardData.purchase || []).reduce(
              (sum, inv) => sum + inv.totalAmount,
              0,
            );

          return (
            <GridItem key={idx} href={`/dashboard/accounts/invoice/${linkTo}`}>
              <div className="grid justify-center sm:w-1/2 w-1/5">
                <Icon
                  icon={icon}
                  className={`rounded-xl sm:h-16 sm:w-16 sm:p-3 h-14 w-14 p-3 ${cssClass}`}
                />
              </div>
              <div>
                <p className="text-lg sm:w-full capitalize">
                  {title} - {list.length}
                </p>

                {['invoice', 'sale', 'purchase'].includes(title) && (
                  <p className="font-normal">&#8377;{totalAmount}</p>
                )}

                {title === 'cash/bank' && (
                  <p className="font-normal">&#8377;{cashBankAmount}</p>
                )}
              </div>
            </GridItem>
          );
        })}
      </GridContainer>
    </DashSection>
  );
}

export default memo(InvoiceDashboardNavItem);
