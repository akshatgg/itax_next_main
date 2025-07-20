
import ClientWrapper from '@/components/ClientWrapper';
import InvoiceDashboard_Index from '@/components/pagesComponents/dashboard/accounts/invoice/InvoiceDashboard_index';
import Invoice_Dashboard from '@/components/pagesComponents/dashboard/superAdmin/accounts/invoice/Invoice_Dashboard';
import { getBusinessProfile } from '@/hooks/authProvider';
import { getUserOnServer } from '@/lib/getServerSideToken';
import { USER_ROLES } from '@/utils/globals';

export default function InvoicePage() {
  const user = getUserOnServer();
  console.log('user', user);
  const businessProfile = getBusinessProfile();
console.log('businessProfile', businessProfile);
  const isSuperAdmin = user?.userType === USER_ROLES.superAdmin;

  return (
    <>
      {isSuperAdmin ? (
        <Invoice_Dashboard />
      ) : (
        <InvoiceDashboard_Index
          businessProfile={businessProfile?.response?.data?.profile}
        />
      )}
    </>
  );
}
