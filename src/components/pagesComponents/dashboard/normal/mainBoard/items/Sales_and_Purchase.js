'use client';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

import { Icon } from '@iconify/react';
import DashSection from '@/components/pagesComponents/pageLayout/DashSection';



// Mock DashSection component for demo
// const DashSection = ({ children, className, title, titleRight }) => (
//   <div
//     className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg ${className}`}
//   >
//     <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
//       <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//         {title}
//       </h3>
//       {titleRight}
//     </div>
//     {children}
//   </div>
// );

// Mock Icon component for demo
// const Icon = ({ icon, className }) => (
//   <div className={`${className} bg-gray-300 dark:bg-gray-600 rounded`} />
// );

export default function SalesPurchaseAnalytics({ invoices = [] }) {
  console.log('Invoices:', invoices);
  // Process invoices to get monthly data
  const processMonthlyData = (invoices) => {
    const monthlyStats = {};

    invoices.forEach((invoice) => {
      const date = new Date(invoice.invoiceDate || invoice.createdAt);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      const monthName = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();

      if (!monthlyStats[monthKey]) {
        monthlyStats[monthKey] = {
          month: monthName,
          year: year,
          sales: 0,
          purchases: 0,
          salesAmount: 0,
          purchasesAmount: 0,
        };
      }

      if (invoice.type === 'sales') {
        monthlyStats[monthKey].sales += 1;
        monthlyStats[monthKey].salesAmount += invoice.totalAmount || 0;
      } else if (invoice.type === 'purchase') {
        monthlyStats[monthKey].purchases += 1;
        monthlyStats[monthKey].purchasesAmount += invoice.totalAmount || 0;
      }
    });

    // Sort by date and get last 12 months
    return Object.values(monthlyStats)
      .sort(
        (a, b) =>
          new Date(`${a.month} ${a.year}`) - new Date(`${b.month} ${b.year}`),
      )
      .slice(-12);
  };

  const salesCount = invoices.filter((inv) => inv.type === 'sales').length;
  const purchaseCount = invoices.filter(
    (inv) => inv.type === 'purchase',
  ).length;
  const totalCount = salesCount + purchaseCount;

  const salesPercentage = totalCount > 0 ? (salesCount / totalCount) * 100 : 0;
  const purchasePercentage =
    totalCount > 0 ? (purchaseCount / totalCount) * 100 : 0;

  const monthlyData = processMonthlyData(invoices);

  // Calculate totals
  const totalSalesAmount = invoices
    .filter((inv) => inv.type === 'sales')
    .reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);

  const totalPurchaseAmount = invoices
    .filter((inv) => inv.type === 'purchase')
    .reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <DashSection
      className={'col-span-12 xl:col-span-12'}
      title={'Sales & Purchase Analytics'}
      titleRight={
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Total Transactions</span>
          <span className="text-sm font-semibold text-blue-600">
            {totalCount}
          </span>
        </div>
      }
    >
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl border border-blue-200 dark:border-blue-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Sales
                </p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {salesCount}
                </p>
                <p className="text-xs text-blue-500 dark:text-blue-400">
                  {salesPercentage.toFixed(1)}% of total
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Icon
                  icon="lucide:trending-up"
                  className="w-6 h-6 text-white"
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-4 rounded-xl border border-amber-200 dark:border-amber-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                  Purchases
                </p>
                <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                  {purchaseCount}
                </p>
                <p className="text-xs text-amber-500 dark:text-amber-400">
                  {purchasePercentage.toFixed(1)}% of total
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                <Icon
                  icon="lucide:shopping-cart"
                  className="w-6 h-6 text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Sales Progress
              </span>
              <span className="text-sm text-gray-500">
                {salesPercentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${salesPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Purchase Progress
              </span>
              <span className="text-sm text-gray-500">
                {purchasePercentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${purchasePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Monthly Transaction Count Chart */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Monthly Transaction Count
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="sales"
                  fill="#3B82F6"
                  name="Sales"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="purchases"
                  fill="#F59E0B"
                  name="Purchases"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Amount Trend Chart */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Monthly Amount Trend
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis
                  stroke="#6B7280"
                  fontSize={12}
                  tickFormatter={(value) => `₹${value.toLocaleString()}`}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  formatter={(value) => [`₹${value.toLocaleString()}`, '']}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="salesAmount"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  name="Sales Amount"
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="purchasesAmount"
                  stroke="#F59E0B"
                  strokeWidth={3}
                  name="Purchase Amount"
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        
      </div>
    </DashSection>
  );
}
