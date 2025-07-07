// import ExportPDF from './ExportPDF';
// import { KVP } from './staticData';
// import ReactTable from '../ui/ReactTable';
// import { Suspense } from 'react';
// import Image from 'next/image';
// import { getInterestAccruedOnNationalList } from '@/app/api/fetchData';
// // import { getInterestAccruedOnNationalList } from '@/app/api/fetchData';

// const response = await getInterestAccruedOnNationalList('ikvp-1', '2022');

// const Wordkvp = () => {
//   return (
//     <>
//       <Suspense
//         fallback={
//           <div className="flex h-[70vh] justify-center items-center">
//             <Image
//               width={50}
//               height={50}
//               alt={'Loading...'}
//               src={'/public/whiteLoader.svg'}
//             />
//           </div>
//         }
//       >
//         <div>
//           <h5 className="text-center my-5">Interest on Kisan Vikas Patra</h5>
//           <div className=" py-2 inline-block max-w-full sm:px-6 lg:px-8  ">
//             <div className="my-6 text-right">
//               <ExportPDF name="Wordkvp" id="#mytable9" />
//             </div>
//             <div className="overflow-x-scroll scrollbar-thin">
//               <ReactTable
//                 id="mytable9"
//                 columns={KVP}
//                 data={response?.interestAccruedonNational || []}
//               />
//             </div>
//           </div>

//           <h6 className="text-secondary text-center">
//             [As amended by Finance Act, 2022]
//           </h6>
//         </div>
//       </Suspense>
//     </>
//   );
// };

// export default Wordkvp;
