import DataTable from '@/components/pagesComponents/dashboard/GSTR/GSTRPages/DataTable';
import StatusHeader from '@/components/pagesComponents/dashboard/GSTR/GSTRPages/StatusHeader';
import React from 'react';

const HSNSummary = () => {
  const tableData = {
    headers: [
      'SR',
      'HSN *',
      'Description',
      'UQC *',
      'Quantity',
      'Total Value',
      'Taxable Value',
      'IGST',
      'IGST',
      'CGST',
      'SGST',
      'CESS',
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
      </div>
      <div className="p-2">
        <DataTable headers={tableData.headers} rows={tableData.rows} />
      </div>
    </section>
  );
};

export default HSNSummary;
