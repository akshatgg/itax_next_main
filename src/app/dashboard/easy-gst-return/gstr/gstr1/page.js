// import { useState, useRef } from "react";
// import GSTR_1_Add_Record_Details from "@/components/pagesComponents/dashboard/GSTR/GSTRPages/Gstr1/GSTR_1_Add_Record_Details";
// import GSTR_1_Amend_record_details from "@/components/pagesComponents/dashboard/GSTR/GSTRPages/Gstr1/GSTR_1_Amend_record_details";
// import GSTR_1_E_invoice_Download_History from "@/components/pagesComponents/dashboard/GSTR/GSTRPages/Gstr1/GSTR_1_E_invoice_Download_History";
// import { useReactToPrint } from "react-to-print";

import Gstr1Index from "@/components/pagesComponents/dashboard/GSTR/GSTRPages/Gstr1/Gstr1Index";
import { getBusinessProfile } from "@/hooks/authProvider";

const index = async () => {
    const businessProfile = await getBusinessProfile();

    return <Gstr1Index businessProfile={businessProfile} />;
};
export default index;
