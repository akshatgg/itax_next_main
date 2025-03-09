import { nodeAxios } from '@/lib/axios';
import InvoicePreview from '@/components/pagesComponents/dashboard/accounts/invoice/invoicePreview/InvoicePreview';
import { getBusinessProfile } from '@/hooks/authProvider';
import { getUserOnServer } from '@/lib/getServerSideToken';

async function getInvoiceById(id) {
  try {
    const response = await nodeAxios.get(`/invoice/invoices/${id}`);
    return { respInvoice: response.data };
  } catch (error) {
    return { errorInvoice: error };
  }
}

async function getPartyById(id) {
  try {
    const response = await nodeAxios.get(`/invoice/parties/${id}`);
    return { respParty: response.data };
  } catch (error) {
    return { errorParty: error };
  }
}

export default async function Page({ params }) {
  const { respInvoice, errorInvoice } = await getInvoiceById(params.slug);

  if (errorInvoice) {
    return <div>Something went wrong</div>;
  }

  const { respParty } = await getPartyById(respInvoice?.partyId);
  const user = await getUserOnServer();
  const { response: businessProfile, error: businessProfileError } =
    await getBusinessProfile();

  return (
    <div>
      <InvoicePreview
        respParty={respParty.party}
        respInvoice={respInvoice}
        user={user}
        businessProfile={businessProfile?.data}
      />
    </div>
  );
}
