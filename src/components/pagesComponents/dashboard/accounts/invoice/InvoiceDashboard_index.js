"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import userAxios from "@/lib/userbackAxios";
import Image from "next/image";
import moment from "moment";

// 🔹 Lazy-loaded components
const Modal = dynamic(() => import("@/components/ui/Modal"), { ssr: false });
const CreateInvoice = dynamic(() => import("./invoice/CreateInvoice"), { ssr: false });
const InvoiceDashboardNavItem = dynamic(() => import("./InvoiceDashboardNavItem"), { ssr: false });
const OverviewDashboard = dynamic(() => import("./OverviewDashboard"), { ssr: false });
const OverviewTable = dynamic(() => import("./OverviewTable"), { ssr: false });
const EinvoiceDashboard = dynamic(() => import("../einvoice/EinvoiceDashboard"), { ssr: false });

// 🔹 Reusable Loader
const Loader = () => (
  <div className="flex justify-center items-center h-[75vh]">
    <Image src="/loading.svg" width={50} height={50} alt="Loading..." />
  </div>
);

export default function InvoiceDashboard_index({ businessProfile, einvoice }) {
  const [items, setItems] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentInv, setCurrentInv] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState({ search: "", type: null, status: null });

  // 🔹 Fetch Items
  const fetchItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await userAxios.get("/invoice/items");
      if (data?.items) setItems(data.items);
    } catch (err) {
      console.error("Error fetching items:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 🔹 Fetch Invoices
  const getInvoices = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, status } = await userAxios.get(
        `/invoice/invoices?page=${currentPage}&limit=5&type=${search?.type?.value ?? ""}&search=${search.search ?? ""}&status=${search?.status?.value ?? ""}`
      );
      if (status === 200) {
        setInvoices(data?.invoices || []);
        setPagination(data?.pagination || {});
      }
    } catch (err) {
      console.error("Error fetching invoices:", err.message);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, search]);

  // 🔹 Effects
  useEffect(() => {
    fetchItems();
    getInvoices();
  }, [fetchItems, getInvoices]);

  // 🔹 Data Mappings
  const navCardData = {
    invoice: invoices,
    sale: invoices.filter((i) => i.type === "sales"),
    purchase: invoices.filter((i) => i.type === "purchase"),
    item: items,
    customer: invoices.filter((i) => i.type === "sales"),
    supplier: invoices.filter((i) => i.type === "purchase"),
    "cash/bank": invoices,
  };

  const invoiceOverview = {
    totalInvoices: invoices.length,
    unpaidInvoices: invoices.filter((i) => i.status === "unpaid").length,
    overDue: invoices
      .filter((i) => moment(i.dueDate).isBefore(moment()) && i.status === "unpaid")
      .reduce((acc, i) => acc + i.totalAmount, 0),
    upcomingPayouts: invoices
      .filter((i) => moment(i.dueDate).isAfter(moment()) && i.status === "unpaid")
      .reduce((acc, i) => acc + i.totalAmount, 0),
  };

  if (isLoading) return <Loader />;

  return (
    <div className="py-8">
      {/* 🔹 Modal */}
      <Modal
        isOpen={modal}
        className="lg:min-w-[1000px]"
        onClose={() => {
          setCurrentInv(null);
          setModal(false);
        }}
        title={currentInv ? "Update Invoice" : "Create Invoice"}
      >
        <CreateInvoice
          currentInvoice={currentInv}
          refresh={getInvoices}
          onClose={() => setModal(false)}
          businessProfile={businessProfile}
        />
      </Modal>

      {/* 🔹 Dashboard */}
      <InvoiceDashboardNavItem navCardData={navCardData} />
      <OverviewDashboard invoiceOverview={invoiceOverview} />
      <OverviewTable
        setSearch={setSearch}
        search={search}
        handleEdit={(row) => {
          setCurrentInv(row);
          setModal(true);
        }}
        refresh={getInvoices}
        currentPage={currentPage}
        invoices={invoices}
        pagination={pagination}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

// 🔹 E-Invoice Dashboard (optimized)
export function EinvoiceDashboard_index({ businessProfile, einvoice }) {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navCardData = {
    invoice: invoices,
    sale: invoices.filter((i) => i.type === "sales"),
    purchase: invoices.filter((i) => i.type === "purchase"),
    customer: invoices.filter((i) => i.type === "sales"),
    supplier: invoices.filter((i) => i.type === "purchase"),
    "cash/bank": invoices,
  };

  if (isLoading) return <Loader />;

  return (
    <div className="py-8">
      <InvoiceDashboardNavItem navCardData={navCardData} einvoice={einvoice} />
      <EinvoiceDashboard einvoice={einvoice} businessProfile={businessProfile} />
    </div>
  );
}
