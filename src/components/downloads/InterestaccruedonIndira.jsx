import ReactTable from '../ui/ReactTable';
import ExportPDF from './ExportPDF';
import { getInterestAccruedOnNationalList } from '@/app/api/fetchData';
import { IVP } from './staticData';
import Upload from './temporaryFile/Upload';
import { getUserOnServer } from '@/lib/getServerSideToken';
import { Suspense } from 'react';
import Image from 'next/image';

const InterestaccruedonIndira = async () => {
  const user = getUserOnServer();
  const response = await getInterestAccruedOnNationalList('ivp', '2022');
  // console.log(response);
  return (
    <>
      <Suspense
        fallback={
          <div className="flex h-[70vh] justify-center items-center">
            <Image
              width={50}
              height={50}
              alt={'Loading...'}
              src={'/public/whiteLoader.svg'}
            />
          </div>
        }
      >
        <div>
          <h5 className="text-center my-5">
            Interest Accrued on Indira Vikas patras (IVP)
          </h5>
          <div className="text-right my-6">
            {user?.email === 'jishankhannew@gmail.com' && (
              <Upload
                url={'/api/downloads/interest-accruedon-national'}
                name={'ians2'}
              />
            )}
            <ExportPDF
              id="#mytable6"
              name="interestaccruedonindiravikaspatras"
            />
          </div>
          <ReactTable
            id="mytable6"
            columns={IVP}
            data={response?.interestAccruedonNational || []}
          />
          <h6 className="text-secondary text-center my-3">
            [As amended by Finance Act, {response?.financeAct}]
          </h6>
        </div>
      </Suspense>
    </>
  );
};

export default InterestaccruedonIndira;
