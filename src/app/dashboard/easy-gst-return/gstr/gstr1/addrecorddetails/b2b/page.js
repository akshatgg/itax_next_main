import B2B from "@/components/pagesComponents/dashboard/GSTR/GSTRPages/Gstr1/Add_Record_Details/B2B";
import { getBusinessProfile } from "@/hooks/authProvider";


const index =async () => {
  const businessProfile = await getBusinessProfile();

  return <B2B businessProfile={businessProfile} />;
};

export default index;
