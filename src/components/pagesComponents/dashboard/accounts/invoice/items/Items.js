// import Link from 'next/link';
// import DashSection from '@/components/pagesComponents/pageLayout/DashSection';
// import { getInvoiceItems } from '@/app/dashboard/accounts/invoice/items/page';
// import ItemsTable from './ItemsTable';
// import { Suspense } from 'react';
// import ItemsFilters from './ItemsFilters';
// import Loader from '@/components/partials/loading/Loader';
// import Button from '@/components/ui/Button';

// export default async function Items() {
//   const itemsData = await getInvoiceItems(); // server side fetch request
//   const linkToCreateSale = '/dashboard/accounts/invoice/items/create-item';

//   return (
//     <>
//       <Suspense fallback={<Loader />}>
//         <DashSection title="Items" className="p-4 mx-auto my-2 border">
//           <div className="p-2">
//             <div className="flex gap-2 justify-end mb-2 mx-auto">
//               <Link href={linkToCreateSale}>
//                 {/* <button
//                   type="button"
//                   className="capitalize flex items-center focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2  "
//                 >
//                   create items
//                 </button> */}
//                 <Button size={'sm'} className={'m-2'}>
//                   Create Items
//                 </Button>
//               </Link>
//             </div>

//             <ItemsFilters />

//             <div className="my-4 max-h-96 mx-auto relative overflow-x-auto shadow-md sm:rounded-lg">
//               <Suspense fallback={<div>Loading...</div>}>
//                 <ItemsTable itemsData={itemsData} />
//               </Suspense>
//             </div>
//             {/* {isLoading ? 'loading' : isError ? 'error' : ''} */}
//             {itemsData?.items.length === 0 ? (
//               <div className=" flex flex-col items-center gap-4 justify-center mb-2 mx-auto">
//                 <div>
//                   <p className="text-center">No Record Found</p>
//                 </div>
//                 <Link href={linkToCreateSale}>
//                   {/* <button
//                     type="button"
//                     className="capitalize flex items-center focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2  "
//                   >
//                     create sales
//                   </button> */}
//                   <Button size={'sm'} className={'m-2'}>
//                     Create Sales
//                   </Button>
//                 </Link>
//               </div>
//             ) : (
//               ''
//             )}
//           </div>
//         </DashSection>
//       </Suspense>
//     </>
//   );
// }


import Link from "next/link";
import DashSection from "@/components/pagesComponents/pageLayout/DashSection";
import { getInvoiceItems } from "@/app/dashboard/accounts/invoice/items/page";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";

// ✅ Lazy load heavy components
const ItemsTable = dynamic(() => import("./ItemsTable"), { suspense: true });
const ItemsFilters = dynamic(() => import("./ItemsFilters"), { suspense: true });
const Loader = dynamic(() => import("@/components/partials/loading/Loader"));

export default async function Items() {
  const itemsData = await getInvoiceItems(); // Server-side fetch
  const linkToCreateItem = "/dashboard/accounts/invoice/items/create-item";

  return (
    <Suspense fallback={<Loader />}>
      <DashSection title="Items" className="p-4 mx-auto my-2 border rounded-lg shadow-sm">
        <div className="p-2">
          {/* 🔹 Create Button */}
          <div className="flex justify-end mb-4">
            <Link href={linkToCreateItem}>
              <Button size="sm" className="m-2">
                Create Item
              </Button>
            </Link>
          </div>

          {/* 🔹 Filters */}
          <Suspense fallback={<div>Loading filters...</div>}>
            <ItemsFilters />
          </Suspense>

          {/* 🔹 Items Table */}
          <div className="my-4 max-h-96 mx-auto overflow-x-auto shadow-md sm:rounded-lg">
            {itemsData?.items.length > 0 ? (
              <Suspense fallback={<div>Loading table...</div>}>
                <ItemsTable itemsData={itemsData} />
              </Suspense>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-6">
                <p className="text-center text-gray-600">No Record Found</p>
                <Link href={linkToCreateItem}>
                  <Button size="sm" className="m-2">
                    Create Item
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </DashSection>
    </Suspense>
  );
}
