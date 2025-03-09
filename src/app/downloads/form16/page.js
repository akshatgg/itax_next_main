
import Form16 from '@/components/downloads/Form16';
import { Suspense } from 'react';
const index = () => {
  return (
    <div className="transition-all duration-100 lg:container 2xl:max-w-7xl mx-auto mb-12">
      <Suspense>
        <Form16 />
      </Suspense>
    </div>
  );
};

export const metadata = {
  title: 'Form16 ',
};
export default index;
