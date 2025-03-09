import InvoiceDashboard_Index from '@/components/pagesComponents/dashboard/accounts/invoice/InvoiceDashboard_index';
import Invoice_Dashboard from '@/components/pagesComponents/dashboard/superAdmin/accounts/invoice/Invoice_Dashboard';
import Loader from '@/components/partials/loading/Loader';
import { getBusinessProfile } from '@/hooks/authProvider';
import { getUserOnServer } from '@/lib/getServerSideToken';
import { USER_ROLES } from '@/utils/globals';
import { Suspense } from 'react';

export default async function InvoicePage() {
  const user = getUserOnServer();
  const businessProfile = await getBusinessProfile();

  if (user && user.userType === USER_ROLES.superAdmin) {
    return <Invoice_Dashboard />;
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-[70vh] justify-center items-center">
          <Loader />
        </div>
      }
    >
      <InvoiceDashboard_Index
        businessProfile={businessProfile?.response?.data?.profile}
      />
    </Suspense>
  );
}
