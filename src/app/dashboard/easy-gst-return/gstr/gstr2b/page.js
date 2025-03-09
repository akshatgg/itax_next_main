import Index2B from "@/components/pagesComponents/dashboard/GSTR/GSTRPages/Gstr2B/Index2B";
import { getBusinessProfile } from "@/hooks/authProvider";

const page = async () => {
    const businessProfile = await getBusinessProfile();

    return <Index2B businessProfile={businessProfile} />;
};

export default page;
