import ReactTable from '../ui/ReactTable';
import ExportPDF from './ExportPDF';
import { countryCodeTableHeaders } from './staticData';
import { Suspense } from 'react';
import Image from 'next/image';
import { nodeAxios as api } from '@/lib/axios';

async function getCountryCodes(date) {
  try {
    const { data, status } = await api.get(
      `/api/downloads/country-code-list?assessYear=${date}`,
    );
    if (status === 200) {
      return data?.data;
    }
  } catch (error) {
    console.log(error.message);
  }
}

const Countrycode = async () => {
  const data1 = await getCountryCodes('2013-2014');
  const data2 = await getCountryCodes('2012-2013');

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
        <div className="mx-10">
          <div>
            <div>
              <div>
                <div className="text-right my-4">
                  <ExportPDF id="#mytable6" name="Country_Code" />
                </div>
                <h5 className="text-center my-5">
                  Approved DIT Country codes (From Ass. Year {data1?.assessYear}
                  )
                </h5>

                <ReactTable
                  id="mytable6"
                  columns={countryCodeTableHeaders}
                  data={data1?.countryCodes || []}
                />
              </div>
              <div className="col">
                <h5 className="text-center my-5">
                  List Upto Ass. Year {data2?.assessYear}
                </h5>

                <ReactTable
                  id="mytable6"
                  columns={countryCodeTableHeaders}
                  data={data2?.countryCodes || []}
                />
              </div>
            </div>
          </div>

          <h6 className="text-secondary text-center">
            [As amended by Finance Act, 2022]
          </h6>
        </div>
      </Suspense>
    </>
  );
};

export default Countrycode;
