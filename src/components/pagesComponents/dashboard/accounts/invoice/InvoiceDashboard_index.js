// 'use client';

// import InvoiceDashboardNavItem from './InvoiceDashboardNavItem.jsx';
// import OverviewDashboard from './OverviewDashboard.jsx';
// import OverviewTable from './OverviewTable.jsx';
// import userAxios from '@/lib/userbackAxios.js';
// import { useCallback, useEffect, useState } from 'react';
// import Image from 'next/image.js';
// import moment from 'moment';
// import Modal from '@/components/ui/Modal.js';
// import CreateInvoice from './invoice/CreateInvoice.js';
// import Loader from '@/components/partials/loading/Loader.js';
// import EinvoiceDashboard from '../einvoice/EinvoiceDashboard.js';

// export default function InvoiceDashboard_index({ businessProfile, einvoice }) {
//   const [items, setItems] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const [modal, setModal] = useState(false);
//   const [currentInv, setCurrentInv] = useState(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [search, setSearch] = useState({
//     search: '',
//     type: null,
//     status: null,
//   });
//   const [invoices, setInvoices] = useState(null);
//   const [pagination, setPagination] = useState({});
// const fetchItems = async () => {
//   try {
//     setIsLoading(true)
    
//     console.log("Fetching items data...")
//     const response = await userAxios.get("/invoice/items")
//     setItems(response.data.items)


//     if (response.data.success) {
//     } else {
//       console.error("Error fetching items:", response.data.error)
//     }
//   } catch (error) {
//     console.error("Error fetching items:", error)
//   } finally {
//     setIsLoading(false)
//   }
// }
//   useEffect(() => {
//     fetchItems();
//   }, []);
  
//   const getInvoices = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       const { data, status } = await userAxios.get(
//         `/invoice/invoices?page=${currentPage}&limit=5&type=${search?.type?.value ?? ''}&search=${search.search ?? ''}&status=${search?.status?.value ?? ''}`,
//       );

//       if (status === 200) {
//         const { invoices, pagination } = data;
//         setPagination(pagination);
//         setInvoices(invoices);
//       }
//       setIsLoading(false);
//     } catch (error) {
//       setIsLoading(false);
//       console.log(error.message);
//     }
//   }, [currentPage, search?.type?.value, search?.search, search?.status?.value]);

//   const navCardData = {
//     invoice: invoices && invoices,
//     sale: invoices && invoices.filter((inv) => inv.type === 'sales'),
//     purchase: invoices && invoices.filter((inv) => inv.type === 'purchase'),
// item: items || [],
//     customer: invoices && invoices.filter((inv) => inv.type === 'sales'),
//     supplier: invoices && invoices.filter((inv) => inv.type === 'purchase'),
//     'cash/bank': invoices && invoices,
//   };
//   console.log("navCardData",navCardData);
  
//   const invoiceOverview = {
//     totalInvoices: invoices && invoices.length,
//     unpaidInvoices:
//       invoices && invoices.filter((inv) => inv.status === 'unpaid').length,
//     overDue:
//       invoices &&
//       invoices
//         .filter((inv) => {
//           const isDue = moment(new Date(inv.dueDate)).isBefore(moment());
//           const isUnpaid = inv.status === 'unpaid';
//           return isDue && isUnpaid;
//         })
//         .reduce((acc, inv) => inv.totalAmount + acc, 0),
//     upcomingPayouts:
//       invoices &&
//       invoices
//         .filter((inv) => {
//           const isUpcoming = moment(new Date(inv.dueDate)).isAfter(moment());
//           const isUnpaid = inv.status === 'unpaid';
//           return isUpcoming && isUnpaid;
//         })
//         .reduce((acc, inv) => inv.totalAmount + acc, 0),
//   };

//   useEffect(() => {
//     getInvoices();
//   }, [currentPage, getInvoices, search]);


//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-[75vh]">
//         <Image src={'/loading.svg'} width={50} height={50} alt="Loading..." />
//       </div>
//     );
//   }

//   const handleEdit = (row) => {
//     if (row) {
//       setCurrentInv(row);
//     }
//     setModal(true);
//   };

//   const handleEditClose = () => {
//     if (currentInv) {
//       setCurrentInv(null);
//     }
//     setModal(false);
//   };


//   return (
//     <div className="py-8">
//       <Modal
//         isOpen={modal}
//         className="lg:min-w-[1000px]"
//         onClose={handleEditClose}
//         title={currentInv ? 'Update Invoice' : 'Create Invoice'}
//       >
//         <CreateInvoice
//           currentInvoice={currentInv}
//           refresh={getInvoices}
//           onClose={handleEditClose}
//           businessProfile={businessProfile}
//         />
//       </Modal>
//       <InvoiceDashboardNavItem navCardData={navCardData} />
//       <OverviewDashboard invoiceOverview={invoiceOverview} />
//       <OverviewTable
//         setSearch={setSearch}
//         search={search}
//         handleEdit={handleEdit}
//         handleEditClose={handleEditClose}
//         refresh={getInvoices}
//         currentPage={currentPage}
//         invoices={invoices}
//         pagination={pagination}
//         setCurrentPage={setCurrentPage}
//       />
//     </div>
//   );
// }




// export function EinvoiceDashboard_index({ businessProfile, einvoice }) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [search, setSearch] = useState({
//     search: '',
//     type: null,
//     status: null,
//   });
//   const [invoices, setInvoices] = useState(null);




//   const navCardData = {
//     invoice: invoices || [],
//     sale: invoices?.filter((inv) => inv.type === 'sales') || [],
//     purchase: invoices?.filter((inv) => inv.type === 'purchase') || [],
//     customer: invoices?.filter((inv) => inv.type === 'sales') || [],
//     supplier: invoices?.filter((inv) => inv.type === 'purchase') || [],
//     'cash/bank': invoices || [],
//   };



//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-[75vh]">
//         <Image src="/loading.svg" width={50} height={50} alt="Loading..." />
//       </div>
//     );
//   }

//   return (
//     <div className="py-8">
//       <InvoiceDashboardNavItem navCardData={navCardData} einvoice={einvoice} />
//       <EinvoiceDashboard einvoice={einvoice} businessProfile={businessProfile} />
//     </div>
//   );
// }



"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import Modal from "@/components/ui/Modal";
import Loader from "@/components/partials/loading/Loader";
import userAxios from "@/lib/userbackAxios";

import InvoiceDashboardNavItem from "./InvoiceDashboardNavItem";
import OverviewDashboard from "./OverviewDashboard";
import OverviewTable from "./OverviewTable";
import CreateInvoice from "./invoice/CreateInvoice";
import EinvoiceDashboard from "../einvoice/EinvoiceDashboard";

export default function InvoiceDashboardIndex({ businessProfile, einvoice }) {
  const [items, setItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentInv, setCurrentInv] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState({ search: "", type: null, status: null });
  const [invoices, setInvoices] = useState(null);
  const [pagination, setPagination] = useState({});

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await userAxios.get("/invoice/items");
      setItems(response.data.items || []);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getInvoices = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, status } = await userAxios.get(
        `/invoice/invoices?page=${currentPage}&limit=5&type=${search?.type?.value ?? ""}&search=${search.search ?? ""}&status=${search?.status?.value ?? ""}`
      );
      if (status === 200) {
        setInvoices(data.invoices);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, search]);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    getInvoices();
  }, [getInvoices]);

  const navCardData = {
    invoice: invoices || [],
    sale: invoices?.filter((inv) => inv.type === "sales") || [],
    purchase: invoices?.filter((inv) => inv.type === "purchase") || [],
    item: items || [],
    customer: invoices?.filter((inv) => inv.type === "sales") || [],
    supplier: invoices?.filter((inv) => inv.type === "purchase") || [],
    "cash/bank": invoices || [],
  };

  const invoiceOverview = {
    totalInvoices: invoices?.length || 0,
    unpaidInvoices: invoices?.filter((inv) => inv.status === "unpaid").length || 0,
    overDue:
      invoices?.filter(
        (inv) => moment(inv.dueDate).isBefore(moment()) && inv.status === "unpaid"
      ).reduce((acc, inv) => acc + inv.totalAmount, 0) || 0,
    upcomingPayouts:
      invoices?.filter(
        (inv) => moment(inv.dueDate).isAfter(moment()) && inv.status === "unpaid"
      ).reduce((acc, inv) => acc + inv.totalAmount, 0) || 0,
  };

  const handleEdit = (row) => {
    setCurrentInv(row);
    setModal(true);
  };

  const handleEditClose = () => {
    setCurrentInv(null);
    setModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[75vh]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="py-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50 to-slate-100 min-h-screen">
      <Modal
        isOpen={modal}
        className="lg:min-w-[1000px]"
        onClose={handleEditClose}
        title={currentInv ? "Update Invoice" : "Create Invoice"}
      >
        <CreateInvoice
          currentInvoice={currentInv}
          refresh={getInvoices}
          onClose={handleEditClose}
          businessProfile={businessProfile}
        />
      </Modal>

      <div className="max-w-7xl mx-auto space-y-10">
        <InvoiceDashboardNavItem navCardData={navCardData} />
        <OverviewDashboard invoiceOverview={invoiceOverview} />
        {/* <OverviewTable
          setSearch={setSearch}
          search={search}
          handleEdit={handleEdit}
          handleEditClose={handleEditClose}
          refresh={getInvoices}
          currentPage={currentPage}
          invoices={invoices}
          pagination={pagination}
          setCurrentPage={setCurrentPage}
        /> */}
      </div>
    </div>
  );
}

export function EinvoiceDashboardIndex({ businessProfile, einvoice }) {
  const [isLoading, setIsLoading] = useState(false);
  const [invoices, setInvoices] = useState([]);

  const navCardData = {
    invoice: invoices,
    sale: invoices.filter((inv) => inv.type === "sales"),
    purchase: invoices.filter((inv) => inv.type === "purchase"),
    customer: invoices.filter((inv) => inv.type === "sales"),
    supplier: invoices.filter((inv) => inv.type === "purchase"),
    "cash/bank": invoices,
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[75vh]">
        <Image src="/loading.svg" width={50} height={50} alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-emerald-50 via-white to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        <InvoiceDashboardNavItem navCardData={navCardData} einvoice={einvoice} />
        <EinvoiceDashboard einvoice={einvoice} businessProfile={businessProfile} />
      </div>
    </div>
  );
}
