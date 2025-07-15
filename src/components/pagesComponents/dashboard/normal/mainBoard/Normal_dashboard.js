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
      <div className="flex h-[70vh] justify-center items-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader />
          <p className="text-gray-500 dark:text-gray-400 animate-pulse">Loading dashboard...</p>
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col lg:flex-row gap-6 p-4">
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