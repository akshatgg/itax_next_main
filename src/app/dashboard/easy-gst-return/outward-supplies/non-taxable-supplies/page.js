import React from 'react';
import DataTable from '@/components/pagesComponents/dashboard/GSTR/GSTRPages/DataTable';
import StatusHeader from '@/components/pagesComponents/dashboard/GSTR/GSTRPages/StatusHeader';

const NonTaxableSupplies = () => {
  const tableData = {
    headers: [
      'Sr.',
      'Nature of supply',
      'Nill rated',
      'Exempted',
      'Non-GST supplies',
    ],
    rows: [
      ['1.', 'Registered person inter-state', '0', '0', '0'],
      ['2.', 'Unregistered person inter-state', '0', '0', '0'],
      ['3.', 'Registered person within-state', '0', '0', '0'],
      ['4.', 'Unregistered person within-state', '0', '0', '0'],
      ['', 'Total', '0', '0', '0'],
    ],
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

export default NonTaxableSupplies;
