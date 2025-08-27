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
}
