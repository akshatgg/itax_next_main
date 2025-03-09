import Transactions_Admin from "@/components/pagesComponents/dashboard/admin/Transactions/Transactions_Admin";
import Transactions from "@/components/pagesComponents/dashboard/superAdmin/transactions/Transactions";
import { cookies } from "next/headers";
const page = () => {
  const cookieStore = cookies();
  const currentUser = cookieStore.get("currentUser") || "";
  const { userType } = JSON.parse(currentUser.value || "{}");



  switch(userType) {

 
    case "admin":   return <Transactions_Admin/>;
    case "superadmin": return <Transactions />;
  

    default:      return <h1>No project match</h1>
  }
};

export default page;



