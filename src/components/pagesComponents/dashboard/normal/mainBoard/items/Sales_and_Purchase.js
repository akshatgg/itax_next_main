'use client';
import DashSection from '@/components/pagesComponents/pageLayout/DashSection';

import { Icon } from '@iconify/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// const data = {
//   labels: ['Sales', 'Purchase'],
//   datasets: [
//     {
//       data: [300, 100],
//       backgroundColor: ['#36A2EB', '#FFCE56'],
//       hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
//     },
//   ],
// };

export default function Sales_Purchase({ invoices = [] }) {
  const salesCount = invoices.filter(inv => inv.type === 'sales').length;
  const purchaseCount = invoices.filter(inv => inv.type === 'purchase').length;
  const totalCount = salesCount + purchaseCount;

  const salesPercentage = totalCount > 0 ? (salesCount / totalCount) * 100 : 0;
  const purchasePercentage = totalCount > 0 ? (purchaseCount / totalCount) * 100 : 0;

  // Generate mock monthly data for the trend chart
  const monthlyData = [
    { month: 'Jan', sales: Math.floor(salesCount * 0.8), purchases: Math.floor(purchaseCount * 0.9) },
    { month: 'Feb', sales: Math.floor(salesCount * 0.6), purchases: Math.floor(purchaseCount * 0.7) },
    { month: 'Mar', sales: Math.floor(salesCount * 0.9), purchases: Math.floor(purchaseCount * 0.8) },
    { month: 'Apr', sales: Math.floor(salesCount * 1.1), purchases: Math.floor(purchaseCount * 1.2) },
    { month: 'May', sales: Math.floor(salesCount * 0.95), purchases: Math.floor(purchaseCount * 0.85) },
    { month: 'Jun', sales: salesCount, purchases: purchaseCount },
  ];

  return (
    <DashSection
      className={'col-span-12 xl:col-span-5'}
      title={'Sales & Purchase Analytics'}
      titleRight={
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Current Year</span>
          <span className="text-sm font-semibold text-blue-600">2025</span>
        </div>
      }
    >
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl border border-blue-200 dark:border-blue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Sales</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{salesCount}</p>
                <p className="text-xs text-blue-500 dark:text-blue-400">{salesPercentage.toFixed(1)}% of total</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Icon icon="lucide:trending-up" className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-4 rounded-xl border border-amber-200 dark:border-amber-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Purchases</p>
                <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">{purchaseCount}</p>
                <p className="text-xs text-amber-500 dark:text-amber-400">{purchasePercentage.toFixed(1)}% of total</p>
              </div>
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                <Icon icon="lucide:shopping-cart" className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sales Progress</span>
              <span className="text-sm text-gray-500">{salesCount} / {totalCount}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${salesPercentage}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Purchase Progress</span>
              <span className="text-sm text-gray-500">{purchaseCount} / {totalCount}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${purchasePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Mini Bar Chart */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Monthly Trend</h4>
          <div className="flex items-end justify-between space-x-2 h-24">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full space-y-1 flex flex-col items-center">
                  <div 
                    className="w-3 bg-blue-500 rounded-t transition-all duration-1000"
                    style={{ 
                      height: `${Math.max((data.sales / Math.max(salesCount, 1)) * 60, 4)}px`,
                      animationDelay: `${index * 100}ms`
                    }}
                  ></div>
                  <div 
                    className="w-3 bg-amber-500 rounded-t transition-all duration-1000"
                    style={{ 
                      height: `${Math.max((data.purchases / Math.max(purchaseCount, 1)) * 60, 4)}px`,
                      animationDelay: `${index * 100 + 50}ms`
                    }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 mt-1">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-4 mt-3">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Sales</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-amber-500 rounded"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Purchases</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Transactions</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{totalCount}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Icon icon="lucide:activity" className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashSection>
  );
}
