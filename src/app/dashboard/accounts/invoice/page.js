import dynamic from "next/dynamic";
import { getBusinessProfile } from "@/hooks/authProvider";
import { getUserOnServer } from "@/lib/getServerSideToken";
import { USER_ROLES } from "@/utils/globals";

// 🔹 Lazy load components for better performance
const InvoiceDashboard_Index = dynamic(
  () => import("@/components/pagesComponents/dashboard/accounts/invoice/InvoiceDashboard_index"),
  { ssr: false, loading: () => <p className="text-center p-4">Loading Dashboard...</p> }
);

const Invoice_Dashboard = dynamic(
  () => import("@/components/pagesComponents/dashboard/superAdmin/accounts/invoice/Invoice_Dashboard"),
  { ssr: false, loading: () => <p className="text-center p-4">Loading Admin Dashboard...</p> }
);

export default function InvoicePage() {
  const user = getUserOnServer();
  const businessProfile = getBusinessProfile();
  const isSuperAdmin = user?.userType === USER_ROLES.superAdmin;

  return isSuperAdmin ? (
    <Invoice_Dashboard />
  ) : (
    <InvoiceDashboard_Index
      businessProfile={businessProfile?.response?.data?.profile}
    />
  );
}
