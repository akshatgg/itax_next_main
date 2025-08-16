
import { Suspense } from "react";
import { cookies } from "next/headers";
import userbackAxios from "@/lib/userbackAxios";
import { getBusinessProfile } from "@/hooks/authProvider";
import { getUserOnServer } from "@/lib/getServerSideToken";

// ✅ Generic authenticated fetch
async function fetchWithAuth(url) {
  try {
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Missing authentication token");

    const { data } = await userbackAxios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { data };
  } catch (error) {
    console.error(`Fetch error [${url}]:`, error?.response?.status, error?.response?.data || error.message);
    return { error };
  }
}

// ✅ Extract the heavy preview as a lazy-loaded client component
async function InvoicePreviewWrapper({ slug }) {
  const user = await getUserOnServer();

  // 1. Fetch invoice
  const { data: respInvoice, error: errorInvoice } = await fetchWithAuth(`/invoice/invoices/${slug}`);
  if (errorInvoice) {
    const status = errorInvoice.response?.status;
    const msg = errorInvoice.response?.data?.message || errorInvoice.message || "Unknown error";

    if (status === 403) {
      return (
        <div className="p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Permission Denied</h2>
          <p>You don&apos;t have permission to view this invoice.</p>
          <p className="text-sm text-gray-500 mt-2">Error: {msg}</p>
        </div>
      );
    }
    return <div className="p-4">Error loading invoice: {msg}</div>;
  }

  if (!respInvoice?.partyId) {
    return <div className="p-4">Invalid invoice data: Missing party</div>;
  }

  // 2. Fetch party + business profile concurrently
  const [{ data: respParty, error: errorParty }, { response: businessProfile, error: businessError }] =
    await Promise.all([
      fetchWithAuth(`/invoice/parties/${respInvoice.partyId}`),
      getBusinessProfile(),
    ]);

  if (errorParty || !respParty) {
    const msg = errorParty?.response?.data?.message || errorParty?.message || "Unknown error";
    return <div className="p-4">Error loading party: {msg}</div>;
  }

  if (businessError) {
    console.warn("Business profile fetch failed:", businessError);
  }

  // ✅ Import inside so it's lazily loaded
  const InvoicePreview = (await import(
    "@/components/pagesComponents/dashboard/accounts/invoice/invoicePreview/InvoicePreview"
  )).default;

  return (
    <InvoicePreview
      respParty={respParty.party}
      respInvoice={respInvoice}
      user={user}
      businessProfile={businessProfile?.data}
    />
  );
}

export default function Page({ params }) {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading invoice preview...</div>}>
      <InvoicePreviewWrapper slug={params.slug} />
    </Suspense>
  );
}
