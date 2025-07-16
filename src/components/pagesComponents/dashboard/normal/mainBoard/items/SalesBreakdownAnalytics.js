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

export default function SalesBreakdownAnalytics({ invoices = [] }) {
  console.log('Invoices:', invoices);
  
  // Professional blue-based color palette
  const categoryColors = {
    // Sales categories - Blue tones
    cash_sales: '#2563EB',      // Blue-600
    credit_sales: '#1D4ED8',    // Blue-700
    bank_sales: '#1E40AF',      // Blue-800
    upi_sales: '#3B82F6',       // Blue-500
    card_sales: '#60A5FA',      // Blue-400
    
    // Purchase categories - Amber/Orange variants
    cash_purchases: '#D97706',   // Amber-600
    credit_purchases: '#F59E0B', // Amber-500 (your specified color)
    bank_purchases: '#B45309',   // Amber-700
    upi_purchases: '#F59E0B',    // Amber-500 (your specified color)
    card_purchases: '#FCD34D',   // Amber-300
  };

  // Process invoices to get breakdown data
  const processInvoiceBreakdown = (invoices) => {
    const breakdown = {
      cash_sales: { count: 0, amount: 0 },
      credit_sales: { count: 0, amount: 0 },
      bank_sales: { count: 0, amount: 0 },
      upi_sales: { count: 0, amount: 0 },
      card_sales: { count: 0, amount: 0 },
      cash_purchases: { count: 0, amount: 0 },
      credit_purchases: { count: 0, amount: 0 },
      bank_purchases: { count: 0, amount: 0 },
      upi_purchases: { count: 0, amount: 0 },
      card_purchases: { count: 0, amount: 0 },
    };

    invoices.forEach((invoice) => {
      const type = invoice.type?.toLowerCase() || 'sales';
      const modeOfPayment = invoice.modeOfPayment?.toLowerCase() || 'cash';
      const totalAmount = invoice.totalAmount || 0;
      
      // Create category key based on type and payment mode
      let category = null;
      
      if (type === 'sales' || type === 'sale') {
        switch (modeOfPayment) {
          case 'cash':
            category = 'cash_sales';
            break;
          case 'credit':
            category = 'credit_sales';
            break;
          case 'bank':
            category = 'bank_sales';
            break;
          case 'upi':
            category = 'upi_sales';
            break;
          case 'card':
          case 'debit':
          case 'credit_card':
            category = 'card_sales';
            break;
          default:
            category = 'cash_sales'; // Default to cash sales
        }
      } else if (type === 'purchase' || type === 'purchases') {
        switch (modeOfPayment) {
          case 'cash':
            category = 'cash_purchases';
            break;
          case 'credit':
            category = 'credit_purchases';
            break;
          case 'bank':
            category = 'bank_purchases';
            break;
          case 'upi':
            category = 'upi_purchases';
            break;
          case 'card':
          case 'debit':
          case 'credit_card':
            category = 'card_purchases';
            break;
          default:
            category = 'cash_purchases'; // Default to cash purchases
        }
      }

      if (category && breakdown[category]) {
        breakdown[category].count += 1;
        breakdown[category].amount += totalAmount;
      }
    });

    return breakdown;
  };

  const invoiceBreakdown = processInvoiceBreakdown(invoices);

  // Prepare data for bar chart - include all categories
  const barData = Object.entries(invoiceBreakdown)
    .map(([type, data]) => ({
      name: type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      count: data.count,
      amount: data.amount,
      fill: categoryColors[type],
    }));

  // Calculate totals
  const totalTransactions = Object.values(invoiceBreakdown).reduce((sum, data) => sum + data.count, 0);
  const totalAmount = Object.values(invoiceBreakdown).reduce((sum, data) => sum + data.amount, 0);
  
  // Calculate sales and purchase totals separately
  const salesTotal = Object.entries(invoiceBreakdown)
    .filter(([key]) => key.includes('sales'))
    .reduce((sum, [, data]) => sum + data.amount, 0);
    
  const purchaseTotal = Object.entries(invoiceBreakdown)
    .filter(([key]) => key.includes('purchases'))
    .reduce((sum, [, data]) => sum + data.amount, 0);

  const netProfit = salesTotal - purchaseTotal;

  // Helper function to get icon for category
  const getIconForCategory = (type) => {
    if (type.includes('cash')) return 'lucide:banknote';
    if (type.includes('credit')) return 'lucide:credit-card';
    if (type.includes('bank')) return 'lucide:building-2';
    if (type.includes('upi')) return 'lucide:smartphone';
    if (type.includes('card')) return 'lucide:credit-card';
    return 'lucide:shopping-bag';
  };

  return (
    <DashSection
      className={'col-span-12 xl:col-span-12'}
      title={'Sales & Purchase Analytics'}
      titleRight={
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-blue-600">Sales: ₹{salesTotal.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-amber-500">Purchase: ₹{purchaseTotal.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Net:</span>
            <span className={`text-sm font-semibold ${netProfit >= 0 ? 'text-blue-600' : 'text-amber-500'}`}>
              ₹{netProfit.toLocaleString()}
            </span>
          </div>
        </div>
      }
    >
      <div className="p-6 space-y-6">

        {/* Bar Chart */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Transaction Overview by Payment Mode
          </h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748B" 
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="#64748B" 
                  fontSize={12}
                  tickFormatter={(value) => `₹${value.toLocaleString()}`}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="#64748B" 
                  fontSize={12}
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                          <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
                          <p className="text-sm text-blue-600">Count: {payload[0]?.payload?.count}</p>
                          <p className="text-sm text-amber-500">Amount: ₹{payload[0]?.payload?.amount?.toLocaleString()}</p>
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