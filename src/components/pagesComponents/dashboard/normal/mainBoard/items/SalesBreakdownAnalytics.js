'use client';
import React from 'react';
import {
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

export default function SalesBreakdownAnalytics({ invoices = [] }) {
  // Define colors for different sale types
  const salesColors = {
    cash_sale: '#10B981',
    credit_sale: '#F59E0B',
    credit_note: '#EF4444',
    bank_sale: '#8B5CF6',
    upi_sale: '#06B6D4',
  };

  // Process invoices to get sales breakdown data
  const processSalesBreakdown = (invoices) => {
    const salesBreakdown = {
      cash_sale: { count: 0, amount: 0 },
      credit_sale: { count: 0, amount: 0 },
      credit_note: { count: 0, amount: 0 },
      bank_sale: { count: 0, amount: 0 },
      upi_sale: { count: 0, amount: 0 },
    };

    invoices.forEach((invoice) => {
      const type = invoice.type || 'sale';
      const subType = invoice.subType || invoice.paymentMethod || type;
      
      // Map different payment methods to our categories
      let category = null;
      if (subType === 'cash' || subType === 'cash_sale') category = 'cash_sale';
      else if (subType === 'credit' || subType === 'credit_sale') category = 'credit_sale';
      else if (subType === 'credit_note') category = 'credit_note';
      else if (subType === 'bank' || subType === 'bank_sale') category = 'bank_sale';
      else if (subType === 'upi' || subType === 'upi_sale') category = 'upi_sale';
      // Skip expenses and generic sales

      if (category && salesBreakdown[category]) {
        salesBreakdown[category].count += 1;
        salesBreakdown[category].amount += invoice.totalAmount || 0;
      }
    });

    return salesBreakdown;
  };

  const salesBreakdown = processSalesBreakdown(invoices);

  // Prepare data for bar chart
  const barData = Object.entries(salesBreakdown).map(([type, data]) => ({
    name: type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    count: data.count,
    amount: data.amount,
    fill: salesColors[type],
  }));

  const totalTransactions = Object.values(salesBreakdown).reduce((sum, data) => sum + data.count, 0);
  const totalAmount = Object.values(salesBreakdown).reduce((sum, data) => sum + data.amount, 0);

  return (
    <DashSection
      className={'col-span-12 xl:col-span-12'}
      title={'Sales Breakdown & Expenses Analytics'}
      titleRight={
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Total Amount</span>
          <span className="text-sm font-semibold text-green-600">
            ₹{totalAmount.toLocaleString()}
          </span>
        </div>
      }
    >
      <div className="p-6 space-y-6">
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(salesBreakdown).map(([type, data]) => (
            <div
              key={type}
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: salesColors[type] }}></div>
                <Icon
                  icon={
                    type === 'cash_sale' ? 'lucide:banknote' :
                    type === 'credit_sale' ? 'lucide:credit-card' :
                    type === 'credit_note' ? 'lucide:file-minus' :
                    type === 'bank_sale' ? 'lucide:building-2' :
                    type === 'upi_sale' ? 'lucide:smartphone' :
                    type === 'expenses' ? 'lucide:trending-down' :
                    'lucide:shopping-bag'
                  }
                  className="w-4 h-4 text-gray-500"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 capitalize">
                  {type.replace('_', ' ')}
                </p>
                <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  {data.count}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  ₹{data.amount.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Single Bar Chart - Sales Overview */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Sales & Expenses Overview
          </h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6B7280" 
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="#6B7280" 
                  fontSize={12}
                  tickFormatter={(value) => `₹${value.toLocaleString()}`}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="#6B7280" 
                  fontSize={12}
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                          <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
                          <p className="text-sm text-blue-600">Count: {payload[0]?.payload?.count}</p>
                          <p className="text-sm text-green-600">Amount: ₹{payload[0]?.payload?.amount?.toLocaleString()}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar 
                  yAxisId="left"
                  dataKey="amount" 
                  name="Amount (₹)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashSection>
  );
}