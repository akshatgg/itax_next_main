import ReactTable from '@/components/ui/ReactTable';
import DownloadButton from './DownloadButton';
import { getUserOnServer } from '@/lib/getServerSideToken';
import Upload from './temporaryFile/Upload';

const Newcostinflationindex = ({ data, name }) => {
  const user = getUserOnServer();
  const titleMap = {
    'Cost Inflation Index List 2022': 'Cost Inflation Index List 2022',
    'Cost Inflation Index List-2 2022': 'New cost inflation index 2022',
  };

  const tableColumns = [
    {
      text: (
        <div className="flex justify-start">
          <span>ID</span>
        </div>
      ),
      dataField: 'id',
      formatter: (data) => (
        <div className="flex justify-start">
          <span>{data}</span>
        </div>
      ),
    },
    {
      text: (
        <div className="flex justify-start">
          <span>Financial Year</span>
        </div>
      ),
      dataField: 'financialYear',
      formatter: (data) => {
        return (
          <div className="flex justify-start items-center">
            <span>{data}</span>
          </div>
        );
      },
    },
    {
      text: (
        <div className="flex justify-start">
          <span>Cost Inflation Index</span>
        </div>
      ),
      dataField: 'costInflationIndex',
      formatter: (data) => {
        return (
          <div className="flex justify-start items-center">
            <span>{data}</span>
          </div>
        );
      },
    },
  ];

  const getTableData = () => {
    if (data && data?.costInflationIndex?.length > 0) {
      return data.costInflationIndex.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
    }
    return [];
  };

  return (
    <>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-x-auto">
              <h5 className="text-center my-5 text-2xl font-medium">
                {titleMap[data?.listName]}
              </h5>

              <div className="flex justify-end m-1">
                {user?.email === 'jishankhannew@gmail.com' && (
                  <Upload
                    url={'/api/downloads/cost-inflation-index'}
                    name={name}
                  />
                )}
                <DownloadButton
                  id={'#costinflation'}
                  fileName={'costinflationindex.pdf'}
                />
              </div>
              <div className="m-1 mb-6">
                <ReactTable
                  id={'costinflation'}
                  columns={tableColumns}
                  data={getTableData()}
                />
              </div>
              <h6 className="text-secondary text-center">
                [As amended by Finance Act, {data?.financeAct}]
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Newcostinflationindex;
