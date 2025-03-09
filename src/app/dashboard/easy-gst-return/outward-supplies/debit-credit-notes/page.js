import DataTable from '@/components/pagesComponents/dashboard/GSTR/GSTRPages/DataTable';
import StatusHeader from '@/components/pagesComponents/dashboard/GSTR/GSTRPages/StatusHeader';
import React from 'react';

const DebitCreditNotes = () => {
  const tableData = {
    headers: [
      'Sr.',
      'GSTIN',
      'Recipient Name',
      'POS',
      'Invoice No.',
      'Invoice Date',
      'Invoice Amount',
      'Taxable Value',
      'GST Amount',
      'Nature',
      'Source',
    ],
    rows: [['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']],
  };

  return (
    <section>
      <StatusHeader />
      <div className="flex justify-between">
        <div className="flex gap-2 px-2 items-center">
          <label htmlFor="supplyType">Supply Type: </label>
          <select className="p-2 rounded-md" id="supplyType">
            <option value="All">All</option>
          </select>
        </div>
        <div className="flex gap-2 px-2 items-center">
          <label htmlFor="createNote">Invoice No. to create note: </label>
          <input
            className="border p-1 rounded-md"
            placeholder="Create note"
            type="text"
            id="createNote"
          />
          <button className="bg-primary p-2 text-white rounded-md focus-within:scale-95 hover:opacity-85">
            Create
          </button>
        </div>
      </div>
      <div className="p-2">
        <DataTable headers={tableData.headers} rows={tableData.rows} />
      </div>
    </section>
  );
};

export default DebitCreditNotes;
