'use client';

export const buildItems = (salesInvoices = []) => {
  if (!Array.isArray(salesInvoices) || salesInvoices.length === 0) {
    return [
      { description: 'Product A', price: 500, qty: 2 },
      { description: 'Product B', price: 300, qty: 1 },
      { description: 'Product C', price: 200, qty: 5 },
    ];
  }
  return salesInvoices.map((inv) => ({
    description: inv?.partyName
      ? `${inv.partyName} — ${(inv.invoiceNumber || '').trim()}`
      : inv?.invoiceNumber || 'Item',
    price: Number(inv?.totalAmount) || 0,
    qty: 1,
  }));
};

export const buildSheetXml = (invoices = []) => {
  const headers = [
    'Party Name',
    'Date',
    'GST Number',
    'Invoice No.',
    'Total GST',
    'Amount',
    'Status',
    'Mode Of Payment',
    'Details',
    'Extra Details',
  ];

  // compute max lengths in a single pass
  const colMaxLens = Array(headers.length).fill(0);
  invoices.forEach((inv) => {
    [
      inv.partyName,
      inv.date,
      inv.gstNumber,
      inv.invoiceNumber,
      inv.totalGst,
      inv.amount,
      inv.status,
      inv.modeOfPayment,
      inv.details,
      inv.extraDetails,
    ].forEach((val, i) => {
      colMaxLens[i] = Math.max(
        colMaxLens[i],
        String(val || '').length,
        headers[i].length,
      );
    });
  });

  // convert to widths (approx: 7px/char + padding)
  const colWidths = colMaxLens.map((len) => 20 + len * 7);

  const colsXml = colWidths.map((w) => `<Column ss:Width="${w}"/>`).join('');
  const headerXml = headers
    .map(
      (h) =>
        `<Cell ss:StyleID="header"><Data ss:Type="String">${h}</Data></Cell>`,
    )
    .join('');

  return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
          xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:x="urn:schemas-microsoft-com:office:excel"
          xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">

  <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
    <ReadOnlyRecommended>true</ReadOnlyRecommended>
  </DocumentProperties>

  <Styles>
    <Style ss:ID="header">
      <Font ss:Bold="1"/>
      <Alignment ss:Horizontal="Center"/>
      <Interior ss:Color="#D9D9D9" ss:Pattern="Solid"/>
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      </Borders>
    </Style>
    <Style ss:ID="cell">
      <Borders>
        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
        <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
        <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
        <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
      </Borders>
    </Style>
  </Styles>

  <Worksheet ss:Name="Invoices">
    <Table ss:DefaultRowHeight="18">
      ${colsXml}
      <Row>${headerXml}</Row>
    </Table>

    <!-- 🔒 Enforce protection -->
    <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
      <ProtectObjects>True</ProtectObjects>
      <ProtectScenarios>True</ProtectScenarios>
      <ProtectContents>True</ProtectContents>
      <ProtectSheet>True</ProtectSheet>
      <Password>ABCD</Password>
    </WorksheetOptions>
  </Worksheet>
</Workbook>`;
};

export const downloadXls = (xml, filename = 'Invoice.xls') => {
  // Add UTF-8 BOM to help Excel detect encoding correctly
  const blob = new Blob(['\uFEFF' + xml], {
    type: 'application/vnd.ms-excel;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
};

// New helper: export invoices to the locked-sheet Excel XML (no external libs)
export const exportInvoicesAsLockedXls = (
  invoices = [],
  filename = 'invoices.xls',
) => {
  try {
    const items = buildItems(invoices);
    const xml = buildSheetXml(items, 'Sales Invoice');
    downloadXls(xml, filename);
  } catch (err) {
    // keep silent; caller handles UI notifications
    console.error('Export failed', err);
  }
};

import React, {
  useEffect,
  useState,
  Suspense,
  useMemo,
  useCallback,
} from 'react';
import dynamic from 'next/dynamic';
import DashSection from '@/components/pagesComponents/pageLayout/DashSection';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Button, { BTN_SIZES } from '@/components/ui/Button';
import { FaEye } from 'react-icons/fa';
import { MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import userAxios from '@/lib/userAxios';
import Image from 'next/image';
import Input from '@/components/ui/Input';

// Lazy load heavy components
const Pagination = dynamic(() => import('@/components/navigation/Pagination'), {
  ssr: false,
  loading: () => <p className="text-center">Loading pagination...</p>,
});
const ReactTable = dynamic(() => import('@/components/ui/ReactTable'), {
  ssr: false,
  loading: () => <p className="text-center">Loading table...</p>,
});
import { invoicesTableHeaders } from './staticData';

function OverviewTable({
  handleEdit,
  invoices,
  refresh,
  search,
  setSearch,
  pagination,
  currentPage,
  setCurrentPage,
}) {
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  const [form, setForm] = useState({
    search: '',
    type: { label: '', value: '' },
  });

  const handleDeleteById = useCallback(
    async (id) => {
      try {
        if (window.confirm('Are you sure ?')) {
          setDeleteLoading(true);
          const response = await userAxios.delete(`/invoice/invoices/${id}`);
          if (response.status === 200) {
            await refresh();
            toast.success(response.data.message);
          }
        }
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong');
      } finally {
        setDeleteLoading(false);
      }
    },
    [refresh],
  );

  const adjustedHeaders = useMemo(
    () => [
      {
        text: (
          <div className="flex justify-start items-center">
            <span className="font-medium capitalize">SR.NO.</span>
          </div>
        ),
        dataField: 'id',
        formatter: (id) => (
          <div className="flex justify-start items-center">
            <span className="font-medium capitalize">
              {Array.isArray(invoices) &&
                invoices.findIndex((inv) => inv.id === id) + 1}
            </span>
          </div>
        ),
      },
      ...invoicesTableHeaders,
      {
        text: (
          <div className="flex justify-start items-center">
            <span className="font-medium">Action</span>
          </div>
        ),
        dataField: '',
        formatter: (data, row) => (
          <div className="flex gap-2 items-center">
            <Link href={`/dashboard/accounts/invoice/${row.id}`}>
              <Button className={BTN_SIZES['sm']}>
                <FaEye size={28} />
              </Button>
            </Link>
            <Button className={BTN_SIZES['sm']} onClick={() => handleEdit(row)}>
              <MdEdit size={28} />
            </Button>
            <Button
              className={BTN_SIZES['sm']}
              onClick={() => handleDeleteById(row.id)}
            >
              <MdDelete size={28} />
            </Button>
          </div>
        ),
      },
    ],
    [invoices, handleDeleteById, handleEdit],
  );

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      setSearch({
        ...form,
        search: form.search?.trim() ?? '',
      });
    },
    [form, setSearch],
  );

  const handleExport = useCallback(() => {
    // Use the lightweight, library-free exporter which produces an Excel-XML (.xls) with sheet protection
    try {
      exportInvoicesAsLockedXls(invoices, 'invoices_locked.xls');
      toast.success('Export started — download should begin shortly');
    } catch (err) {
      console.error(err);
      toast.error('Export failed');
    }
  }, [invoices]);

  useEffect(() => {
    if (search) {
      setForm({
        search: search.search,
        type: search.type ?? null,
        status: search.status ?? null,
      });
    }
  }, [search]);

  return (
    <DashSection
      title={'Invoices'}
      titleRight={
        <>
          <div>
            <Button
              onClick={() => handleEdit(null)}
              size={'sm'}
              className={'m-2'}
            >
              Create Invoice
            </Button>
            <Button onClick={handleExport} size={'sm'} className={'m-2'}>
              Export Invoice
            </Button>
          </div>
        </>
      }
      className="flex gap-4 flex-col mt-8 p-2"
    >
      <div>
        <form
          onSubmit={handleSearch}
          className="flex flex-wrap justify-end p-2 gap-2"
        >
          <div className="flex gap-2">
            <label className="hidden" htmlFor="search">
              Search
            </label>
            <Input
              className="md:min-w-[250px]"
              type="search"
              label="Search"
              value={form.search}
              onChange={(e) => setForm({ ...form, search: e.target.value })}
              name="search"
              placeholder="Search by invoice number, gstin.."
              id="search"
            />
          </div>
          <div>
            <Input
              type="select"
              placeholder="Select Type"
              isClearable
              label="Type"
              options={[
                { label: 'Purchase', value: 'purchase' },
                { label: 'Sale', value: 'sales' },
              ]}
              onChange={(option) => setForm({ ...form, type: option })}
              value={form.type}
            />
          </div>
          <div>
            <Input
              type="select"
              placeholder="Select Payment"
              isClearable
              label="Payment"
              options={[
                { label: 'Paid', value: 'paid' },
                { label: 'Unpaid', value: 'unpaid' },
              ]}
              onChange={(option) => setForm({ ...form, status: option })}
              value={form.status}
            />
          </div>
          <div className="flex items-end">
            <Button>
              <Icon fontSize={28} icon="ic:baseline-search" />
            </Button>
          </div>
        </form>
        <div className="w-full inline-block align-middle">
          <div className="overflow-auto p-2">
            {isDeleteLoading ? (
              <div className="flex justify-center items-center my-4">
                <Image
                  src={'/loading.svg'}
                  width={50}
                  height={50}
                  alt="Loading.."
                />
              </div>
            ) : (
              <>
                <Suspense
                  fallback={<p className="text-center">Loading table...</p>}
                >
                  <ReactTable columns={adjustedHeaders} data={invoices || []} />
                </Suspense>
                {Array.isArray(invoices) && invoices.length === 0 && (
                  <div className="w-[100vw] border h-full flex flex-col justify-start items-center p-4 min-h-[300px]">
                    <Icon
                      className="w-40 h-24 opacity-5 text-slate-800 mx-auto"
                      icon="ph:files-light"
                    />
                    <p className="text-center font-normal">No Record Found!</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Suspense
          fallback={<p className="text-center">Loading pagination...</p>}
        >
          <Pagination
            currentPage={currentPage}
            totalPages={pagination?.pages}
            setCurrentPage={setCurrentPage}
            invoices={invoices}
          />
        </Suspense>
      </div>
    </DashSection>
  );
}

export default OverviewTable;
