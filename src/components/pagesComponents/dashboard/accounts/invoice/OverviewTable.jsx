// 'use client';
// import React, { useEffect, useState } from 'react';
// import DashSection from '@/components/pagesComponents/pageLayout/DashSection';
// import Link from 'next/link';
// import { Icon } from '@iconify/react';
// import Pagination from '@/components/navigation/Pagination';
// import ReactTable from '@/components/ui/ReactTable';
// import { invoicesTableHeaders } from './staticData';
// import Button, { BTN_SIZES } from '@/components/ui/Button';
// import { FaEye } from 'react-icons/fa';
// import { MdEdit, MdDelete } from 'react-icons/md';
// import { toast } from 'react-toastify';
// import userAxios from '@/lib/userAxios';
// import Image from 'next/image';
// import Input from '@/components/ui/Input';
// import { IoMdDownload } from 'react-icons/io';
// import ExcelJS from 'exceljs';
// import { InputStyles } from '@/app/styles/InputStyles';

// function OverviewTable({
//   handleEdit,
//   invoices,
//   refresh,
//   search,
//   setSearch,
//   pagination,
//   currentPage,
//   setCurrentPage,
// }) {
//   const [isDeleteLoading, setDeleteLoading] = useState(false);
//   const [form, setForm] = useState({ search: '', type: { label: '', value: '' } });

//   const handleDeleteById = async (id) => {
//     try {
//       if (window.confirm('Are you sure?')) {
//         setDeleteLoading(true);
//         const response = await userAxios.delete(`/invoice/invoices/${id}`);
//         if (response.status === 200) {
//           await refresh();
//           toast.success(response.data.message);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error('Something went wrong');
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   const adjustedHeaders = [
//     {
//       text: <div className="text-[8px] sm:text-[10px] capitalize">SR.NO.</div>,
//       dataField: 'id',
//       formatter: (id) =>
//         Array.isArray(invoices)
//           ? invoices.findIndex((inv) => inv.id === id) + 1
//           : '-',
//     },
//     ...invoicesTableHeaders,
//     {
//       text: <div className="text-[8px] sm:text-[10px] capitalize">Action</div>,
//       dataField: '',
//       formatter: (data, row) => (
//         <div className="flex gap-1 items-center">
//           <Link href={`/dashboard/accounts/invoice/${row.id}`}>
//             <Button className={BTN_SIZES.sm}><FaEye /></Button>
//           </Link>
//           <Button className={BTN_SIZES.sm} onClick={() => handleEdit(row)}>
//             <MdEdit />
//           </Button>
//           <Button className={BTN_SIZES.sm} onClick={() => handleDeleteById(row.id)}>
//             <MdDelete />
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setSearch({ ...form, search: form.search?.trim() });
//   };

//   const handleExport = async () => {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Invoices');

//     const giveMaxWidth = (column) => {
//       let maxWidth = column.length;
//       invoices.forEach((item) => {
//         if (item[column] && item[column].length > maxWidth) {
//           maxWidth = item[column].length;
//         }
//       });
//       return maxWidth;
//     };

//     worksheet.columns = Object.keys(tableData).map((col) => ({
//       header: col,
//       key: tableData[col],
//       width: giveMaxWidth(tableData[col]) + 2,
//     }));

//     invoices.forEach((invoice) => {
//       worksheet.addRow(invoice);
//     });

//     worksheet.getRow(1).height = 40;
//     worksheet.getRow(1).font = { bold: true };
//     worksheet.getRow(1).eachCell((cell) => {
//       cell.fill = {
//         type: 'pattern',
//         pattern: 'solid',
//         fgColor: { argb: 'FFCCCCCC' },
//       };
//       cell.alignment = { vertical: 'middle' };
//     });

//     const buffer = await workbook.xlsx.writeBuffer();
//     const blob = new Blob([buffer], {
//       type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//     });
//     const downloadUrl = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = downloadUrl;
//     link.download = 'invoices.xlsx';
//     link.click();
//     URL.revokeObjectURL(downloadUrl);
//   };

//   useEffect(() => {
//     if (search) {
//       setForm({
//         search: search.search,
//         type: search.type ?? null,
//         status: search.status ?? null,
//       });
//     }
//   }, [search]);

//   return (
//     <DashSection>
//   <form onSubmit={handleSearch} className={InputStyles.invoiceFormGrid}>
//   <Input
//     type="search"
//     label="Search"
//     labelClassName="text-blue-900"
//     className="h-10 text-sm placeholder:text-sm placeholder:pl-2" 
//     placeholder="Invoice No./GSTIN"
//     name="search"
//     value={form.search}
//     onChange={(e) => setForm({ ...form, search: e.target.value })}
//   />
//   <Input
//   type="select"
//   label="Type"
//   labelClassName="text-blue-900"
//   className="h-10 text-sm placeholder:text-sm" 
//   isClearable
//   placeholder="Sale / Purchase"
//   value={form.type}
//   onChange={(option) => setForm({ ...form, type: option })}
//   options={[
//     { label: 'Purchase', value: 'purchase' },
//     { label: 'Sale', value: 'sales' },
//   ]}
// />

// <Input
//   type="select"
//   label="Payment"
//   labelClassName="text-blue-900"
//   className="h-10 text-sm placeholder:text-sm"
//   isClearable
//   placeholder="Paid / Unpaid"
//   value={form.status}
//   onChange={(option) => setForm({ ...form, status: option })}
//   options={[
//     { label: 'Paid', value: 'paid' },
//     { label: 'Unpaid', value: 'unpaid' },
//   ]}
// />

//   <Button
//     type="submit"
//     className={`${InputStyles.invoiceSearchBtn} "h-10 text-sm placeholder:text-sm placeholder:pl-2`}
//   >
//     <Icon fontSize={24} icon="ic:baseline-search"/> Search
//   </Button>
// </form>

//       <div className={InputStyles.invoiceTableWrapper}>
//         {isDeleteLoading ? (
//           <div className="flex justify-center items-center h-40">
//             <Image src="/loading.svg" width={50} height={50} alt="Loading..."/>
//           </div>
//         ) : (
//           <>
//             <ReactTable columns={adjustedHeaders} data={invoices || []} />
//             {Array.isArray(invoices) && invoices.length === 0 && (
//               <div className="w-full py-8 text-center text-gray-400">
//                 <Icon icon="ph:files-light" className="w-20 h-20 mx-auto opacity-10" />
//                 <p>No invoices found</p>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       <div className="flex justify-end">
//         <Pagination
//           currentPage={currentPage}
//           totalPages={pagination?.pages}
//           setCurrentPage={setCurrentPage}
//           invoices={invoices}
//         />
//       </div>
//     </DashSection>
//   );
// }

// export default OverviewTable;

// OverviewTable.jsx (plain JSX version – no TypeScript)
"use client";
import React, { useEffect, useMemo, useState } from "react";
import DashSection from "@/components/pagesComponents/pageLayout/DashSection";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Pagination from "@/components/navigation/Pagination";
import ReactTable from "@/components/ui/ReactTable";
import { invoicesTableHeaders } from "./staticData";
import Button, { BTN_SIZES } from "@/components/ui/Button";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import userAxios from "@/lib/userAxios";
import Image from "next/image";
import Input from "@/components/ui/Input";
import { IoMdDownload } from "react-icons/io";
import ExcelJS from "exceljs";
import { InputStyles } from "@/app/styles/InputStyles";

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
  const [isExporting, setExporting] = useState(false);
  const [form, setForm] = useState({ search: "", type: null, status: null });

  const confirmBox = (msg) => (typeof window !== "undefined" ? window.confirm(msg) : false);

  const handleDeleteById = async (id) => {
    try {
      if (confirmBox("Are you sure you want to delete this invoice?")) {
        setDeleteLoading(true);
        const response = await userAxios.delete(`/invoice/invoices/${id}`);
        if (response.status === 200) {
          await refresh();
          toast.success(response.data?.message || "Invoice deleted");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setDeleteLoading(false);
    }
  };

  const adjustedHeaders = useMemo(() => {
    const serialCol = {
      text: <div className="text-[10px] sm:text-xs capitalize">SR.NO.</div>,
      dataField: "id",
      headerClasses: "!sticky !top-0 bg-white z-10",
      formatter: (id) => (Array.isArray(invoices) ? invoices.findIndex((inv) => inv.id === id) + 1 : "-"),
    };

    const actionCol = {
      text: <div className="text-[10px] sm:text-xs capitalize">Action</div>,
      dataField: "__actions__",
      headerClasses: "!sticky !top-0 bg-white z-10",
      formatter: (data, row) => (
        <div className="flex gap-1 items-center justify-start">
          <Link href={`/dashboard/accounts/invoice/${row.id}`} aria-label={`View invoice ${row?.invoiceNo || row?.id}`}>
            <Button className={BTN_SIZES.sm} title="View">
              <FaEye aria-hidden />
            </Button>
          </Link>
          <Button className={BTN_SIZES.sm} onClick={() => handleEdit && handleEdit(row)} title="Edit" aria-label="Edit invoice">
            <MdEdit aria-hidden />
          </Button>
          <Button
            className={`${BTN_SIZES.sm} !bg-red-50 !text-red-600 hover:!bg-red-100`}
            onClick={() => handleDeleteById(row.id)}
            title="Delete"
            aria-label="Delete invoice"
          >
            <MdDelete aria-hidden />
          </Button>
        </div>
      ),
    };

    return [serialCol, ...(invoicesTableHeaders || []), actionCol];
  }, [invoices]);

  const handleSearch = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (setSearch) setSearch({ ...form, search: form.search ? form.search.trim() : "" });
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const rows = Array.isArray(invoices) ? invoices : [];
      if (!rows.length) {
        toast.info("No invoices to export");
        return;
      }

      const pickValue = (obj, path) => path.split(".").reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj);

      const candidateKeys = new Set([
        "invoiceNo",
        "date",
        "type",
        "partyName",
        "party.name",
        "gstin",
        "party.gstin",
        "total",
        "totalAmount",
        "status",
      ]);

      const first = rows[0] || {};
      Object.keys(first).forEach((k) => {
        const v = first[k];
        if (["string", "number", "boolean"].includes(typeof v)) candidateKeys.add(k);
      });

      const headers = Array.from(candidateKeys).filter((k) => rows.some((r) => pickValue(r, k) !== undefined));

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Invoices");

      const computeWidth = (key) => {
        const header = key;
        let max = header.length;
        rows.forEach((r) => {
          const val = pickValue(r, key);
          const s = val === null || val === undefined ? "" : String(val);
          if (s.length > max) max = s.length;
        });
        return Math.min(Math.max(max + 2, 10), 40);
      };

      worksheet.columns = headers.map((key) => ({ header: key.toUpperCase(), key, width: computeWidth(key) }));

      rows.forEach((r) => {
        const row = {};
        headers.forEach((key) => {
          row[key] = pickValue(r, key);
        });
        worksheet.addRow(row);
      });

      worksheet.getRow(1).height = 28;
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).eachCell((cell) => {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF1F5F9" } };
        cell.alignment = { vertical: "middle" };
        cell.border = {
          top: { style: "thin", color: { argb: "FFE2E8F0" } },
          bottom: { style: "thin", color: { argb: "FFE2E8F0" } },
        };
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `invoices_${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error(err);
      toast.error("Export failed");
    } finally {
      setExporting(false);
    }
  };

  useEffect(() => {
    if (search) {
      setForm({
        search: search.search || "",
        type: search.type ?? null,
        status: search.status ?? null,
      });
    }
  }, [search]);

  return (
    <DashSection className="mt-2">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between p-4">
        <form onSubmit={handleSearch} className={`${InputStyles.invoiceFormGrid} w-full`}>
          <Input
            type="search"
            label="Search"
            labelClassName="text-blue-900"
            className="h-10 text-sm placeholder:text-sm placeholder:pl-2"
            placeholder="Invoice No. / GSTIN"
            name="search"
            value={form.search}
            onChange={(e) => setForm({ ...form, search: e.target.value })}
          />

          <Input
            type="select"
            label="Type"
            labelClassName="text-blue-900"
            className="h-10 text-sm placeholder:text-sm"
            isClearable
            placeholder="Sale / Purchase"
            value={form.type}
            onChange={(option) => setForm({ ...form, type: option })}
            options={[
              { label: "Purchase", value: "purchase" },
              { label: "Sale", value: "sales" },
            ]}
          />

          <Input
            type="select"
            label="Payment"
            labelClassName="text-blue-900"
            className="h-10 text-sm placeholder:text-sm"
            isClearable
            placeholder="Paid / Unpaid"
            value={form.status}
            onChange={(option) => setForm({ ...form, status: option })}
            options={[
              { label: "Paid", value: "paid" },
              { label: "Unpaid", value: "unpaid" },
            ]}
          />

          <div className="flex gap-2 items-center">
            <Button type="submit" className={`${InputStyles.invoiceSearchBtn} h-10`}>
              <Icon fontSize={20} icon="ic:baseline-search" />
              <span className="ml-1">Search</span>
            </Button>
          </div>
        </form>
      </div>
      <div className={`${InputStyles.invoiceTableWrapper} relative`}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-white/80 to-transparent z-10" />

        {isDeleteLoading ? (
          <div className="flex justify-center items-center h-40">
            <Image src="/loading.svg" width={50} height={50} alt="Loading..." />
          </div>
        ) : Array.isArray(invoices) && invoices.length > 0 ? (
          <ReactTable columns={adjustedHeaders} data={invoices} />
        ) : (
          <div className="w-full py-12 text-center text-gray-400">
            <Icon icon="ph:files-light" className="w-20 h-20 mx-auto opacity-20" />
            <p className="mt-2">No invoices found</p>
          </div>
        )}
      </div>

      <div className="flex justify-end p-4">
        <Pagination
          currentPage={currentPage}
          totalPages={pagination?.pages}
          setCurrentPage={setCurrentPage}
          invoices={invoices}
        />
      </div>
    </DashSection>
  );
}

export default OverviewTable;
