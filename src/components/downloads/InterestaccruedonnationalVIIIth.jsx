import ReactTable from '../ui/ReactTable';
import ExportPDF from './ExportPDF';
import { getInterestAccruedOnNationalList } from '@/app/api/fetchData';
import { InterestAccruedOnNationalListVIII } from './staticData';
// import { getUserOnServer } from '@/lib/getServerSideToken';
// import Upload from './temporaryFile/Upload';
import { Suspense } from 'react';
import Image from 'next/image';

const InterestaccruedonnationalVIIIth = async () => {
  // const user = getUserOnServer();
  const response = await getInterestAccruedOnNationalList('viiith', '2022');
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
          <h5 className="my-5 text-center">
            Interest Accrued on National VIIIth
          </h5>
          <div className="text-right">
            <ExportPDF id="#mytable7" name="InterestAccruedOnNationalVIIIth" />
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div>
                  <h2 className="bg-primary text-white p-2 text-center font-semibold">
                    Amount of interest accruing on the certificate of Rs. 100
                    denomination
                  </h2>
                  <div className="overflow-auto w-full">
                    <ReactTable
                      id="mytable7"
                      columns={InterestAccruedOnNationalListVIII}
                      data={response?.interestAccruedonNational || []}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h6 className="text-info">* Maturity period 5 years</h6>
          <span>
            Note: 1. Deduction u/s 80L is available on the accrued interest up
            to A.Y. 2005-06. From A.Y. 2006-07 section 80L has been deleted.
            <br />
            2. Accrued interest qualifies for rebate u/s 88 except for the
            maturing year up to A.Y. 2005-06. From A.Y. 2006-07, the accrued
            interest is deductible u/s 80C except for the maturing year.
          </span>
        </div>
        <h6 className="text-secondary text-center my-3">
          [As amended by Finance Act, {response?.financeAct}]
        </h6>
      </Suspense>
    </>
  );
};

export default InterestaccruedonnationalVIIIth;
