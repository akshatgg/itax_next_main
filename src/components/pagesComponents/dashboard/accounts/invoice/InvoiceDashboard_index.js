'use client';

import InvoiceDashboardNavItem from './InvoiceDashboardNavItem.jsx';
import OverviewDashboard from './OverviewDashboard.jsx';
import OverviewTable from './OverviewTable.jsx';
import userAxios from '@/lib/userbackAxios.js';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image.js';
import moment from 'moment';
import Modal from '@/components/ui/Modal.js';
import CreateInvoice from './invoice/CreateInvoice.js';
import Loader from '@/components/partials/loading/Loader.js';
import EinvoiceDashboard from '../einvoice/EinvoiceDashboard.js';

export default function InvoiceDashboard_index({ businessProfile, einvoice }) {
  const [items, setItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [modal, setModal] = useState(false);
  const [currentInv, setCurrentInv] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState({
    search: '',
    type: null,
    status: null,
  });
  const [invoices, setInvoices] = useState(null);
  const [pagination, setPagination] = useState({});
const fetchItems = async () => {
  try {
    setIsLoading(true)
    
    console.log("Fetching items data...")
    const response = await userAxios.get("/invoice/items")
    // console.log("API Response:", response.data.items);
    setItems(response.data.items)


    if (response.data.success) {
      // Nothing here to set the items state!
    } else {
      console.error("Error fetching items:", response.data.error)
    }
  } catch (error) {
    console.error("Error fetching items:", error)
  } finally {
    setIsLoading(false)
  }
}
  useEffect(() => {
    fetchItems();
  }, []);
  // useEffect(() => {
  //   if (items) {
  //     console.log("Items data:", items);
  //   } else {
  //     console.log("Items data is null or undefined.");
  //   }
  // }, [items]);
  const getInvoices = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, status } = await userAxios.get(
        `/invoice/invoices?page=${currentPage}&limit=5&type=${search?.type?.value ?? ''}&search=${search.search ?? ''}&status=${search?.status?.value ?? ''}`,
      );

      if (status === 200) {
        const { invoices, pagination } = data;
        setPagination(pagination);
        setInvoices(invoices);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  }, [currentPage, search?.type?.value, search?.search, search?.status?.value]);
  // console.log(items);
  const navCardData = {
    invoice: invoices && invoices,
    sale: invoices && invoices.filter((inv) => inv.type === 'sales'),
    purchase: invoices && invoices.filter((inv) => inv.type === 'purchase'),
item: items || [],
    customer: invoices && invoices.filter((inv) => inv.type === 'sales'),
    supplier: invoices && invoices.filter((inv) => inv.type === 'purchase'),
    'cash/bank': invoices && invoices,
  };
  console.log("navCardData",navCardData);
  
  const invoiceOverview = {
    totalInvoices: invoices && invoices.length,
    unpaidInvoices:
      invoices && invoices.filter((inv) => inv.status === 'unpaid').length,
    overDue:
      invoices &&
      invoices
        .filter((inv) => {
          const isDue = moment(new Date(inv.dueDate)).isBefore(moment());
          const isUnpaid = inv.status === 'unpaid';
          return isDue && isUnpaid;
        })
        .reduce((acc, inv) => inv.totalAmount + acc, 0),
    upcomingPayouts:
      invoices &&
      invoices
        .filter((inv) => {
          const isUpcoming = moment(new Date(inv.dueDate)).isAfter(moment());
          const isUnpaid = inv.status === 'unpaid';
          return isUpcoming && isUnpaid;
        })
        .reduce((acc, inv) => inv.totalAmount + acc, 0),
  };

  useEffect(() => {
    getInvoices();
  }, [currentPage, getInvoices, search]);

  // console.log('search', search);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[75vh]">
        <Image src={'/loading.svg'} width={50} height={50} alt="Loading..." />
      </div>
    );
  }

  const handleEdit = (row) => {
    if (row) {
      setCurrentInv(row);
    }
    setModal(true);
  };

  const handleEditClose = () => {
    if (currentInv) {
      setCurrentInv(null);
    }
    setModal(false);
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-[75vh]">
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <div className="py-8">
      {/* Form Modal */}
      <Modal
        isOpen={modal}
        className="lg:min-w-[1000px]"
        onClose={handleEditClose}
        title={currentInv ? 'Update Invoice' : 'Create Invoice'}
      >
        <CreateInvoice
          currentInvoice={currentInv}
          refresh={getInvoices}
          onClose={handleEditClose}
          businessProfile={businessProfile}
        />
      </Modal>
      <InvoiceDashboardNavItem navCardData={navCardData} />
      <OverviewDashboard invoiceOverview={invoiceOverview} />
      <OverviewTable
        setSearch={setSearch}
        search={search}
        handleEdit={handleEdit}
        handleEditClose={handleEditClose}
        refresh={getInvoices}
        currentPage={currentPage}
        invoices={invoices}
        pagination={pagination}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}




export function EinvoiceDashboard_index({ businessProfile, einvoice }) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState({
    search: '',
    type: null,
    status: null,
  });
  const [invoices, setInvoices] = useState(null);




  const navCardData = {
    invoice: invoices || [],
    sale: invoices?.filter((inv) => inv.type === 'sales') || [],
    purchase: invoices?.filter((inv) => inv.type === 'purchase') || [],
    customer: invoices?.filter((inv) => inv.type === 'sales') || [],
    supplier: invoices?.filter((inv) => inv.type === 'purchase') || [],
    'cash/bank': invoices || [],
  };



  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[75vh]">
        <Image src="/loading.svg" width={50} height={50} alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="py-8">
      <InvoiceDashboardNavItem navCardData={navCardData} einvoice={einvoice} />
      <EinvoiceDashboard einvoice={einvoice} />
    </div>
  );
}

