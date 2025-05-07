import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const cookieList = cookies();
  const token = cookieList.get('token');

  const privateRoutes = ['/easyservice', '/register-startup', '/dashboard'];
  const isPrivateRoute = privateRoutes.some((route) => path.startsWith(route));
  
  if (!token && isPrivateRoute) {
    
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/easyservice/:path*', '/register-startup', '/dashboard/:path*'],
};
