import DataTable from '@/components/pagesComponents/dashboard/GSTR/GSTRPages/DataTable';
import StatusHeader from '@/components/pagesComponents/dashboard/GSTR/GSTRPages/StatusHeader';
import React from 'react';

const TaxableSupplies = () => {
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
      <div className="p-2">
        <DataTable headers={tableData.headers} rows={tableData.rows} />
      </div>
    </section>
  );
};

export default TaxableSupplies;
