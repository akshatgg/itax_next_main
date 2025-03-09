import DataTable from '@/components/pagesComponents/dashboard/GSTR/GSTRPages/DataTable';
import StatusHeader from '@/components/pagesComponents/dashboard/GSTR/GSTRPages/StatusHeader';
import { Tab, Tabs } from '@/components/pagesComponents/dashboard/Tabs';
import { tabOption } from './staticData';

const page = () => {
  const tableData = {
    headers: [
      'Sr.',
      'GSTIN',
      'Name',
      'No.',
      'Date',
      'ISD Type',
      'IGST',
      'CGST',
      'SGST',
      'CESS',
      'ITC',
      'Source',
    ],
    rows: [
      ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['Total', '', '', '', '', '', '0', '0', '0', '0', '', ''],
    ],
  };

  return (
    <section>
      <div className="m-2">
        <Tabs>
          {Object.values(tabOption).map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </div>

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

export default page;
