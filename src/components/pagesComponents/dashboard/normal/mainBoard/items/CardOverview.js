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
      iconName: 'lucide:file-text',
      gradient: 'from-purple-500 to-indigo-600',
      bgGradient: 'from-purple-50 to-indigo-50',
      darkBgGradient: 'from-purple-900/20 to-indigo-900/20',
      linkTo: '',
      growth: '+12%',
    },
  ];

  const handleClick = async (link) => {
    setIsNavigating(true);
    router.push(`/dashboard/accounts/invoice/${link}`);
  };

  return (
    <div className={`${className} container 2xl:max-w-7xl mx-auto mt-4 p-4`}>
      {isNavigating && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="flex h-[70vh] justify-center items-center">
            <Loader />
          </div>
        </div>
      )}
      
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))]">
        {dashboardData.map((el, key) => (
          <div
            key={key}
            onClick={() => handleClick(el.linkTo)}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${el.bgGradient} dark:${el.darkBgGradient} p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
              
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${el.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <Icon
                    icon={el.iconName}
                    className="w-7 h-7 text-white"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                    {el.growth}
                  </span>
                  <Icon icon="lucide:trending-up" className="w-4 h-4 text-green-500" />
                </div>
              </div>
              
              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {el.title}
                </h3>
                
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {el.overview}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    invoices
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {el.time}
                  </p>
                  <Icon icon="lucide:arrow-right" className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
