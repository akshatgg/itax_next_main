import GSTR_2A from "@/components/pagesComponents/dashboard/GSTR/GSTRPages/Gstr2a/GSTR_2A_index";
import { getBusinessProfile } from "@/hooks/authProvider";

const index = async () => {
    const businessProfile = await getBusinessProfile();

    return <GSTR_2A businessProfile={businessProfile} />;
};

export default index;
