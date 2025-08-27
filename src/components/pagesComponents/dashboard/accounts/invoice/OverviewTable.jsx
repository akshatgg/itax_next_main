'use client';
import React, { useEffect, useState } from 'react';
import DashSection from '@/components/pagesComponents/pageLayout/DashSection';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Pagination from '@/components/navigation/Pagination';
import ReactTable from '@/components/ui/ReactTable';
import { invoicesTableHeaders } from './staticData';
import Button, { BTN_SIZES } from '@/components/ui/Button';
import { FaEye } from 'react-icons/fa';
import { MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import userAxios from '@/lib/userAxios';
import Image from 'next/image';
import Input from '@/components/ui/Input';
import { IoMdDownload } from 'react-icons/io';
import ExcelJS from 'exceljs';
import { InputStyles } from '@/app/styles/InputStyles';

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
  const [form, setForm] = useState({ search: '', type: { label: '', value: '' } });

  const handleDeleteById = async (id) => {
    try {
      if (window.confirm('Are you sure?')) {
        setDeleteLoading(true);
        const response = await userAxios.delete(`/invoice/invoices/${id}`);
        if (response.status === 200) {
          await refresh();
          toast.success(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setDeleteLoading(false);
    }
  };

  const adjustedHeaders = [
    {
      text: <div className="text-[8px] sm:text-[10px] capitalize">SR.NO.</div>,
      dataField: 'id',
      formatter: (id) =>
        Array.isArray(invoices)
          ? invoices.findIndex((inv) => inv.id === id) + 1
          : '-',
    },
    ...invoicesTableHeaders,
    {
      text: <div className="text-[8px] sm:text-[10px] capitalize">Action</div>,
      dataField: '',
      formatter: (data, row) => (
        <div className="flex gap-1 items-center">
          <Link href={`/dashboard/accounts/invoice/${row.id}`}>
            <Button className={BTN_SIZES.sm}><FaEye /></Button>
          </Link>
          <Button className={BTN_SIZES.sm} onClick={() => handleEdit(row)}>
            <MdEdit />
          </Button>
          <Button className={BTN_SIZES.sm} onClick={() => handleDeleteById(row.id)}>
            <MdDelete />
          </Button>
        </div>
      ),
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch({ ...form, search: form.search?.trim() });
  };

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Invoices');

    const giveMaxWidth = (column) => {
      let maxWidth = column.length;
      invoices.forEach((item) => {
        if (item[column] && item[column].length > maxWidth) {
          maxWidth = item[column].length;
        }
      });
      return maxWidth;
    };

    worksheet.columns = Object.keys(tableData).map((col) => ({
      header: col,
      key: tableData[col],
      width: giveMaxWidth(tableData[col]) + 2,
    }));

    invoices.forEach((invoice) => {
      worksheet.addRow(invoice);
    });

    worksheet.getRow(1).height = 40;
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFCCCCCC' },
      };
      cell.alignment = { vertical: 'middle' };
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'invoices.xlsx';
    link.click();
    URL.revokeObjectURL(downloadUrl);
  };

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

      // title={<span className={InputStyles.sectionTitle}>Invoices</span>}
      // titleRight={
      //   <div className="flex flex-wrap gap-2">
      //     <Button onClick={() => handleEdit(null)} size="sm" className={InputStyles.invoiceCreateBtn}>Create Invoice</Button>
      //     <Button onClick={handleExport} size="sm" className={InputStyles.invoiceCreateBtn}>Export Invoice</Button>
      //   </div>
      // }
      // className="flex flex-col gap-6 mt-6 p-4"
    >
      {/* <form onSubmit={handleSearch} className={InputStyles.invoiceFormGrid}>
        <Input
          type="search"
          label="Search"
          labelClassName="text-blue-900"
          placeholder="Invoice No. / GSTIN"
          name="search"
          value={form.search}
          onChange={(e) => setForm({ ...form, search: e.target.value })}
        />
        <Input
          type="select"
          label="Type"
          labelClassName="text-blue-900"
          isClearable
          placeholder="Sale / Purchase"
          value={form.type}
          onChange={(option) => setForm({ ...form, type: option })}
          options={[
            { label: 'Purchase', value: 'purchase' },
            { label: 'Sale', value: 'sales' },
          ]}
        />
        <Input
          type="select"
          label="Payment"
          labelClassName="text-blue-900"
          isClearable
          placeholder="Paid / Unpaid"
          value={form.status}
          onChange={(option) => setForm({ ...form, status: option })}
          options={[
            { label: 'Paid', value: 'paid' },
            { label: 'Unpaid', value: 'unpaid' },
          ]}
        />
        <Button type="submit" className={InputStyles.invoiceSearchBtn}>
          <Icon fontSize={24} icon="ic:baseline-search" /> Search 
        </Button>
      </form> */}


  <form onSubmit={handleSearch} className={InputStyles.invoiceFormGrid}>
  <Input
    type="search"
    label="Search"
    labelClassName="text-blue-900"
    className="h-10 text-sm placeholder:text-sm placeholder:pl-2" 
    placeholder="Invoice No./GSTIN"
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
    { label: 'Purchase', value: 'purchase' },
    { label: 'Sale', value: 'sales' },
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
    { label: 'Paid', value: 'paid' },
    { label: 'Unpaid', value: 'unpaid' },
  ]}
/>

  <Button
    type="submit"
    className={`${InputStyles.invoiceSearchBtn} "h-10 text-sm placeholder:text-sm placeholder:pl-2`}
  >
    <Icon fontSize={24} icon="ic:baseline-search"/> Search
  </Button>
</form>

      <div className={InputStyles.invoiceTableWrapper}>
        {isDeleteLoading ? (
          <div className="flex justify-center items-center h-40">
            <Image src="/loading.svg" width={50} height={50} alt="Loading..."/>
          </div>
        ) : (
          <>
            <ReactTable columns={adjustedHeaders} data={invoices || []} />
            {Array.isArray(invoices) && invoices.length === 0 && (
              <div className="w-full py-8 text-center text-gray-400">
                <Icon icon="ph:files-light" className="w-20 h-20 mx-auto opacity-10" />
                <p>No invoices found</p>
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex justify-end">
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