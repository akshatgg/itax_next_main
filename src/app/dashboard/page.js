import PrivateRoute from '@/helper/PrivateAccess';
import Admin_Dashboard from '@/components/pagesComponents/dashboard/admin/mainBoard/Admin_dashboard';
import SuperAdmin_Dashboard from '@/components/pagesComponents/dashboard/superAdmin/mainBoard/SuperAdmin_dashboard';
import Normal_dashboard from '@/components/pagesComponents/dashboard/normal/mainBoard/Normal_dashboard';

export default function page() {
  return (
    <PrivateRoute
      SuperAdmin={SuperAdmin_Dashboard}
      Admin={Admin_Dashboard}
      Normal={Normal_dashboard}
    />
  );
}
