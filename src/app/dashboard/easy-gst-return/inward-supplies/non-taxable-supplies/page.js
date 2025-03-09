import DataTable from '@/components/pagesComponents/dashboard/GSTR/GSTRPages/DataTable';
import StatusHeader from '@/components/pagesComponents/dashboard/GSTR/GSTRPages/StatusHeader';

const page = () => {
  const tableData = {
    headers: [
      'Sr.',
      'Nature of supply',
      'Composition',
      'Exempted',
      'Nill rated',
      'Non-GST',
    ],
    rows: [
      ['1.', 'Inter-state', '0', '0', '0', '0'],
      ['2.', 'Within-state', '0', '0', '0', '0'],
      ['', 'Total', '0', '0', '0', '0'],
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

export default page;
