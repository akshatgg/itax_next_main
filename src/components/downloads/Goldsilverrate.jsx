import ReactTable from '../ui/ReactTable';
import ExportPDF from './ExportPDF';
import { getGoldSilverRates } from '@/app/api/fetchData';
import { goldSilverRateTableHeaders } from './staticData';
import { getUserOnServer } from '@/lib/getServerSideToken';
import { Suspense } from 'react';
import Image from 'next/image';
// import Upload from './temporaryFile/Upload';

// const tableHeaders = {
//   assessmentYear: 'Assessment year/ valuation date',
//   stGoldRate24CPer10Grams: 'Standard Gold 24 Carats Rate for 10 grams Rs.',
//   stSilverRateFor1Kg: 'Silver 999 touch Rate of 1 Kg. Rs.',
// };

const Goldsilverrate = async () => {
  const user = getUserOnServer();
  const response = await getGoldSilverRates();

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
        <div className="m-5">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block text-right min-w-full">
                <ExportPDF id="#mytable1" name="GoldSilverRate" />
              </div>

              <div className="overflow-hidden">
                <ReactTable
                  id="mytable1"
                  columns={goldSilverRateTableHeaders}
                  data={response || []}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h6 className="my-5">
            Notes :
            <p>
              1. Value of gold contained in gold ornaments should be reduced by
              14 to 20 per cent of ruling rates of standard gold, as per the
              practice prevalent in the bullion market and the amount of
              reduction has to be worked out in the following manner :
            </p>
          </h6>
        </div>

        <table>
          <thead>
            <tr className="bg-blue-300">
              <th
                className="border border-gray-300 p-2 font-semibold"
                scope="col"
              ></th>
              <th
                className="border border-gray-300 p-2 font-semibold"
                scope="col"
              >
                Plain gold bangles and ornaments made of solid gold
              </th>
              <th scope="col">Other gold ornaments</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-10 text-left">
              <td className="border border-gray-300 p-2">
                Difference in value between 24 carats of standard gold and 22
                carats of gold ornaments (gold ornaments are generally made of
                22 carats of gold)
              </td>
              <td className="border border-gray-300 p-2">8.33%</td>
              <td className="border border-gray-300 p-2">8.33%</td>
            </tr>
            <tr className="h-10 text-left">
              <td className="border border-gray-300 p-2">
                Soldering made of copper, silver, etc., used in making ornaments
              </td>
              <td className="border border-gray-300 p-2">2.5% to 5%</td>
              <td className="border border-gray-300 p-2">8.33%</td>
            </tr>
            <tr className="h-10 text-left">
              <td className="border border-gray-300 p-2">
                Shortage of gold in melting, mint charges payable to Government,
                expenditure on freight, insurance, etc., of sending gold
                ornaments to approved mint for conversion into standard gold
                bars
              </td>
              <td className="border border-gray-300 p-2">1.25%</td>
              <td className="border border-gray-300 p-2">1.25%</td>
            </tr>
            <tr className="h-10 text-left">
              <td className="border border-gray-300 p-2">
                Margin of profit of the dealer when ornaments are sold in market
              </td>
              <td className="border border-gray-300 p-2">2%</td>
              <td className="border border-gray-300 p-2">2%</td>
            </tr>
            <tr className="h-10 text-left">
              <td className="border border-gray-300 p-2">Total reduction</td>
              <td className="border border-gray-300 p-2">14.08% to 16.58%</td>
              <td className="border border-gray-300 p-2">19.91%</td>
            </tr>
          </tbody>
        </table>
        <h6 className="my-5">
          2. Silver wares, utensils, etc., is liable for wealth-tax.
          <br />
          3. Conversion table:
        </h6>

        <table>
          <tbody>
            <tr className="h-10 text-left">
              <td className="border border-gray-300 p-2">10 grams</td>
              <td className="border border-gray-300 p-2">=</td>
              <td className="border border-gray-300 p-2">0.857 tola</td>
              <td className="border border-gray-300 p-2">1 tola</td>
              <td className="border border-gray-300 p-2">=</td>
              <td className="border border-gray-300 p-2">11.664 grams</td>
            </tr>
            <tr className="h-10 text-left">
              <td className="border border-gray-300 p-2">1 kilogram</td>
              <td className="border border-gray-300 p-2">=</td>
              <td className="border border-gray-300 p-2">85.734 tolas</td>
              <td className="border border-gray-300 p-2">10 tola</td>
              <td className="border border-gray-300 p-2">=</td>
              <td className="border border-gray-300 p-2">116.638 grams</td>
            </tr>
          </tbody>
        </table>
        <h6 className="text-secondary mt-5 text-center">
          [As amended by Finance Act, 2022]
        </h6>
      </Suspense>
    </>
  );
};

export default Goldsilverrate;
