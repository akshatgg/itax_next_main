// import { getTrackGstReturn } from '@/helper/api/gstrApi';
// import GSTR from '@/components/pagesComponents/dashboard/GSTR/GSTR';
import LoadingComponent from '@/components/partials/loading/LoadingComponent';
import GSTR from '@/components/pagesComponents/dashboard/GSTR/GSTR.Component';
import {
  // getUserProfile
  getBusinessProfile,
} from '@/hooks/authProvider';
import { Suspense } from 'react';

const Index = async () => {
  const businessProfile = await getBusinessProfile();
  // const options = {
  //   gstin: businessProfile?.response?.data?.profile?.gstin,
  //   financialYear: 'FY 2023-24',
  // };
  // const returnData = await getTrackGstReturn(options);

  return (
    <Suspense fallback={<LoadingComponent />}>
      <GSTR businessProfile={businessProfile?.response?.data?.profile} />
    </Suspense>
  );
};
export default Index;
