import { nodeAxios } from '@/lib/axios';
import userbackAxios from '@/lib/userbackAxios';
import InvoicePreview from '@/components/pagesComponents/dashboard/accounts/invoice/invoicePreview/InvoicePreview';
import { getBusinessProfile } from '@/hooks/authProvider';
import { getUserOnServer } from '@/lib/getServerSideToken';
import { cookies } from 'next/headers';

// Helper to get auth token from cookies
async function getAuthToken() {
  const cookieStore = cookies();
  return cookieStore.get('token')?.value;
}

async function getInvoiceById(id) {
  try {
    // Get the auth token
    const token = await getAuthToken();
    
    // Make the request with proper authorization
    const response = await userbackAxios.get(`/invoice/invoices/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Invoice response:', response.data);
    return { respInvoice: response.data };
  } catch (error) {
    console.error('Invoice fetch error:', error?.response?.status, error?.response?.data || error.message);
    return { errorInvoice: error };
  }
}

async function getPartyById(id) {
  try {
    // Get the auth token
    const token = await getAuthToken();
    
    // Make the request with proper authorization
    const response = await userbackAxios.get(`/invoice/parties/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Party response:', response.data);
    return { respParty: response.data };
  } catch (error) {
    console.error('Party fetch error:', error?.response?.status, error?.response?.data || error.message);
    return { errorParty: error };
  }
}

export default async function Page({ params }) {
  // Get user first to have access to authentication data
  const user = await getUserOnServer();
  
  // Add better error handling with more detailed logging
  const { respInvoice, errorInvoice } = await getInvoiceById(params.slug);

  if (errorInvoice) {
    // Get more detailed error information
    const statusCode = errorInvoice.response?.status;
    const errorMessage = errorInvoice.response?.data?.message || errorInvoice.message || 'Unknown error';
    
    console.error(`Error fetching invoice: ${statusCode} - ${errorMessage}`);
    
    // Return user-friendly error based on status code
    if (statusCode === 403) {
      return (
        <div className="p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Permission Error</h2>
          <p>You don&apos;t have permission to view this invoice. Please verify your account has the necessary access rights.</p>
          <p className="text-sm text-gray-500 mt-2">Error: {errorMessage}</p>
        </div>
      );
    }
    
    return <div className="p-4">Error loading invoice: {errorMessage}</div>;
  }
  
  if (!respInvoice) {
    console.error('No invoice data returned');
    return <div className="p-4">Invoice not found</div>;
  }

  // Check for partyId before trying to fetch party
  if (!respInvoice.partyId) {
    console.error('Missing partyId in invoice data:', respInvoice);
    return <div className="p-4">Invalid invoice data: Missing party information</div>;
  }

  const { respParty, errorParty } = await getPartyById(respInvoice.partyId);
  
  if (errorParty || !respParty) {
    const errorMessage = errorParty?.response?.data?.message || errorParty?.message || 'Unknown error';
    console.error('Error fetching party:', errorParty);
    return <div className="p-4">Error loading party information: {errorMessage}</div>;
  }

  const { response: businessProfile, error: businessProfileError } = await getBusinessProfile();

  if (businessProfileError) {
    console.error('Error fetching business profile:', businessProfileError);
  }

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