'use client';
import { useEffect, useState } from 'react';
import CardOverview from './items/CardOverview';
import DashSection from '@/components/pagesComponents/pageLayout/DashSection';
import Sales_and_Purchase from './items/Sales_and_Purchase';
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
        const { data } = await userAxios.get(
          `/invoice/invoices?page=1&limit=1000`,
        );
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
        <Loader />
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
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="w-full lg:basis-[60%]">
        <CardOverview invoices={invoices} className="" />
        <TransactionOverview invoices={invoices} onSelectInvoice={(id, data) => {
            setSelectedOrderId(id);
            setInvoiceData(data);
          }} className="" />
      </div>
      <div className="w-full lg:basis-[40%]">
        <Sales_and_Purchase invoices={invoices} />
      </div>

      {/* <DashSection
        className={'col-span-12 xl:col-span-7'}
        title={'Income & Expense'}
        titleRight={'current year - 2025'}
      >
        <div className="p-4">
          <DataState />
        </div>
      </DashSection> 
      <DashSection
        className={'col-span-12 xl:col-span-5'}
        title={'account balance'}
      >
        <div className="p-4">
          <DataState />
        </div>
      </DashSection>
      <DashSection
        className={'col-span-12 xl:col-span-7'}
        title={'latest income'}
      >
        <div className="p-4">
          <DataState />
        </div>
      </DashSection>
      <DashSection
        className={'col-span-12 xl:col-span-5'}
        title={'latest expense'}
      >
        <div className="p-4">
          <DataState />
        </div>
      </DashSection>
      <DashSection
        className={'col-span-12 xl:col-span-7'}
        title={'recent invoices'}
      >
        <div className="p-4">
          <DataState />
        </div>
      </DashSection>
      <DashSection
        className={'col-span-12 xl:col-span-5'}
        title={'recent bills'}
      >
        <div className="p-4">
          <DataState />
        </div>
      </DashSection>
      <DashSection className={'col-span-12 xl:col-span-7'} title={'cashflow'}>
        <div className="p-4">
          <DataState />
        </div>
      </DashSection>

      <DashSection
        className={'col-span-12 xl:col-span-5'}
        title={'income vs expense'}
      >
        <div className="p-4">
          <DataState />
        </div>
      </DashSection>
      <DashSection
        className={'col-span-12 xl:col-span-7'}
        title={'storage limit'}
        titleRight={'0MB / 25MB'}
      >
        <div className="p-4">
          <DataState />
        </div>
      </DashSection>
      <DashSection
        className={'col-span-12 xl:col-span-5'}
        title={'income by category'}
        titleRight={'Year - 2025'}
      >
        <div className="p-4">
          <DataState />
        </div>
      </DashSection>
      <DashSection
        className={'col-span-12 xl:col-span-7'}
        title={'Expense By Category'}
        titleRight={'Year - 2025'}
      > */}
      {/* <div className="p-4">
          <DataState />
        </div>
      </DashSection> */}
    </div>
  );
}
