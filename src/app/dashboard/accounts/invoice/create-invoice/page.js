import dynamic from "next/dynamic";
import Loader from "@/components/partials/loading/Loader";
import { getBusinessProfile } from "@/hooks/authProvider";

// Lazy load CreateInvoice with loading fallback
const CreateInvoice = dynamic(
  () => import("@/components/pagesComponents/dashboard/accounts/invoice/invoice/CreateInvoice"),
  {
    loading: () => (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader />
      </div>
    ),
    ssr: false, // optional: skip SSR if it's client-heavy
  }
);

export default async function Create() {
  const profile = (await getBusinessProfile())?.response?.data?.profile;

  if (!profile) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return <CreateInvoice businessProfile={profile} />;
}
