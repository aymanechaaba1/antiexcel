import { withAuth } from 'next-auth/middleware';

export default withAuth;

export const config = {
  matcher: [
    '/dashboard',
    '/students/:path*',
    '/teachers/:path*',
    '/contacts/:path*',
    '/settings',
    '/billing',
  ],
};
