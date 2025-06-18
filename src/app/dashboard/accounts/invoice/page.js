
import ClientWrapper from '@/components/ClientWrapper';
import InvoiceDashboard_Index from '@/components/pagesComponents/dashboard/accounts/invoice/InvoiceDashboard_index';
import Invoice_Dashboard from '@/components/pagesComponents/dashboard/superAdmin/accounts/invoice/Invoice_Dashboard';
import { getBusinessProfile } from '@/hooks/authProvider';
import { getUserOnServer } from '@/lib/getServerSideToken';
import { USER_ROLES } from '@/utils/globals';

export default async function InvoicePage() {
  const user = getUserOnServer();
  const businessProfile = await getBusinessProfile();

  const isSuperAdmin = user?.userType === USER_ROLES.superAdmin;

  return (
    <ClientWrapper>
      {isSuperAdmin ? (
        <Invoice_Dashboard />
      ) : (
        <InvoiceDashboard_Index
          businessProfile={businessProfile?.response?.data?.profile}
        />
      )}
    </ClientWrapper>
  );
}
