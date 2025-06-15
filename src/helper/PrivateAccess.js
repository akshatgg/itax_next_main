import { redirect, notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { USER_ROLES } from '@/utils/globals';

export default function PrivateRoute(props) {
  const cookieStore = cookies();
  const currentUser = cookieStore.get('currentUser') || '';
  const { userType} = JSON.parse(currentUser.value || '{}');
  const { Normal, Admin, SuperAdmin } = props;

  let Component;

  switch (userType) {
    case USER_ROLES.normal:
      Component = Normal;
      break;
    case USER_ROLES.admin:
      Component = Admin;
      break;
    case USER_ROLES.superAdmin:
      Component = SuperAdmin;
      break;
    default:
      return redirect('/login');
  }

  if (!Component) {
    return notFound();
  }

  return <Component />;
}
