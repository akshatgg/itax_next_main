import ReactTable from '../ui/ReactTable';
import ExportPDF from './ExportPDF';
import { getInterestAccruedOnNationalList } from '@/app/api/fetchData';
import { IX } from './staticData';
import { getUserOnServer } from '@/lib/getServerSideToken';
import Upload from './temporaryFile/Upload';
import { Suspense } from 'react';
import Image from 'next/image';

const Interestaccruedonnationalxith = async () => {
  const response = await getInterestAccruedOnNationalList('ixth', '2022');
  const user = getUserOnServer();

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
            Interest Accrued on National Saving Certificates{' '}
          </h5>
          <div className="text-right my-6">
            {user?.email === 'jishankhannew@gmail.com' && (
              <Upload
                url={'/api/downloads/interest-accruedon-national'}
                name={'ians3'}
              />
            )}
            <ExportPDF name="Interestaccruedonnationalxith" id="#mytable5" />
          </div>
          <h2 className="bg-primary text-white text-center    p-2 font-semibold">
            Amount of interest accruing on the certificate of Rs. 100
            denomination
          </h2>
          <div className="w-full overflow-auto">
            <ReactTable
              id="mytable5"
              columns={IX}
              data={response?.interestAccruedonNational || []}
            />
          </div>
          <h6 className="text-info mt-4">
            * Discontinued with effect from December 20, 2015
          </h6>
          <span className="">
            National Saving Certificates (IXth Issue):- These certificates are
            issued with effect from December 1, 2011. Maturity period of 10
            years and interest is accrued at the rate of 8.7 percent (8.9
            percent if investment made on or after April 1, 2012) and 8.8 per
            cent(if investment made on or after April 1, 2013) which is
            compounded half yearly. However, interest is taxable on yearly basis
            according to the rates given above.
          </span>
        </div>
        <h6 className="text-secondary text-center my-3">
          [As amended by Finance Act, 2022]
        </h6>
      </Suspense>
    </>
  );
};

export default Interestaccruedonnationalxith;
