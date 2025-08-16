'use client';
import React, { useMemo } from 'react';
import DashSection from '@/components/pagesComponents/pageLayout/DashSection';
import Button from '@/components/ui/Button';
import { IoMdDownload } from 'react-icons/io';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/utils/excelComponenets/dateFormat';
import { buildItems, buildSheetXml, downloadXls } from '@/utils/excelComponenets/excelFormat';

// Table columns mapping
const TABLE_COLUMNS = {
  'Party Name': 'partyName',
  Date: 'createdAt',
  'GST Number': 'gstNumber',
  'Invoice No.': 'invoiceNumber',
  Amount: 'totalAmount',
  Status: 'status',
};

export default function Purchase({ purchaseInvoices = [], loading, error }) {
  const router = useRouter();

  // Ensure data is always an array
  const invoices = useMemo(() => Array.isArray(purchaseInvoices) ? purchaseInvoices : [], [purchaseInvoices]);

  // Export to Excel
  const handleExport = () => {
    try {
      const items = buildItems(invoices);
      const xml = buildSheetXml(items, 'Purchase Invoice');
      downloadXls(xml);
    } catch (e) {
      console.error('Excel export failed:', e);
      alert('Export failed. Check console for details.');
    }
  };

  if (loading) return <CenterMessage message="Loading..." />;
  if (error?.isError) return <CenterMessage message={error?.response?.data?.message || 'Something went wrong'} />;

  return (
    <DashSection
      title="Purchase Invoice"
      titleRight={
        <div className="flex gap-4 justify-center mb-2">
          <Button onClick={() => router.push('/dashboard/accounts/invoice/sales/create')} size="sm">Create Invoice</Button>
          <Button onClick={handleExport} size="sm" className="flex items-center gap-1 justify-center hover:scale-105 transition-all duration-300">
            <IoMdDownload />
            <span>Excel</span>
          </Button>
        </div>
      }
      className="py-0"
    >
      <div className="h-[calc(100vh-190px)] sm:h-[calc(100vh-220px)] overflow-y-auto p-2 border border-t-2">
        {invoices.length === 0 ? (
          <EmptyState />
        ) : (
          <Table invoices={invoices} columns={TABLE_COLUMNS} />
        )}
      </div>
    </DashSection>
  );
}

// ------------------- Helper Components -------------------

const CenterMessage = ({ message }) => (
  <div className="grid place-content-center min-h-[calc(100vh-5rem)]">
    <h1>{message}</h1>
  </div>
);

const EmptyState = () => (
  <div className="grid place-content-center h-full">
    <Icon className="w-40 h-24 opacity-5 mx-auto" icon="ph:files-light" />
    <p className="text-center">No Record Found</p>
  </div>
);

const Table = ({ invoices, columns }) => (
  <div className="w-full overflow-x-auto scrollbar-thin">
    <table className="w-full border-collapse text-nowrap">
      <thead className="text-left">
        <tr>
          {Object.keys(columns).map((col) => (
            <th key={col} className="border-b px-4 py-3">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice, idx) => (
          <tr key={invoice?.id ?? idx} className={idx % 2 !== 0 ? 'bg-blue-100' : ''}>
            {Object.keys(columns).map((col) => {
              const value = invoice?.[columns[col]] ?? '-';
              return (
                <td key={`${invoice?.id ?? idx}-${columns[col]}`} className={`px-4 py-3 ${col === 'Status' ? 'text-orange-500' : ''}`}>
                  {col === 'Date' ? formatDate(value) : value}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
