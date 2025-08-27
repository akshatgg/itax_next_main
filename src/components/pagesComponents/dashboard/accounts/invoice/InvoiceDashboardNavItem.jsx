'use client';
import GridContainer from '@/components/pagesComponents/grid/GridContainer';
import GridItem from '@/components/pagesComponents/grid/GridItem';
import DashSection from '@/components/pagesComponents/pageLayout/DashSection';
import { Icon } from '@iconify/react';
import {invoiceDashboardNavItems,EinvoiceDashboardNavItems} from './staticData';
import { InputStyles } from '@/app/styles/InputStyles';

function InvoiceDashboardNavItem({ navCardData, einvoice }) {
  const navItems = einvoice ? EinvoiceDashboardNavItems : invoiceDashboardNavItems;
  const dashboardTitle = einvoice ? 'E-Invoice Overview' : 'Invoice Overview';
  return (
    <DashSection
      className="mt-2 pl-4"
      title={
        <span
          className={InputStyles.sectionTitle}
        >{dashboardTitle}</span>
      }
      titleRight={
        <span
          className={InputStyles.sectionTitle}
        >{new Date().getFullYear()}</span>
      }
    >
      <GridContainer className="p-2">
        {navItems.map((el, key) => (
          <GridItem
            key={key}
            href={`/dashboard/accounts/invoice/${el?.linkTo}`}
          >
            <div
            // className="grid justify-center sm:w-1/2 w-1/5"
            >
              <Icon
                icon={el?.icon}
                className={`rounded-xl sm:h-8 sm:w-8 sm:p-2 h-6 w-6 p-2 ${el?.cssClass}`}
              />
            </div>
            <div className="w-full">
              {/* Title line */}
              <p className="text-[8px] sm:text-sm font-medium capitalize break-words">
                {el.title} - {navCardData[el.title]?.length ?? 0}
              </p>
              {/* For invoice, sale, purchase */}
              {['invoice', 'sale', 'purchase'].includes(el.title) && (
                <p className="font-normal text-[8px] sm:text-xs break-words">
                  ₹
                  {(navCardData[el.title] || []).reduce(
                    (acc, inv) => acc + inv.totalAmount,
                    0
                  )}
                </p>
              )}
              {/* For cash/bank */}
              {el.title === 'cash/bank' && (
                <p className="font-normal text-[8px] sm:text-xs break-words">
                  ₹
                  {(navCardData.sale || []).reduce(
                    (acc, inv) => acc + inv.totalAmount,
                    0
                  ) -
                    (navCardData.purchase || []).reduce(
                      (acc, inv) => acc + inv.totalAmount,
                      0
                    )}
                </p>
              )}
            </div>
          </GridItem>
        ))}
      </GridContainer>
    </DashSection>
  );
}
export default InvoiceDashboardNavItem;
