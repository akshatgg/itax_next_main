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
      title: 'Total Invoices',
      overview: `${total}`,
      time: `${sales} sales / ${purchases} purchases`,
      iconName: 'mdi:invoice-add',
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-white',
      darkBgGradient: 'from-blue-900/10 to-blue-800/5',
      linkTo: '',
      growth: '+12%',
    },
  ];

  const handleClick = async (link) => {
    setIsNavigating(true);
    router.push(`/dashboard/accounts/invoice/${link}`);
  };

  return (
    <div className={`${className} container 2xl:max-w-7xl mx-auto p-4`}>
      {isNavigating && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="flex h-[70vh] justify-center items-center">
            <Loader />
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]">
        {dashboardData.map((el, key) => (
          <div
            key={key}
            onClick={() => handleClick(el.linkTo)}
            className="group cursor-pointer transform transition-all duration-200 hover:scale-[1.02]"
          >
            <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${el.bgGradient} dark:${el.darkBgGradient} p-6 border border-blue-200/50 dark:border-blue-700/50 shadow-lg hover:shadow-xl transition-all duration-300`}>
              {/* Professional background pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-transparent opacity-50"></div>
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 bg-gradient-to-br ${el.gradient} rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300`}>
                  <Icon
                    icon={el.iconName}
                    className="w-7 h-7 text-white"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-3 py-1 rounded-full">
                    {el.growth}
                  </span>
                  <Icon icon="lucide:trending-up" className="w-4 h-4 text-blue-500" />
                </div>
              </div>
              
              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {el.title}
                </h3>
                
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {el.overview}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    invoices
                  </span>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {el.time}
                  </p>
                  <Icon icon="lucide:arrow-right" className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
              
              {/* Professional decorative elements */}
              <div className="absolute -top-2 -right-2 w-16 h-16 bg-blue-500/5 rounded-full blur-xl"></div>
              <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-blue-500/10 rounded-full blur-lg"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}