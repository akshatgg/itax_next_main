import { Suspense } from 'react';
import CreateInvoicePage from '@/components/pagesComponents/dashboard/accounts/invoice/invoice/CreateInvoicePage';
import { getBusinessProfile } from '@/hooks/authProvider';
import Loader from '@/components/partials/loading/Loader';

export default async function CreateSale() {
  const businessProfile = await getBusinessProfile();

  return (
    <Suspense
      fallback={
        <div className="flex h-[70vh] justify-center items-center">
          <Loader />
        </div>
      }
    >
      <CreateInvoicePage
        businessProfile={businessProfile?.response?.data?.profile}
      />
    </Suspense>
  );

  // try {
  //   const pariesResponse = await nodeAxios.get('/invoice/parties');
  //   return (
  //     <div>
  //       <CreateSaleForm parties={pariesResponse?.data?.parties || []} />
  //     </div>
  //   );
  // } catch (error) {
  //   console.log(error);
  //   return (
  //     <ErrorComponent
  //       message={error.message}
  //       info={error.info}
  //       type={error.type}
  //     />
  //   );
  // }
}
