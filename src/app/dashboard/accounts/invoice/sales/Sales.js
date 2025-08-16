'use client';

import { useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import DashSection from '@/components/pagesComponents/pageLayout/DashSection';
import Button from '@/components/ui/Button';
import { IoMdDownload } from 'react-icons/io';
import { Icon } from '@iconify/react';
import { formatDate } from '@/utils/excelComponenets/dateFormat';
import { buildItems, buildSheetXml, downloadXls } from '@/utils/excelComponenets/excelFormat';

const tableData = {
  'Party Name': 'partyName',
  Date: 'createdAt',
  'GST Number': 'gstNumber',
  'Invoice No.': 'invoiceNumber',
  Amount: 'totalAmount',
  Status: 'status',
};

export default function Sales({ salesInvoices = [], loading, error }) {
  const router = useRouter();

  // Memoized invoices and table headers
  const safeInvoices = useMemo(() => (Array.isArray(salesInvoices) ? salesInvoices : []), [salesInvoices]);
  const tableHeaders = useMemo(() => Object.keys(tableData), []);

  // Export handler
  const handleExport = useCallback(() => {
    try {
      const items = buildItems(safeInvoices);
      const xml = buildSheetXml(items, 'Sales Invoice');
      downloadXls(xml);
    } catch (e) {
      console.error('Excel export failed:', e);
      alert('Export failed.');
    }
  }, [safeInvoices]);

  // Early returns for loading or error
  if (loading)
    return (
      <div className="grid place-content-center min-h-[calc(100vh-5rem)]">
        <h1>Loading...</h1>
      </div>
    );

  if (error?.isError)
    return (
      <div className="grid place-content-center min-h-[calc(100vh-5rem)]">
        <h1>{error?.response?.data?.message || 'Something went wrong'}</h1>
      </div>
    );

  return (
    <DashSection
      title="Sales Invoice"
      titleRight={
        <div className="flex gap-4 justify-center mb-2">
          <Button
            onClick={() => router.push('/dashboard/accounts/invoice/sales/create')}
            size="sm"
            className="m-2"
          >
            Create Invoice
          </Button>
          <Button
            onClick={handleExport}
            size="sm"
            className="m-2 flex items-center gap-1 justify-center hover:scale-105 transition-all duration-300"
          >
            <IoMdDownload />
            <span>Excel</span>
          </Button>
        </div>
      }
      className="py-0"
    >
      <div className="h-[calc(100vh-190px)] sm:h-[calc(100vh-220px)] overflow-y-auto p-2 border border-t-2">
        {safeInvoices.length === 0 ? (
          <div className="grid place-content-center h-full">
            <Icon className="w-40 h-24 opacity-5 mx-auto" icon="ph:files-light" />
            <p className="text-center">No Record Found</p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto scrollbar-thin">
            <table className="w-full border-collapse text-nowrap">
              <thead className="text-left">
                <tr>
                  {tableHeaders.map((header) => (
                    <th key={header} className="border-b px-4 py-3">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-left">
                {safeInvoices.map((invoice, idx) => (
                  <tr
                    key={invoice?.id ?? `row-${idx}`}
                    className={idx % 2 !== 0 ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                  >
                    {tableHeaders.map((header) => {
                      const value = invoice?.[tableData[header]] ?? '-';
                      return (
                        <td
                          key={`${invoice?.id ?? idx}-${tableData[header]}`}
                          className={`px-4 py-3 ${header === 'Status' ? 'text-orange-500' : ''}`}
                        >
                          {header === 'Date' ? formatDate(value) : value}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashSection>
  );
}
