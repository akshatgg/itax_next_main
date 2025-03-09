// // import Axios from "@/lib/Axios";
// import PermanentInfo from '@/components/pagesComponents/dashboard/GSTR/GSTRPages/permanentInfo/PermanentInfo';
// import { getBusinessProfile, getUserProfile } from '@/hooks/authProvider';

import GSTRPermanentInfo from '@/components/pagesComponents/dashboard/GSTR/GSTRPageComponent/GSTRPermanentInfo';

// // bank details
// // Business details
// // personal details

// const index = async () => {
//   const businessProfile = await getBusinessProfile();
//   const userProfile = await getUserProfile();

//   return (
//     <main className=" min-h-screen bg-neutral-50">
//       <PermanentInfo
//         businessProfile={businessProfile}
//         userProfile={userProfile}
//       />
//     </main>
//   );
// };
// export default index;

const PermanentInfo = () => {
  return <GSTRPermanentInfo />;
};

export default PermanentInfo;
