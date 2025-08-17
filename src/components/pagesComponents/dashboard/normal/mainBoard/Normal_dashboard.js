'use client';
import { useEffect, useState } from 'react';
import CardOverview from './items/CardOverview';
import DashSection from '@/components/pagesComponents/pageLayout/DashSection';
import Sales_Purchase from './items/Sales_and_Purchase';
import SalesBreakdownAnalytics from './items/SalesBreakdownAnalytics'; // Import the new component
import DataState from './items/DataState';
import userAxios from '@/lib/userbackAxios';
import Loader from '@/components/partials/loading/Loader';
import TransactionOverview from './items/TransactionOverview';
import { Invoice } from '../../order-history-component/OrderHistory.Component';

export default function Normal_dashboard() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    // Show UI immediately with skeleton loading state
    const timer = setTimeout(() => {
      setInitialRender(false);
    }, 100);
    
    const fetchInvoices = async () => {
      try {
        // Reduce the initial data load - just get recent invoices first
        const { data } = await userAxios.get(`/invoice/invoices?page=1&limit=20`);
        setInvoices(data.invoices);
      } catch (err) {
        console.error('Error fetching invoices', err);
      } finally {
        setLoading(false);
      }
    };

    // Start fetching data after component mounts
    fetchInvoices();
    
    return () => clearTimeout(timer);
  }, []);

  // Render a skeleton UI immediately during initial render
  // This creates a better perceived performance
  if (initialRender || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-950 dark:via-gray-900 dark:to-blue-950">
        <div className="flex flex-col gap-6 p-6">
          {/* Top Section Skeleton */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:basis-[65%] space-y-6">
              {/* Card Overview Skeleton */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-gray-100 dark:bg-gray-700 rounded"></div>
                  ))}
                </div>
              </div>
              
              {/* Transaction Overview Skeleton */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-gray-100 dark:bg-gray-700 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sales & Purchase Skeleton */}
            <div className="w-full lg:basis-[35%]">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse h-64">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedOrderId) {
    return (
      <Invoice
        orderId={selectedOrderId}
        responseData={invoiceData}
        onBack={() => setSelectedOrderId(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-950 dark:via-gray-900 dark:to-blue-950 transition-colors duration-300">
      <div className="flex flex-col gap-6 p-6">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:basis-[65%] space-y-6">
            <CardOverview invoices={invoices} className="" />
            <TransactionOverview 
              invoices={invoices}
              onSelectInvoice={(id, data) => {
                setSelectedOrderId(id);
                setInvoiceData(data);
              }}
              className=""
            />
          </div>
          
          <div className="w-full lg:basis-[35%]">
            <Sales_Purchase invoices={invoices} />
          </div>
        </div>

        {/* Bottom Section - Sales Breakdown Analytics */}
        <div className="w-full">
          <SalesBreakdownAnalytics invoices={invoices} />
        </div>
      </div>
    </div>
  );
}