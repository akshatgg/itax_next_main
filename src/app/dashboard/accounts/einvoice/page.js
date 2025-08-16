
import ClientWrapper from '@/components/ClientWrapper';
import{ EinvoiceDashboard_index }from '@/components/pagesComponents/dashboard/accounts/invoice/InvoiceDashboard_index';
import Invoice_Dashboard from '@/components/pagesComponents/dashboard/superAdmin/accounts/invoice/Invoice_Dashboard';
import { getBusinessProfile } from '@/hooks/authProvider';
import { getUserOnServer } from '@/lib/getServerSideToken';
import { USER_ROLES } from '@/utils/globals';

export default async function InvoicePage() {
  const user = getUserOnServer();
  console.log('user', user);
  const businessProfile = await getBusinessProfile();

  const isSuperAdmin = user?.userType === USER_ROLES.superAdmin;

  return (
    <>
      {isSuperAdmin ? (
        <Invoice_Dashboard />
      ) : (
        <EinvoiceDashboard_index
          businessProfile={businessProfile?.response}
          einvoice={true} // Pass einvoice prop to InvoiceDashboard_Index
        />
      )}
    </>
  );
}
