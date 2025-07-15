'use client';
import { useEffect, useState } from 'react';
import CardOverview from './items/CardOverview';
import DashSection from '@/components/pagesComponents/pageLayout/DashSection';
import Sales_Purchase from './items/Sales_and_Purchase';
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

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const { data } = await userAxios.get(`/invoice/invoices?page=1&limit=1000`);
        setInvoices(data.invoices);
      } catch (err) {
        console.error('Error fetching invoices', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[70vh] justify-center items-center bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <Loader />
          <p className="text-blue-600 dark:text-blue-400 animate-pulse font-medium">Loading dashboard...</p>
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
      <div className="flex flex-col lg:flex-row gap-6 p-6">
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
    </div>
  );
}