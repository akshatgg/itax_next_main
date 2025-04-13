// app/lib/getServerSideToken.ts (or inside route handlers only)
import { cookies } from 'next/headers';
import { verifyJwt } from './jwt';

export const getServerSideToken = () => {
  const cookieToken = cookies().get('token')?.value;
  return cookieToken;
};

export const getUserOnServer = () => {
  const token = getServerSideToken();
  return token ? verifyJwt(token) : null;
};
