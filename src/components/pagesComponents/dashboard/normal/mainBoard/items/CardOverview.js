'use client';
import { Icon } from '@iconify/react';
import GridItem from '@/components/pagesComponents/grid/GridItem';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Loader from '@/components/partials/loading/Loader';

export default function CardOverview({ invoices = [], className }) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const total = invoices.length;
  const sales = invoices.filter((inv) => inv.type === 'sales').length;
  const purchases = invoices.filter((inv) => inv.type === 'purchase').length;

  const dashboardData = [
    {
      title: 'Invoices',
      overview: `${total}`,
      time: `${sales} sales / ${purchases} purchases`,
      iconName: 'material-symbols:account-circle-outline',
      cssClass:
        'p-3 mr-4 text-purple-500 bg-purple-100 rounded-full dark:text-purple-100 dark:bg-purple-500',
      linkTo: '',
    },
  ];

  const handleClick = async (link) => {
    setIsNavigating(true);
    router.push(`/dashboard/accounts/invoice/${link}`);
  };

  return (
    <div className={`${className} container 2xl:max-w-7xl mx-auto mt-4 p-4`}>
      {isNavigating && (
        <div className="fixed inset-0 bg-white/60 flex justify-center items-center z-50">
          <div className="flex h-[70vh] justify-center items-center">
            <Loader />
          </div>
        </div>
      )}
      <ul className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]">
        {dashboardData.map((el, key) => (
          <li
            key={key}
            onClick={() => handleClick(el.linkTo)}
            className="cursor-pointer"
          >
            <GridItem href="#">
              <div>
                <Icon
                  icon={el.iconName}
                  className={`rounded-xl sm:h-16 sm:w-16 sm:p-3 h-14 w-14 p-3 ${el.cssClass}`}
                />
              </div>
              <div>
                <div className="flex flex-wrap justify-between">
                  <span>{el.title}</span>
                  <span>{el.overview}</span>
                </div>
                <p className="font-normal text-txt/70">{el.time}</p>
              </div>
            </GridItem>
          </li>
        ))}
      </ul>
    </div>
  );
}
