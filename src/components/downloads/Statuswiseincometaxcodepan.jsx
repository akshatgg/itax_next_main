import { getUserOnServer } from '@/lib/getServerSideToken';
import ReactTable from '../ui/ReactTable';
import DownloadButton from './DownloadButton';
// import Upload from './temporaryFile/Upload';

const Statuswiseincometaxcodepan = ({ data }) => {
  const user = getUserOnServer();

  const headers = [
    {
      text: (
        <div className="flex justify-start items-center">
          <span>Status</span>
        </div>
      ),
      dataField: 'status',
      formatter: (data) => (
        <div className="flex justify-start items-center">
          <span>{data}</span>
        </div>
      ),
    },
    {
      text: (
        <div className="flex justify-start items-center">
          <span>Income Tax code</span>
        </div>
      ),
      dataField: 'incomeTaxCode',
      formatter: (data) => (
        <div className="flex justify-start items-center">
          <span>{data}</span>
        </div>
      ),
    },
    {
      text: (
        <div className="flex justify-start items-center">
          <span>Pan Code (4th digit of Pan)</span>
        </div>
      ),
      dataField: 'panCode',
      formatter: (data) => (
        <div className="flex justify-start items-center">
          <span>{data}</span>
        </div>
      ),
    },
  ];

  return (
    <>
      <h5 className="text-center my-5 font-medium text-2xl">
        Status wise Income Tax Code and PAN Code
      </h5>
      <div className="m-2 grid gap-3">
        <div className="flex justify-end">
          <DownloadButton
            id={'#statuswisepan'}
            fileName={'Statuswiseincometaxcodepan.pdf'}
            size={'sm'}
          >
            Download
          </DownloadButton>
        </div>
        <ReactTable
          id={'statuswisepan'}
          columns={headers}
          data={
            (Array.isArray(data?.PanAndITCodeByStatus) &&
              data.PanAndITCodeByStatus) ||
            []
          }
        />
      </div>

      <h6 className="my-6 text-secondary text-center">
        [As amended by Finance Act, {data?.financialYear}]
      </h6>
    </>
  );
};

export default Statuswiseincometaxcodepan;
