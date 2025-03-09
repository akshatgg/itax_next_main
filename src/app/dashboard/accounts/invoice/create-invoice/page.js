import CreateInvoice from '@/components/pagesComponents/dashboard/accounts/invoice/invoice/CreateInvoice';
import Loader from '@/components/partials/loading/Loader';
import { getBusinessProfile } from '@/hooks/authProvider';
import { Suspense } from 'react';

export default async function Create() {
  const businessProfile = await getBusinessProfile();

  return (
    <Suspense
      fallback={
        <div className="flex h-[70vh] justify-center items-center">
          <Loader />
        </div>
      }
    >
      <CreateInvoice
        businessProfile={businessProfile?.response?.data?.profile}
      />
    </Suspense>
  );
}
